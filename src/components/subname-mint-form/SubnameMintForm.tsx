import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon, Input, Text, ShurikenSpinner, Button } from "../atoms";
import { PricingDisplay, Alert } from "@/components/molecules";
import { useAccount, usePublicClient } from "wagmi";
import { Address, namehash, parseAbi, zeroAddress } from "viem";
import { normalize } from "viem/ens";
import { mainnet, sepolia } from "viem/chains";
import { getEnsContracts } from "@thenamespace/addresses";
import { debounce, equalsIgnoreCase, formatFloat, deepCopy, getEnsRecordsDiff } from "@/utils";
import "./SubnameMintForm.css";
import { useMintManager } from "@/hooks";
import { add } from "lodash";
import { getChainIdForListingNetwork, ListingType, EnsRecords } from "@/types";
import { MintDetailsResponse } from "@thenamespace/mint-manager";
import { SetSubnameRecords } from "./SetSubnameRecords";
import shurikenImage from "../../assets/shuriken.svg";

interface SubnameMintFormProps {
  parentName: string;
  label?: string;
  isTestnet?: boolean;
  onCancel?: () => void;
}

const MIN_ENS_LEN = 1;

export const SubnameMintForm = ({
  parentName,
  label,
  isTestnet = false,
  onCancel,
}: SubnameMintFormProps) => {
  const { getListingDetails } = useMintManager({ isTestnet });
  const { address } = useAccount();

  const [initState, setInitState] = useState<{
    isChecking: boolean;
    isListingValid: boolean;
    listingChainId: number;
    isL2: boolean;
    isExpirable?: boolean;
  }>({
    isChecking: true,
    isListingValid: false,
    listingChainId: 0,
    isL2: false,
    isExpirable: false,
  });

  useEffect(() => {
    getListingDetails(parentName)
      .then(listing => {
        const isL2 = listing.type === ListingType.L2;
        const listingNetwork =
          isL2 && listing.l2Metadata
            ? listing.l2Metadata.registryNetwork
            : listing.nameNetwork;
        const listingChainId = getChainIdForListingNetwork(listingNetwork);

        setInitState({
          isChecking: false,
          isListingValid: listing?.isVerified,
          listingChainId: listingChainId,
          isL2: isL2,
          isExpirable: listing?.l2Metadata?.isExpirable,
        });
      })
      .catch(e => {
        console.error(e);
        setInitState({
          isChecking: false,
          isListingValid: false,
          listingChainId: 0,
          isL2: false,
        });
      });
  }, [getListingDetails, parentName]);

  // Show loading spinner while checking
  if (initState.isChecking) {
    return (
      <div className="ns-subname-mint-form">
        <div
          className="ns-text-center d-flex align-items-center justify-content-center"
          style={{ gap: "8px" }}
        >
          <ShurikenSpinner size={24} />
          <Text size="sm" color="grey">
            Checking listing configuration...
          </Text>
        </div>
      </div>
    );
  }

  // Show error if listing is not valid
  if (!initState.isListingValid) {
    return (
      <div className="ns-subname-mint-form">
        <Alert variant="error" position="vertical">
          <Text size="sm">
            ENS name <span style={{ fontWeight: "bold" }}>{parentName}</span> is
            not configured properly to issue subnames.
          </Text>
        </Alert>
      </div>
    );
  }

  return (
    <div className="ns-subname-mint-form">
      <SubnameMintFormComponent
        parentName={parentName}
        label={label}
        chainId={initState.listingChainId}
        isTestnet={isTestnet}
        isL2={initState.isL2}
        isExpirable={initState.isExpirable || false}
        onCancel={onCancel}
      />
    </div>
  );
};

interface SubnameMintProps extends SubnameMintFormProps {
  isL2: boolean;
  isExpirable: boolean;
  chainId: number;
}

const SubnameMintFormComponent = ({
  parentName,
  label: initialLabel,
  chainId,
  isTestnet = false,
  isL2,
  isExpirable = false,
  onCancel,
}: SubnameMintProps) => {
  const { address: connectedAddress } = useAccount();
  const [label, setLabel] = useState<string>(initialLabel || "");
  const [showProfile, setShowProfile] = useState(false);
  
  const [ensRecordTemplate, setEnsRecordsTemplate] = useState<EnsRecords>({
    addresses: [],
    texts: [],
  });

  const [ensRecords, setEnsRecords] = useState<EnsRecords>({
    addresses: [],
    texts: [],
  });

  const hasRecordsDifference = useMemo(() => {
    return getEnsRecordsDiff(ensRecords, ensRecordTemplate).isDifferent;
  }, [ensRecords, ensRecordTemplate]);

  const [years, setYears] = useState(1);
  const [availability, setAvailability] = useState<{
    isChecking: boolean;
    isAvailable: boolean;
  }>({
    isChecking: false,
    isAvailable: true,
  });

  const [mintDetails, setMintDetails] = useState<{
    isChecking: boolean;
    details: MintDetailsResponse;
  }>({
    isChecking: false,
    details: {
      canMint: true,
      validationErrors: [],
      estimatedFeeEth: 0,
      estimatedPriceEth: 0,
      isStandardFee: false,
    },
  });

  const { mintClient } = useMintManager({ isTestnet });

  const checkIsAvailable = async () => {
    const fullName = `${label}.${parentName}`;
    const available = isL2
      ? await mintClient.isL2SubnameAvailable(fullName, chainId)
      : await mintClient.isL1SubnameAvailable(fullName);

    setAvailability({ isAvailable: available, isChecking: false });
  };

  const checkMintDetails = async () => {
    const details = await mintClient.getMintDetails({
      minterAddress: connectedAddress!,
      parentName: parentName,
      label: label,
    });
    setMintDetails({ isChecking: false, details: details });
  };

  const [transactionFees, setTransactionFees] = useState<{
    isChecking: boolean;
    estimatedGas: number;
    price: {
      wei: bigint;
      eth: number;
    };
  }>({
    isChecking: false,
    estimatedGas: 0,
    price: {
      wei: 0n,
      eth: 0.0001,
    },
  });

  const handleNameChanged = async (value: string) => {
    const _value = value.toLowerCase().trim();

    if (_value.includes(".")) {
      return;
    }

    try {
      normalize(_value);
    } catch (err) {
      return;
    }

    setLabel(_value);
  };

  const { regPrice, regFees, regTotal, isStandardFee } = useMemo(() => {
    let regPrice =
      mintDetails.details.estimatedFeeEth +
      mintDetails.details.estimatedPriceEth;
    let regFees = 0;
    let total = 0;

    if (transactionFees) {
      regFees += transactionFees.price.eth;
      total += transactionFees.price.eth;
    }

    return {
      regFees,
      regPrice,
      regTotal: formatFloat(total, 5),
      isStandardFee: false,
    };
  }, [mintDetails, transactionFees]);

  const handleYearsChange = (newYears: number) => {
    if (newYears < 1) {
      return;
    }
    setYears(newYears);
  };

  const totalPriceLoading =
    transactionFees?.isChecking || mintDetails.isChecking;
  const transactionFeesLoading = transactionFees?.isChecking || false;
  const isAvailableForMint = useMemo(() => {
    return (
      label.length >= 1 && availability.isAvailable && !availability.isChecking
    );
  }, [label, availability]);

  const handleSaveRecords = () => {
    setEnsRecords(deepCopy(ensRecordTemplate));
    setShowProfile(false);
  };

  const handleCancelRecords = () => {
    setEnsRecordsTemplate(deepCopy(ensRecords));
    setShowProfile(false);
  };

  // Show SetSubnameRecords when profile editing is active
  if (showProfile) {
    return (
      <SetSubnameRecords
        records={ensRecordTemplate}
        onRecordsChange={setEnsRecordsTemplate}
        onCancel={handleCancelRecords}
        onSave={handleSaveRecords}
        hasChanges={hasRecordsDifference}
      />
    );
  }

  return (
    <div>
      <Text className="ns-text-center" weight="bold">
        Get Your Web3 Username
      </Text>
      <div className="mt-3">
        <Input
          value={label}
          onChange={e => handleNameChanged(e.target.value)}
          size="lg"
          wrapperClassName="ns-subname-mint-input"
          prefix={<Icon color="grey" size={20} name="search" />}
          suffix={
            <Text weight="medium" size="sm" color="grey">
              {parentName}
            </Text>
          }
        />
      </div>

      {/* Status Messages */}
      {label.length < MIN_ENS_LEN && (
        <div className="ns-text-center mt-2">
          <Text size="xs" color="grey">
            Minimum ENS name length is 3 characters
          </Text>
        </div>
      )}

      {label.length >= MIN_ENS_LEN && availability.isChecking && (
        <div
          className="ns-text-center mt-2 d-flex align-items-center justify-content-center"
          style={{ gap: "8px" }}
        >
          <ShurikenSpinner size={18} />
          <Text size="sm" color="grey">
            Checking availability
          </Text>
        </div>
      )}

      {label.length >= MIN_ENS_LEN &&
        !availability.isChecking &&
        !availability.isAvailable && (
          <div className="ns-text-center mt-2">
            <Text size="xs" color="grey">
              {label}.{parentName} is not available
            </Text>
          </div>
        )}

      {/* Pricing Component - Only show when name is available */}
      {isAvailableForMint && (
        <>
          <PricingDisplay
            className="mt-2"
            primaryFee={{
              label: "Price",
              amount: regPrice,
              isChecking: mintDetails.isChecking,
            }}
            networkFees={{
              amount: regFees,
              isChecking: transactionFeesLoading,
            }}
            total={{
              amount: regTotal,
              isChecking: totalPriceLoading,
            }}
            expiryPicker={
              isExpirable
                ? {
                    years,
                    onYearsChange: handleYearsChange,
                  }
                : undefined
            }
          />

          {/* Complete Profile Selector */}
          <div
            className="ens-profile-selector mt-2"
            onClick={() => setShowProfile(true)}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="shuriken-cont d-flex align-items-center justify-content-center">
                  <img
                    className="shuriken"
                    width={50}
                    src={shurikenImage}
                    alt="shuriken"
                  ></img>
                </div>
                <div className="ms-3">
                  <Text size="sm" weight="medium">
                    Complete your profile
                  </Text>
                  <Text size="xs" color="grey">
                    Make your ENS more discoverable
                  </Text>
                </div>
              </div>
              <Button style={{ width: 40, height: 40 }}>{`>`}</Button>
            </div>
          </div>
        </>
      )}

      {/* Action Buttons */}
      <div className="ens-update-records-form-actions mt-2">
        <Button variant="outline" size="lg" onClick={() => onCancel?.()}>
          Cancel
        </Button>
        <Button
          size="lg"
          disabled={
            !isAvailableForMint ||
            mintDetails.isChecking ||
            !mintDetails.details.canMint
          }
        >
          Mint
        </Button>
      </div>
    </div>
  );
};

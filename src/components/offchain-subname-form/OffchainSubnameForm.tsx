import { useCallback, useMemo, useState } from "react";
import { Text, ShurikenSpinner, Input, Icon, Button } from "@/components/atoms";
import {
  Alert,
  Accordion,
} from "@/components/molecules";
import { normalize } from "viem/ens";
import { debounce, deepCopy, getEnsRecordsDiff, validateEnsRecords } from "@/utils";
import { useOffchainManager } from "@/hooks";
import { EnsRecords } from "@/types";
import { SetSubnameRecords } from "../subname-mint-form/SetSubnameRecords";
import { ProfileSelector } from "../subname-mint-form/ProfileSelector";
import { Address } from "viem";
import { CreateSubnameRequest, ChainName } from "@thenamespace/offchain-manager";
import { getSupportedAddressByCoin } from "@/constants/records/addressConstants";

enum CreateStep {
  Form = "form",
  Creating = "creating",
  Success = "success",
}

export interface OffchainSubnameCreatedData {
  label: string;
  parentName: string;
  fullSubname: string;
  records: EnsRecords;
  ownerAddress?: string;
}

interface OffchainSubnameFormProps {
  apiKeyOrToken: string;
  name: string;
  hideTitle?: boolean;
  onCancel?: () => void;
  onSuccess?: (data: OffchainSubnameCreatedData) => void;
}

const MIN_ENS_LEN = 1;

export const OffchainSubnameForm = ({
  apiKeyOrToken,
  name,
  hideTitle = false,
  onCancel,
  onSuccess,
}: OffchainSubnameFormProps) => {
  const client = useOffchainManager(name, apiKeyOrToken);

  const [label, setLabel] = useState<string>("");
  const [showProfile, setShowProfile] = useState(false);
  const [createStep, setCreateStep] = useState<CreateStep>(CreateStep.Form);
  const [successData, setSuccessData] = useState<OffchainSubnameCreatedData | null>(null);

  const [error, setError] = useState<string | null>(null);

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

  const [availability, setAvailability] = useState<{
    isChecking: boolean;
    isAvailable: boolean;
  }>({
    isChecking: false,
    isAvailable: true,
  });

  // Owner address state
  const [showOwnerAddress, setShowOwnerAddress] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [ownerAddressError, setOwnerAddressError] = useState<string | null>(null);

  // Creating state
  const [isCreating, setIsCreating] = useState(false);

  const checkIsAvailable = async (fullName: string) => {
    try {
      const available = await client.isSubnameAvailable(fullName);
      setAvailability({ isAvailable: available.isAvailable, isChecking: false });
    } catch (err) {
      console.error("Error checking availability:", err);
      setAvailability({ isAvailable: false, isChecking: false });
    }
  };

  const debouncedCheckAvailability = useCallback(
    debounce((fullName: string) => checkIsAvailable(fullName), 500),
    []
  );

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

    if (_value.length >= MIN_ENS_LEN) {
      setAvailability({ isAvailable: false, isChecking: true });
      debouncedCheckAvailability(`${_value}.${name}`);
    }
  };

  const handleSaveRecords = () => {
    const newRecords = deepCopy(ensRecordTemplate);
    setEnsRecords(newRecords);
    setShowProfile(false);
  };

  const handleCancelRecords = () => {
    setEnsRecordsTemplate(deepCopy(ensRecords));
    setShowProfile(false);
  };

  const validateOwnerAddress = (address: string): boolean => {
    if (!address) return true; // Empty is valid (optional field)
    
    // Basic ethereum address validation
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      setOwnerAddressError("Invalid Ethereum address");
      return false;
    }
    
    setOwnerAddressError(null);
    return true;
  };

  const handleOwnerAddressChange = (value: string) => {
    setOwnerAddress(value);
    if (value) {
      validateOwnerAddress(value);
    } else {
      setOwnerAddressError(null);
    }
  };

  const handleCreate = async () => {
    setError(null);
    setIsCreating(true);

    // Validate owner address if provided
    if (showOwnerAddress && ownerAddress && !validateOwnerAddress(ownerAddress)) {
      setIsCreating(false);
      return;
    }

    try {
      // Validate records if any are set
      if (ensRecords.addresses.length > 0 || ensRecords.texts.length > 0) {
        const validation = validateEnsRecords(ensRecords);
        if (validation.validationFailed) {
          setError(
            validation.errors?.length > 0
              ? validation.errors[0].reason
              : "Invalid records"
          );
          setIsCreating(false);
          return;
        }
      }

      // Convert EnsRecords addresses to offchain-manager format
      const addresses = ensRecords.addresses.map((addr) => {
        // Map coinType to ChainName
        const supportedAddr = getSupportedAddressByCoin(addr.coinType);
        if (!supportedAddr) {
          throw new Error(`Unsupported coin type: ${addr.coinType}`);
        }
        return {
          chain: supportedAddr.chainName as ChainName,
          value: addr.value,
        };
      });

      // Texts are already in the correct format
      const texts = ensRecords.texts.map((text) => ({
        key: text.key,
        value: text.value,
      }));

      // Prepare CreateSubnameRequest
      const request: CreateSubnameRequest = {
        parentName: name,
        label,
        ...(addresses.length > 0 && { addresses }),
        ...(texts.length > 0 && { texts }),
        ...(showOwnerAddress && ownerAddress && { owner: ownerAddress }),
      };

      // Create subname using offchain manager
      await client.createSubname(request);

      const data: OffchainSubnameCreatedData = {
        label,
        parentName: name,
        fullSubname: `${label}.${name}`,
        records: ensRecords,
        ownerAddress: showOwnerAddress && ownerAddress ? ownerAddress : undefined,
      };

      setSuccessData(data);
      setCreateStep(CreateStep.Success);
      onSuccess?.(data);
    } catch (err: any) {
      console.error("Create error:", err);
      setError(err?.message || "Failed to create subname");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateAnother = () => {
    setLabel("");
    setEnsRecords({ addresses: [], texts: [] });
    setEnsRecordsTemplate({ addresses: [], texts: [] });
    setSuccessData(null);
    setError(null);
    setShowOwnerAddress(false);
    setOwnerAddress("");
    setOwnerAddressError(null);
    setCreateStep(CreateStep.Form);
  };

  const isAvailableForCreate = useMemo(() => {
    return (
      label.length >= MIN_ENS_LEN &&
      availability.isAvailable &&
      !availability.isChecking
    );
  }, [label, availability]);

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

  // Show success screen
  if (createStep === CreateStep.Success && successData) {
    return (
      <div style={{ padding: 15 }}>
        <div className="ns-text-center">
          <Text size="lg" weight="bold" className="mb-2">
            Success!
          </Text>
          <Text size="sm" color="grey" className="mb-3">
            You've created {successData.fullSubname}
          </Text>

          <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Text size="sm" color="grey">
                Subname
              </Text>
              <Text size="sm" weight="medium">
                {successData.fullSubname}
              </Text>
            </div>
            {successData.ownerAddress && (
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Text size="sm" color="grey">
                  Owner
                </Text>
                <Text size="xs" weight="medium" style={{ fontFamily: "monospace" }}>
                  {successData.ownerAddress.slice(0, 6)}...{successData.ownerAddress.slice(-4)}
                </Text>
              </div>
            )}
            {(successData.records.addresses.length > 0 || successData.records.texts.length > 0) && (
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Text size="sm" color="grey">
                  Records set
                </Text>
                <Text size="sm" weight="medium">
                  {successData.records.addresses.length + successData.records.texts.length}
                </Text>
              </div>
            )}
          </div>

          <div className="mt-3 d-flex" style={{ gap: "8px" }}>
            <Button
              variant="outline"
              size="lg"
              onClick={handleCreateAnother}
              style={{ flex: 1 }}
            >
              Create Another
            </Button>
            {onCancel && (
              <Button
                variant="solid"
                size="lg"
                onClick={onCancel}
                style={{ flex: 1 }}
              >
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main form
  return (
    <div style={{ padding: 15 }}>
      {!hideTitle && (
        <Text className="ns-text-center mb-3" weight="bold">
          Create Offchain Subname
        </Text>
      )}

      {/* Name input */}
      <div>
        <Input
          value={label}
          onChange={(e) => handleNameChanged(e.target.value)}
          disabled={isCreating}
          size="lg"
          placeholder="Enter subname"
          prefix={<Icon color="grey" size={20} name="search" />}
          suffix={
            <Text weight="medium" size="sm" color="grey">
              .{name}
            </Text>
          }
        />

        {/* Status Messages */}
        {label.length > 0 && label.length < MIN_ENS_LEN && (
          <div className="ns-text-center mt-2">
            <Text size="xs" color="grey">
              Minimum subname length is 1 character
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
                {label}.{name} is not available
              </Text>
            </div>
          )}

        {label.length >= MIN_ENS_LEN &&
          !availability.isChecking &&
          availability.isAvailable && (
            <div className="ns-text-center mt-2">
              <Text size="xs" color="grey" style={{ color: "green" }}>
                ✓ {label}.{name} is available
              </Text>
            </div>
          )}
      </div>

      {/* Owner Address Accordion */}
      {isAvailableForCreate && (
        <>
          <div className="mt-3">
            <Accordion
              title={
                <Text size="sm" weight="medium">
                  Set Owner Address (Optional)
                </Text>
              }
              isOpen={showOwnerAddress}
              onToggle={setShowOwnerAddress}
            >
              <div style={{ padding: "12px 0" }}>
                <Input
                  value={ownerAddress}
                  onChange={(e) => handleOwnerAddressChange(e.target.value)}
                  placeholder="0x..."
                  size="md"
                />
                {ownerAddressError && (
                  <div className="mt-1">
                    <Text size="xs" color="grey" style={{ color: "red" }}>
                      {ownerAddressError}
                    </Text>
                  </div>
                )}
                <div className="mt-1">
                  <Text size="xs" color="grey">
                    Leave empty to use default owner
                  </Text>
                </div>
              </div>
            </Accordion>
          </div>

          {/* Add Records */}
          <ProfileSelector onSelect={() => setShowProfile(true)} />
        </>
      )}

      {/* Error alert */}
      {error && (
        <div className="mt-2">
          <Alert variant="error" position="vertical">
            <Text size="sm">{error}</Text>
          </Alert>
        </div>
      )}

      {/* Action buttons */}
      <div className="ens-update-records-form-actions mt-3">
        {onCancel && (
          <Button
            variant="outline"
            size="lg"
            onClick={onCancel}
            disabled={isCreating}
          >
            Cancel
          </Button>
        )}
        <Button
          variant="solid"
          size="lg"
          disabled={!isAvailableForCreate || isCreating}
          onClick={handleCreate}
          loading={isCreating}
        >
          {isCreating ? "Creating..." : "Create"}
        </Button>
      </div>
    </div>
  );
};

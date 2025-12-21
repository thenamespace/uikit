import React, { useEffect, useMemo, useState } from "react";
import ninjaImage from "../../assets/banner.png";
import "./RegistrationProcess.css";
import "./sub-components/SubComponents.css";
import { Accordion } from "../molecules/accordion";
import { Alert } from "../molecules/alert/Alert";
import {
  ContractErrorLabel,
  isUserDeniedError,
} from "../molecules/contract-error-label/ContractErrorLabel";
import { Button, Text, Icon } from "../atoms";
import { useRegisterENS, useWaitTransaction } from "@/hooks";
import { useAccount, useSwitchChain } from "wagmi";
import { mainnet, sepolia } from "viem/chains";
import { ContractFunctionExecutionError, Hash } from "viem";
import { EnsRecords } from "@/types";
import { ProgressBar } from "./sub-components/ProgressBar";
import { Timer } from "./sub-components/Timer";

export enum ProcessSteps {
  Start = 0,
  CommitmentSent = 1,
  CommitmentCompleted = 2,
  TimerStarted = 3,
  TimerCompleted = 4,
  RegistrationSent = 5,
  RegistrationCompleted = 6,
}

interface RegistrationState {
  step: ProcessSteps;
  commitment: { tx?: string; completed: boolean; time: number };
  timerStartedAt: number;
  registration: { tx?: string; completed: boolean };
  label: string;
  isTestnet?: boolean;
  secret: string;
  expiryInYears: number;
  records: EnsRecords;
}

interface RegistrationProcessProps {
  label: string;
  expiryInYears: number;
  isTestnet: boolean;
  records: EnsRecords;
  onBack?: () => void;
}
export const RegistrationProcess: React.FC<RegistrationProcessProps> = ({
  label,
  expiryInYears,
  isTestnet = false,
  records,
  onBack,
}) => {
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const expectedChainId = isTestnet ? sepolia.id : mainnet.id;
  const isOnCorrectNetwork = chain?.id === expectedChainId;
  const shouldSwitchNetwork = chain && !isOnCorrectNetwork;

  const [registrationState, setRegistrationState] = useState<RegistrationState>(
    {
      step: ProcessSteps.TimerCompleted,
      label: label,
      commitment: { completed: false, time: 0 },
      registration: { completed: false },
      timerStartedAt: 0,
      expiryInYears: expiryInYears,
      secret: "0x0",
      records: records,
      isTestnet: isTestnet,
    }
  );

  const handleSwitchNetwork = () => {
    if (switchChain) {
      switchChain({ chainId: expectedChainId });
    }
  };

  const handleTimerPassed = () => {
    setRegistrationState({...registrationState, step: ProcessSteps.TimerCompleted})
  }

  const networkName = isTestnet ? "Sepolia" : "Mainnet";

  return (
    <div className="ens-registration-progress">
      <button
        className="ens-registration-close-btn"
        onClick={onBack || undefined}
        type="button"
        aria-label="Close"
      >
        <Icon name="chevron-left" size={16} />
      </button>
      <div className="d-flex justify-content-center">
        <img
          style={{ width: "250px", margin: "auto" }}
          src={ninjaImage}
          alt="Ninja Image"
        />
      </div>
      <div className="ns-text-center mt-2 mb-2">
        <Text size="lg" weight="medium">
          ENS Registration Process
        </Text>
        <Text size="xs" color="grey">
          Registration Consists of 3 Steps
        </Text>
      </div>

      {shouldSwitchNetwork && (
        <div className="mt-2">
          <Alert variant="warning" title="Wrong Network">
            <div className="d-flex flex-column align-items-center">
              <Text size="sm" className="mb-2">
                Please switch to {networkName} to continue with the registration
                process.
              </Text>
              <Button onClick={handleSwitchNetwork} size="md">
                Switch to {networkName}
              </Button>
            </div>
          </Alert>
        </div>
      )}

      {isOnCorrectNetwork && (
        <>
          <div className="mt-2">
            <ComitmentStep
              state={registrationState}
              isTestnet={isTestnet}
              onStateUpdated={state => setRegistrationState(state)}
            />
          </div>

          <div className="mt-2">
            <TimerStep state={registrationState} onTimerCompleted={handleTimerPassed}/>
          </div>

          <div className="mt-2">
            <RegistrationStep state={registrationState} />
          </div>
        </>
      )}
    </div>
  );
};

interface ProgressStepProps {
  state: RegistrationState;
  isTestnet?: boolean;
  onStateUpdated: (state: RegistrationState) => void;
}

const ComitmentStep = ({
  state,
  isTestnet,
  onStateUpdated,
}: ProgressStepProps) => {
  const { sendCommitmentTx } = useRegisterENS({ isTestnet });
  const { waitTx } = useWaitTransaction({ isTestnet });
  const [error, setError] = useState<ContractFunctionExecutionError | null>(
    null
  );
  const { address } = useAccount();
  const [btnState, setBtnState] = useState<{
    waitingWallet: boolean;
    waitingTx: boolean;
  }>({
    waitingTx: false,
    waitingWallet: false,
  });
  const [commitTxStatus, setCommitTxStatus] = useState<{
    sent: boolean;
    completed: boolean;
    hash: string;
  }>({
    sent: false,
    completed: false,
    hash: "",
  });

  const { isCurrentStep, isCompleted } = useMemo(() => {
    return {
      isCurrentStep: state.step <= ProcessSteps.TimerStarted,
      isCompleted: state.step >= ProcessSteps.TimerStarted,
    };
  }, [state]);

  const handleCommitment = async () => {
    // Clear any previous errors
    setError(null);
    let tx: Hash | null = null;

    try {
      setBtnState({ ...btnState, waitingWallet: true });

      tx = await sendCommitmentTx({
        label: state.label,
        owner: address!,
        expiryInYears: state.expiryInYears,
        secret: state.secret,
        records: state.records,
      });
      setCommitTxStatus({ sent: true, completed: false, hash: tx });

      onStateUpdated({
        ...state,
        step: ProcessSteps.CommitmentSent,
        commitment: { tx: tx, completed: false, time: 0 },
      });

      setBtnState({ waitingTx: true, waitingWallet: false });
    } catch (err: any) {
      console.error(err);
      if (
        err instanceof ContractFunctionExecutionError &&
        !isUserDeniedError(err)
      ) {
        setError(err);
      } else if (!isUserDeniedError(err)) {
        const genericError = new Error(
          err?.shortMessage || err?.message || "Transaction failed"
        );
        setError(genericError as ContractFunctionExecutionError);
      }
    } finally {
      setBtnState({ waitingTx: false, waitingWallet: false });
    }

    if (!tx) {
      return;
    }

    try {
      // Wait for transaction with retry
      await waitTx({ hash: tx });

      setCommitTxStatus({ sent: true, completed: true, hash: tx });

      setTimeout(() => {
        onStateUpdated({
          ...state,
          step: ProcessSteps.TimerStarted,
          commitment: { tx: tx, completed: true, time: new Date().getTime() },
        });
        setCommitTxStatus({ sent: false, completed: false, hash: "" });
      }, 1000);
    } catch (err) {
      console.error(err);
      setCommitTxStatus({ sent: false, completed: false, hash: "" });
    }
  };

  const btnDisabled = btnState.waitingTx || btnState.waitingWallet;
  const btnLabel = btnState.waitingWallet ? "Waiting Wallet..." : "Open Wallet";

  const getProgressStatusBadge = () => {
    return (
      <div className="ns-process-badge me-2">
        <Text color="white" weight="bold" size="sm">
          1
        </Text>
      </div>
    );
  };

  return (
    <Accordion
      isOpen={isCurrentStep}
      togglable={true}
      title={
        <div className="d-flex align-items-center">
          {getProgressStatusBadge()}
          <Text size="sm" weight="medium">
            Commitment
          </Text>
        </div>
      }
      defaultOpen={true}
    >
      {!commitTxStatus.sent && (
        <>
          <div className="ns-text-center">
            <Text weight="medium" className="mb-2">
              Start Your Journey
            </Text>
            <Text size="xs" color="grey">
              Kickstart your registration by completing a transaction. This
              action sets your timer and officially begins the process. Simply
              create the transaction in your wallet to move forward.
            </Text>
            {!isCompleted && (
              <Button
                disabled={btnDisabled}
                onClick={() => handleCommitment()}
                className="mt-3 ns-wd-100"
              >
                {btnLabel}
              </Button>
            )}
            <ContractErrorLabel error={error} />
          </div>
        </>
      )}
      {commitTxStatus.sent && (
        <TransactionPendingScreen
          isTestnet={isTestnet}
          message="Your transaction has been sent! Once the progress bar completes, your registration will be confirmed."
          hash={commitTxStatus.hash as Hash}
          isCompleted={commitTxStatus.completed}
        />
      )}
    </Accordion>
  );
};

interface TimerStepProps {
  state: RegistrationState;
  onTimerCompleted?: () => void;
}

const TimerStep = ({ state, onTimerCompleted }: TimerStepProps) => {
  const INITIAL_SECONDS = 60;
  const [secondsToWait, setSecondsToWait] = useState<number>(INITIAL_SECONDS);

  const { isCurrentStep, isDisabled } = useMemo(() => {
    const isCurrentStep = state.step >= ProcessSteps.CommitmentCompleted;
    const isDisabled = !isCurrentStep;
    return {
      isCurrentStep,
      isDisabled,
    };
  }, [state]);

  useEffect(() => {
     if (!isCurrentStep) {
        return;
      }
    const int = setInterval(() => {
      setSecondsToWait(prev => {
        if (prev <= 0) {
          onTimerCompleted?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(int);
  }, [onTimerCompleted, isCurrentStep]);

  // Calculate progress: 60 seconds = 0%, 0 seconds = 100%
  const progress = Math.ceil(
    ((INITIAL_SECONDS - secondsToWait) / INITIAL_SECONDS) * 100
  );

  return (
    <Accordion
      disabled={isDisabled}
      isOpen={isCurrentStep}
      title={
        <div className="d-flex align-items-center">
          <div
            className={`ns-process-badge me-2 ${!isCurrentStep ? "ns-process-badge--inactive" : ""}`}
          >
            <Text
              color={isCurrentStep ? "white" : "primary"}
              weight="bold"
              size="sm"
            >
              2
            </Text>
          </div>
          <Text size="sm" weight="medium">
            Timer Started
          </Text>
        </div>
      }
    >
      <div className="ns-text-center">
        <Text weight="medium" className="mb-2">
          Waiting...
        </Text>
        <Text size="xs" color="grey">
          This wait prevents others from front running your transaction. You
          will be prompted to complete a second transaction when the timer is
          complete.
        </Text>
        <Timer seconds={secondsToWait} progress={progress} />
      </div>
    </Accordion>
  );
};

const RegistrationStep = ({ state }: { state: RegistrationState }) => {
  const { isCurrentStep, isDisabled } = useMemo(() => {
    const isCurrentStep = state.step >= ProcessSteps.TimerCompleted;
    const isDisabled = !isCurrentStep;

    return {
      isCurrentStep,
      isDisabled,
    };
  }, [state]);

  return (
    <Accordion
      togglable={false}
      disabled={isDisabled}
      title={
        <div className="d-flex align-items-center">
          <div
            className={`ns-process-badge me-2 ${!isCurrentStep ? "ns-process-badge--inactive" : ""}`}
          >
            <Text
              color={isCurrentStep ? "white" : "primary"}
              weight="bold"
              size="sm"
            >
              3
            </Text>
          </div>
          <Text size="sm" weight="medium">
            Complete Registration
          </Text>
        </div>
      }
    >
      <div className="ns-text-center">
        <Text weight="medium" className="mb-2">
          Register Name
        </Text>
        <Text size="xs" color="grey">
          Your name is not registered until you've completed the second
          transaction. You have 23 hours remaining to complete it.
        </Text>
        <Button className="mt-3 ns-wd-100">Open Wallet</Button>
      </div>
    </Accordion>
  );
};

const TransactionPendingScreen = ({
  message,
  hash,
  isCompleted,
  isTestnet,
}: {
  message?: string;
  hash: Hash;
  isCompleted: boolean;
  isTestnet?: boolean;
}) => {
  const [progressStep, setProgressStep] = useState(0);

  useEffect(() => {
    if (isCompleted) {
      setProgressStep(98);
      return;
    }

    const int = setInterval(() => {
      if (progressStep >= 98) {
        setProgressStep(50);
        return;
      }
      setProgressStep(progressStep + 0.4);
    }, 100);

    return () => clearInterval(int);
  }, [progressStep, isCompleted]);

  // Get etherscan URL based on network
  const getEtherscanUrl = (hash: string) => {
    const baseUrl = isTestnet
      ? "https://sepolia.etherscan.io"
      : "https://etherscan.io";
    return `${baseUrl}/tx/${hash}`;
  };

  return (
    <div className="ns-text-center">
      <Text weight="medium">
        Transaction {!isCompleted ? "in Progress" : "Completed!"}
      </Text>
      <Text color="grey" size="xs" className="mt-2">
        {message || "Your transaction has been sent!"}
      </Text>
      <ProgressBar progress={progressStep} />
      <a href={getEtherscanUrl(hash)} target="_blank">
        <Text className="mt-2" size="xs" color="grey">
          Check on Etherscan
        </Text>
      </a>
    </div>
  );
};

import React, { useMemo, useState } from "react";
import { Button, Text } from "@/components/atoms";
import { ProcessSteps, RegistrationState } from "./types";
import { useRegisterENS, useWaitTransaction } from "@/hooks";
import { ContractFunctionExecutionError, Hash } from "viem";
import {
  ContractErrorLabel,
  Accordion,
  isUserDeniedError,
} from "@/components/molecules";
import { useAccount } from "wagmi";
import { TransactionPendingScreen } from "./TransactionPendingScreen";

interface RegistrationStepProps {
  state: RegistrationState;
  isTestnet: boolean;
  onStateUpdated: (state: RegistrationState) => void;
  onSuccess?: () => void;
}

export const RegistrationStep: React.FC<RegistrationStepProps> = ({
  state,
  isTestnet,
  onStateUpdated,
  onSuccess,
}) => {
  const [btnState, setBtnState] = useState<{
    waitingWallet: boolean;
    waitingTx: boolean;
  }>({
    waitingTx: false,
    waitingWallet: false,
  });
  const { address } = useAccount();
  const { waitTx } = useWaitTransaction({ isTestnet });
  const [error, setError] = useState<ContractFunctionExecutionError | null>(
    null
  );
  const [commitTxStatus, setCommitTxStatus] = useState<{
    sent: boolean;
    completed: boolean;
    hash: string;
  }>({
    sent: false,
    completed: false,
    hash: "",
  });

  const { sendRegisterTx } = useRegisterENS({ isTestnet });

  const handleRegistration = async () => {
    setError(null);
    let tx: Hash | null = null;

    try {
      setBtnState({ ...btnState, waitingWallet: true });

      tx = await sendRegisterTx({
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

  const { isCurrentStep, isDisabled, isPending } = useMemo(() => {
    const isPending = state.step < ProcessSteps.TimerCompleted;
    const isCurrentStep = state.step >= ProcessSteps.TimerCompleted;
    const isDisabled = state.step < ProcessSteps.TimerCompleted;
    return {
      isCurrentStep,
      isDisabled,
      isPending
    };
  }, [state]);

  const btnDisabled = btnState.waitingTx || btnState.waitingWallet;
  const btnLabel = btnState.waitingWallet ? "Waiting Wallet..." : "Open Wallet";

  return (
    <Accordion
      togglable={isCurrentStep}
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
              3
            </Text>
          </div>
          <Text size="sm" weight="medium">
            Complete Registration
          </Text>
        </div>
      }
    >
      {!commitTxStatus.sent && (
        <div className="ns-text-center">
          <Text weight="medium" className="mb-2">
            Register Name
          </Text>
          <Text size="xs" color="grey">
            Your name is not registered until you've completed the second
            transaction. You have 23 hours remaining to complete it.
          </Text>
          <Button
            disabled={btnDisabled}
            onClick={() => handleRegistration()}
            className="mt-3 ns-wd-100"
          >
            {btnLabel}
          </Button>
          <ContractErrorLabel error={error} />
        </div>
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

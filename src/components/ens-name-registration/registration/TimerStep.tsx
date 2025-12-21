import React, { useEffect, useMemo, useState } from "react";
import { Accordion } from "../../molecules/accordion";
import { Text } from "../../atoms";
import { ProcessSteps, RegistrationState } from "./types";
import { Timer } from "./Timer";

interface TimerStepProps {
  state: RegistrationState;
  onTimerCompleted?: () => void;
}

export const TimerStep: React.FC<TimerStepProps> = ({
  state,
  onTimerCompleted,
}) => {
  const INITIAL_SECONDS = 15;
  const [secondsToWait, setSecondsToWait] = useState<number>(INITIAL_SECONDS);

  const { isCurrentStep, isDisabled, shouldStartTimer, isPending } = useMemo(() => {
    const isPending = state.step < ProcessSteps.TimerStarted;
    const isCurrentStep =
      state.step >= ProcessSteps.CommitmentCompleted &&
      state.step < ProcessSteps.TimerCompleted;  
    const isDisabled = !isCurrentStep;
    return {
      isCurrentStep,
      isDisabled,
      shouldStartTimer: state.step === ProcessSteps.TimerStarted,
      isPending
    };
  }, [state]);

  useEffect(() => {
    if (!shouldStartTimer) {
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
  }, [onTimerCompleted, shouldStartTimer]);

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

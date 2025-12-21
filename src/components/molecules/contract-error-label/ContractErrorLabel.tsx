import React from "react";
import { ContractFunctionExecutionError } from "viem";
import { Alert } from "../alert/Alert";
import { Text } from "../../atoms";

export interface ContractErrorLabelProps {
  error: ContractFunctionExecutionError | null;
  className?: string;
}

/**
 * Checks if an error is a user rejection error (user denied the transaction)
 */
export const isUserDeniedError = (error: unknown): boolean => {
  if (!error || typeof error !== "object") return false;
  
  // Check for user rejection code (4001)
  if ("code" in error && error.code === 4001) return true;
  
  // Check for user rejection in message
  const message =
    ("shortMessage" in error ? error.shortMessage : null) ||
    ("message" in error ? error.message : null) ||
    "";
  
  const lowerMessage = typeof message === "string" ? message.toLowerCase() : "";
  return (
    lowerMessage.includes("user rejected") ||
    lowerMessage.includes("rejected the request") ||
    lowerMessage.includes("user denied")
  );
};

export const ContractErrorLabel: React.FC<ContractErrorLabelProps> = ({
  error,
  className = "",
}) => {
  // Don't show error if it's a user rejection
  if (!error) {
    return null;
  }

  if (isUserDeniedError(error)) {
    return null;
  }

  const errorMessage = error.shortMessage || error.message || "Transaction failed";

  return (
    <div className={`mt-2 ns-wd-100 ${className}`} style={{ width: "100%", boxSizing: "border-box" }}>
      <Alert variant="error" className="ns-wd-100">
        <Text size="sm">{errorMessage} Check console for more info.</Text>
      </Alert>
    </div>
  );
};

export default ContractErrorLabel;


import { useMemo } from "react";
import {
  AvatarSDKError,
  ErrorCodes,
  createAvatarClient,
} from "@thenamespace/avatar";
import type { UploadResult } from "@thenamespace/avatar";
import { useAccount, useWalletClient } from "wagmi";
import { mainnet, sepolia } from "viem/chains";

interface UseAvatarClientParams {
  isTestnet?: boolean;
  domain?: string;
}

export interface UploadAvatarParams {
  ensName: string;
  file: File;
  onProgress?: (progress: number) => void;
}

const AVATAR_LOG_PREFIX = "[AvatarUpload]";

const asObject = (value: unknown): Record<string, unknown> | null => {
  if (!value || typeof value !== "object") {
    return null;
  }
  return value as Record<string, unknown>;
};

const asString = (value: unknown): string | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const asNumber = (value: unknown): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return undefined;
};

const asBoolean = (value: unknown): boolean | undefined => {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    if (value === "true") return true;
    if (value === "false") return false;
  }
  return undefined;
};

const pickFirstString = (
  sources: Array<Record<string, unknown> | null>,
  keys: string[]
): string | undefined => {
  for (const source of sources) {
    if (!source) continue;
    for (const key of keys) {
      const value = asString(source[key]);
      if (value) return value;
    }
  }
  return undefined;
};

const normalizeUploadResult = (rawResult: unknown): UploadResult => {
  const root = asObject(rawResult);
  const rootData = asObject(root?.data);
  const rootResult = asObject(root?.result);
  const nestedData = asObject(rootData?.data);
  const nestedResult = asObject(rootResult?.data);
  const sources = [root, rootData, rootResult, nestedData, nestedResult];

  const url =
    pickFirstString(sources, ["url", "avatarUrl", "imageUrl", "fileUrl"]) ||
    undefined;

  if (!url) {
    throw new Error("Upload response did not include a URL.");
  }

  const uploadedAt =
    pickFirstString(sources, [
      "uploadedAt",
      "uploaded_at",
      "createdAt",
      "created_at",
      "timestamp",
    ]) || new Date().toISOString();

  const fileSize = (() => {
    for (const source of sources) {
      if (!source) continue;
      const parsed = asNumber(source.fileSize ?? source.size ?? source.bytes);
      if (parsed !== undefined) return parsed;
    }
    return 0;
  })();

  const isUpdate = (() => {
    for (const source of sources) {
      if (!source) continue;
      const parsed = asBoolean(source.isUpdate ?? source.is_update);
      if (parsed !== undefined) return parsed;
    }
    return false;
  })();

  const pending = (() => {
    for (const source of sources) {
      if (!source) continue;
      const parsed = asBoolean(source.pending);
      if (parsed !== undefined) return parsed;
    }
    return undefined;
  })();

  const message = pickFirstString(sources, ["message", "status", "detail"]);

  return {
    url,
    uploadedAt,
    fileSize,
    isUpdate,
    pending,
    message,
  };
};

const getDefaultDomain = () => {
  if (typeof window === "undefined") {
    return "localhost";
  }
  return window.location.hostname;
};

export const getAvatarUploadErrorMessage = (err: unknown): string => {
  if (err instanceof AvatarSDKError) {
    switch (err.code) {
      case ErrorCodes.MISSING_PROVIDER:
        return "Please connect your wallet to upload avatar.";
      case ErrorCodes.NOT_SUBNAME_OWNER:
        return "You do not own this ENS name.";
      case ErrorCodes.FILE_TOO_LARGE:
        return "Image is too large.";
      case ErrorCodes.INVALID_FILE_TYPE:
        return "Unsupported image type.";
      case ErrorCodes.EXPIRED_NONCE:
        return "Signature expired. Please try again.";
      case ErrorCodes.INVALID_SIGNATURE:
        return "Wallet signature verification failed.";
      default:
        return err.message || "Failed to upload avatar.";
    }
  }

  if (err instanceof Error && err.message) {
    return err.message;
  }
  return "Failed to upload avatar.";
};

export const useAvatarClient = ({ isTestnet, domain }: UseAvatarClientParams) => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const resolvedDomain = domain || getDefaultDomain();
  const fallbackChainId = isTestnet ? sepolia.id : mainnet.id;

  const provider = useMemo(() => {
    if (!walletClient || !address) {
      return undefined;
    }

    return {
      getAddress: async () => address,
      signMessage: async (message: string) => {
        return walletClient.signMessage({
          account: address,
          message,
        });
      },
      getChainId: async () => walletClient.chain?.id || fallbackChainId,
    };
  }, [walletClient, address, fallbackChainId]);

  const client = useMemo(() => {
    return createAvatarClient({
      network: isTestnet ? "sepolia" : "mainnet",
      domain: resolvedDomain,
      provider,
    });
  }, [isTestnet, resolvedDomain, provider]);

  const uploadAvatar = async (params: UploadAvatarParams): Promise<UploadResult> => {
    if (!provider || !address) {
      throw new Error("Please connect your wallet to upload avatar.");
    }

    try {
      console.info(`${AVATAR_LOG_PREFIX} starting`, {
        ensName: params.ensName,
        fileName: params.file.name,
        fileType: params.file.type,
        fileSize: params.file.size,
        network: isTestnet ? "sepolia" : "mainnet",
        domain: resolvedDomain,
        wallet: address,
      });

      const rawResult = await (client.uploadAvatar({
        subname: params.ensName,
        file: params.file,
        onProgress: params.onProgress,
      }) as unknown);

      console.info(`${AVATAR_LOG_PREFIX} raw result`, rawResult);
      const normalizedResult = normalizeUploadResult(rawResult);
      console.info(`${AVATAR_LOG_PREFIX} normalized result`, normalizedResult);
      return normalizedResult;
    } catch (err) {
      console.error(`${AVATAR_LOG_PREFIX} failed`, err);
      throw new Error(getAvatarUploadErrorMessage(err));
    }
  };

  return {
    uploadAvatar,
    getErrorMessage: getAvatarUploadErrorMessage,
  };
};

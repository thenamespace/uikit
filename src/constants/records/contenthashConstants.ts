import { ContenthashProtocol } from "@/types";
import { encode } from "@ensdomains/content-hash";

export interface SupportedContenthashRecord {
  protocol: ContenthashProtocol;
  label: string;
}

export const supportedContenthashRecords: SupportedContenthashRecord[] = [
  {
    protocol: ContenthashProtocol.Ipfs,
    label: "Ipfs",
  },
  {
    protocol: ContenthashProtocol.Onion,
    label: "Onion3",
  },
  {
    protocol: ContenthashProtocol.Arweave,
    label: "Arweave",
  },
  {
    protocol: ContenthashProtocol.Skynet,
    label: "Skynet",
  },
  {
    protocol: ContenthashProtocol.Swarm,
    label: "Swarm",
  },
];

export const getSupportedChashByProtocol = (
  protocol: ContenthashProtocol
): SupportedContenthashRecord | undefined => {
  return supportedContenthashRecords.find(chash => chash.protocol === protocol);
};

export const isContenthashValid = (
  protocol: ContenthashProtocol,
  value: string
) => {
  try {
    encode(protocol, value);
    return true;
  } catch (err) {
    return false;
  }
};

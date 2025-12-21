import {
  Address,
  formatEther,
  Hash,
  keccak256,
  namehash,
  parseAbi,
  toBytes,
  zeroAddress,
} from "viem";
import { mainnet, sepolia } from "viem/chains";
import { usePublicClient, useWalletClient } from "wagmi";
import { getEnsContracts } from "@thenamespace/addresses";
import { createEnsReferer, equalsIgnoreCase, formatFloat } from "@/utils";
import { ABIS } from "./abis";
import { EnsRecords } from "@/types";
import { convertToResolverData } from "@/utils/resolver";

const SECONDS_IN_YEAR = 31_536_000;
interface RentPriceResponse {
  wei: bigint;
  eth: number;
}

const NAMESPACE_REFERRER_ADDRESS = "0xb7B18611b8C51B4B3F400BaF09DB49E61e0aF044";
const ENS_REFERRER = createEnsReferer(NAMESPACE_REFERRER_ADDRESS);

const ENS_REGISTRY_ABI = parseAbi([
  "function owner(bytes32) view returns (address)",
]);
export interface CommitmentRequest {
  label: string;
  owner: Address;
  expiryInYears: number;
  secret: string;
  records: EnsRecords;
}

interface EnsRegistration {
  label: string;
  owner: Address;
  duration: bigint;
  secret: Hash;
  resolver: Address;
  data: Hash[];
  reverseRecord: number;
  referrer: Hash;
}

export const useRegisterENS = ({ isTestnet }: { isTestnet?: boolean }) => {
  const publicClient = usePublicClient({
    chainId: isTestnet ? sepolia.id : mainnet.id,
  });
  const { data: walletClient } = useWalletClient({
    chainId: isTestnet ? sepolia.id : mainnet.id,
  });

  const getRegistrationPrice = async (
    label: string,
    expiryInYears: number = 1
  ): Promise<RentPriceResponse> => {
    const price = (await publicClient!.readContract({
      abi: ABIS.ETH_REGISTRAR_CONTOLLER,
      functionName: "rentPrice",
      args: [label, expiryInYears * SECONDS_IN_YEAR],
      address: getEthController(),
    })) as { base: bigint; premium: bigint };

    const totalPrice = price.base + price.premium;
    return {
      wei: totalPrice,
      eth: formatFloat(formatEther(totalPrice, "wei"), 4),
    };
  };

  const isEnsAvailable = async (label: string): Promise<boolean> => {
    const ownerAddress = await publicClient!.readContract({
      functionName: "owner",
      abi: ENS_REGISTRY_ABI,
      args: [namehash(`${label}.eth`)],
      address: getEnsRegistry(),
    });
    return equalsIgnoreCase(ownerAddress, zeroAddress);
  };

  const makeCommitment = async (request: CommitmentRequest): Promise<Hash> => {
    const fullName = `${request.label}.eth`;
    const resolverData = convertToResolverData(fullName, request.records);

    const c: EnsRegistration = {
      label: request.label,
      owner: request.owner,
      duration: BigInt(yearsToSeconds(request.expiryInYears)),
      secret: keccak256(toBytes(request.secret)),
      resolver: getPublicResolver(),
      data: resolverData,
      reverseRecord: 0,
      referrer: ENS_REFERRER,
    };

    return (await publicClient!.readContract({
      functionName: "makeCommitment",
      abi: ABIS.ETH_REGISTRAR_CONTOLLER,
      address: getEthController(),
      args: [c],
    })) as Hash;
  };

  const yearsToSeconds = (years: number) => {
    return Math.ceil(years * SECONDS_IN_YEAR);
  };

  const sendCommitmentTx = async (
    request: CommitmentRequest
  ): Promise<Hash> => {
    if (!walletClient || !walletClient.account) {
      throw new Error("Wallet client is not available");
    }

    const commitment = await makeCommitment(request);
    const { request: contractRequest } = await publicClient!.simulateContract({
      address: getEthController(),
      abi: ABIS.ETH_REGISTRAR_CONTOLLER,
      functionName: "commit",
      args: [commitment],
      account: walletClient.account,
    });
    return walletClient.writeContract(contractRequest);
  };

  const getRegistrationCommitment = async (): Promise<Hash> => {
    return "0x";
  };

  const sendRegisterTx = async () => {};

  const getEthController = () => {
    return getEnsContracts(isTestnet).ethRegistrarController;
  };

  const getEnsRegistry = () => {
    return getEnsContracts(isTestnet).ensRegistry;
  };

  const getPublicResolver = () => {
    return getEnsContracts(isTestnet).publicResolver;
  };

  return {
    isEnsAvailable,
    getRegistrationPrice,
    sendCommitmentTx,
  };
};

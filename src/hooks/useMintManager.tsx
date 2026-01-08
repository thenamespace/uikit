import { ListingNetwork, NameListing } from "@/types";
import { createMintClient } from "@thenamespace/mint-manager";
import { useMemo } from "react";

const LIST_MANAGER_API = "https://list-manager.namespace.ninja";
const LIST_MANAGER_TESTNET_API = "https://staging.list-manager.namespace.ninja";

export const useMintManager = ({ isTestnet }: { isTestnet?: boolean }) => {
  const mintClient = useMemo(() => {
    return createMintClient({
      cursomRpcUrls: {},
      isTestnet: isTestnet || false,
    });
  }, [isTestnet]);

  const getListingDetails = async (name: string): Promise<NameListing> => {
    return fetch(
      `${getListManagerApi()}/api/v1/listing/network/${getListingNetwork()}/name/${name}`
    ).then(res => res.json());
  };

  const getListManagerApi = () => {
    return isTestnet ? LIST_MANAGER_TESTNET_API : LIST_MANAGER_API;
  };
  const getListingNetwork = () => {
    return isTestnet ? ListingNetwork.Sepolia : ListingNetwork.Mainnet;
  };

  return {
    mintClient: mintClient,
    getListingDetails,
  };
};

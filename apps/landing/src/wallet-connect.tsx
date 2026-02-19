import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const ALCHEMY_RPC = "https://eth-mainnet.g.alchemy.com/v2/hFMEk-pg2hvLDZM9UOHQH";

const config = getDefaultConfig({
  appName: "ENS Components",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  transports: {
    [mainnet.id]: http(ALCHEMY_RPC),
    [polygon.id]: http(ALCHEMY_RPC),
    [optimism.id]: http(ALCHEMY_RPC),
    [arbitrum.id]: http(ALCHEMY_RPC),
    [base.id]: http(ALCHEMY_RPC),
    [sepolia.id]: http(ALCHEMY_RPC),
  },
  ssr: false,
});

const queryClient = new QueryClient();

export const WalletConnectProvider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

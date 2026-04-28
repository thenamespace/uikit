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

const ALCHEMY_KEY = "hFMEk-pg2hvLDZM9UOHQH";
const ALCHEMY_MAINNET = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;
const ALCHEMY_SEPOLIA = `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`;
const ALCHEMY_POLYGON = `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;
const ALCHEMY_OPTIMISM = `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;
const ALCHEMY_ARBITRUM = `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;
const ALCHEMY_BASE = `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;

const config = getDefaultConfig({
  appName: "Namespace Storybook",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  transports: {
    [mainnet.id]: http(ALCHEMY_MAINNET),
    [polygon.id]: http(ALCHEMY_POLYGON),
    [optimism.id]: http(ALCHEMY_OPTIMISM),
    [arbitrum.id]: http(ALCHEMY_ARBITRUM),
    [base.id]: http(ALCHEMY_BASE),
    [sepolia.id]: http(ALCHEMY_SEPOLIA),
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

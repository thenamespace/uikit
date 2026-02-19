# `@thenamespace/ens-components`

React UI kit for registering ENS names, minting subnames, and managing ENS
records.

## Repository structure

This is a **pnpm + Turborepo monorepo**:

```
ui-components/
├── packages/
│   └── components/        # @thenamespace/ens-components (published to npm)
└── apps/
    ├── storybook/         # Storybook 8 component docs (port 6006)
    └── landing/           # Landing page / live demo app (port 4000)
```

## What this library does

- Register `.eth` names (commit → wait → register)
- Mint onchain subnames from Namespace listings
- Create/update offchain subnames through the Namespace API
- Edit ENS resolver records (addresses, text, contenthash, avatar)

## Tech stack

- React + TypeScript
- `wagmi` + `viem` for wallet, chain, and contract interactions
- Namespace SDKs: `@thenamespace/mint-manager`, `@thenamespace/offchain-manager`, `@thenamespace/avatar`
- Build: Rollup (library), Vite (apps), Storybook 8
- Styling: CSS variables

## Install

```bash
npm install @thenamespace/ens-components
```

Peer dependencies (install separately):

```bash
npm install react react-dom wagmi viem
```

## Usage

### 1) Wrap your app with web3 providers

The library requires wagmi + react-query providers. Use your own setup or
RainbowKit's `getDefaultConfig`:

```tsx
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "My App",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [mainnet, sepolia],
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={new QueryClient()}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### 2) Import styles

```tsx
import "@thenamespace/ens-components/styles.css";
```

### 3) Render components

```tsx
import {
  EnsNameRegistrationForm,
  EnsRecordsForm,
  SubnameMintForm,
  OffchainSubnameForm,
} from "@thenamespace/ens-components";

// Register an ENS name
<EnsNameRegistrationForm isTestnet={false} />;

// Update records for an existing name
<EnsRecordsForm
  name="alice.eth"
  existingRecords={{ texts: [], addresses: [] }}
  isTestnet={false}
/>;

// Mint onchain subname
<SubnameMintForm parentName="alice.eth" isTestnet={false} />;

// Create/update offchain subname (requires API token/key)
<OffchainSubnameForm
  name="alice.eth"
  apiKeyOrToken="YOUR_NAMESPACE_API_KEY"
  isTestnet={false}
/>;
```

## Main exported surfaces

- **Components**: `EnsNameRegistrationForm`, `EnsRecordsForm`, `SubnameMintForm`, `OffchainSubnameForm`, atoms, molecules
- **Hooks**: `useRegisterENS`, `useENSResolver`, `useMintManager`, `useMintSubname`, `useOffchainManager`, `useWaitTransaction`, `useAvatarClient`
- **Types**: `EnsRecords`, `EnsAddressRecord`, `EnsTextRecord`, `EnsContenthashRecord`, listing and tx types
- **Utils**: resolver payload builders, records diff/validation, chain/coin helpers

## Avatar and header upload

The records editor (`SelectRecordsForm`) supports uploading avatar and header
images via SIWE-authenticated upload through `@thenamespace/avatar`.

- **Avatar upload** — crop to 1:1, max 2 MB
- **Header upload** — rectangular crop, max 5 MB
- **Manual URL** — enter an avatar or header URL directly

## Local development

```bash
# Install all workspace dependencies
pnpm install

# Start the landing page (http://localhost:4000)
pnpm landing

# Start Storybook (http://localhost:6006)
pnpm storybook

# Build everything (library → apps, in dependency order)
pnpm build

# Build the library only
pnpm --filter @thenamespace/ens-components build
```

Turbo handles build order automatically: the library is always built before
the apps that depend on it.

## Docker

A single image serves the landing page at `/` and Storybook at `/storybook/`
on port 3000:

```bash
docker compose up --build
```

## Publishing

CI publishes `packages/components` to npm on push to `main` via
`.github/workflows/npm.yaml`. Bump the version in
`packages/components/package.json` before merging.

## Maintainer notes

See `docs/MAINTAINER_NOTES.md` for architecture walkthrough, assumptions, and
known implementation caveats.

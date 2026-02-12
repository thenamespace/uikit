# `@thenamespace/ens-components`

React UI kit for registering ENS names, minting subnames, and managing ENS
records.

## What this library does

This package gives you production-ready ENS flows:

- Register `.eth` names (commit -> wait -> register)
- Mint onchain subnames from Namespace listings
- Create/update offchain subnames through Namespace offchain API
- Edit ENS resolver records (addresses, text, contenthash)
- Reusable atoms/molecules for wallet-aware ENS UIs

## Tech stack

- React + TypeScript
- `wagmi` + `viem` for wallet, chain, and contract interactions
- Namespace SDKs:
  - `@thenamespace/mint-manager`
  - `@thenamespace/offchain-manager`
  - `@thenamespace/addresses`
- Build: Rollup (library), Vite (local app), Storybook (component docs)
- Styling: CSS + CSS variables + Bootstrap grid utility import

## Install

```bash
npm install @thenamespace/ens-components
```

Required peer dependencies:

- `react` and `react-dom`
- `wagmi`
- `viem`

## How developers use it

### 1) Add wallet/web3 provider

You must wrap your app with wagmi/rainbowkit/react-query providers.

You can use the library helper:

```tsx
import { WalletConnectProvider } from "@thenamespace/ens-components";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <WalletConnectProvider>{children}</WalletConnectProvider>;
}
```

Or use your own wagmi setup if you already have one.

### 2) Import styles

```tsx
import "@thenamespace/ens-components/styles.css";
```

### 3) Render form components

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

- Components: `EnsNameRegistrationForm`, `EnsRecordsForm`,
  `SubnameMintForm`, `OffchainSubnameForm`, atoms, molecules
- Hooks: `useRegisterENS`, `useENSResolver`, `useMintManager`,
  `useMintSubname`, `useOffchainManager`, `useWaitTransaction`
- Types: `EnsRecords`, `EnsAddressRecord`, `EnsTextRecord`,
  `EnsContenthashRecord`, listing and tx types
- Utils: resolver payload builders, records diff/validation, chain/coin helpers

## Recent updates (test app + avatar upload)

- Test app now includes `OffchainSubnameForm` configured for offchain subname
  testing under `pushx.eth` (see `/src/main.tsx`).
- Avatar upload is available inside the shared records editor used by:
  - `EnsRecordsForm`
  - `OffchainSubnameForm` (create and update flows)
- Offchain records editing now supports:
  - Upload avatar image (SIWE-authenticated via `@thenamespace/avatar`)
  - Add avatar via manual URL
- Added defensive handling for upload responses that may not return fields in a
  single shape; the client now normalizes common nested payload patterns.
- Added upload debug logging in the browser console:
  - `[AvatarUploadModal] ...` (UI/modal step logs)
  - `[AvatarUpload] ...` (SDK call + response normalization logs)

### How to debug avatar upload quickly

1. Run `npm run test-app`
2. Open browser DevTools console
3. Trigger an avatar upload from the records editor
4. Check logs:
   - `[AvatarUploadModal] sign+upload started`
   - `[AvatarUpload] raw result`
   - `[AvatarUpload] normalized result`
   - `[AvatarUploadModal] upload result`

## Expected data model

Core record shape used throughout the kit:

```ts
interface EnsRecords {
  addresses: { coinType: number; value: string }[];
  texts: { key: string; value: string }[];
  contenthash?: { protocol: "ipfs" | "onion3" | "arweave" | "skynet" | "swarm"; value: string };
}
```

## Network and behavior assumptions

- ENS registration flow targets:
  - Mainnet (`isTestnet=false`) or Sepolia (`isTestnet=true`)
- Registration only handles second-level `.eth` labels
- Wallet must be connected and switched to expected chain
- Many flows are client-side only (use `window`/`localStorage`)
- Offchain subname flow requires valid Namespace API credentials per domain
- Resolver update assumes resolver supports `multicall`, `setText`, `setAddr`,
  and `setContenthash`

## Local development

```bash
# Dev library watch
npm run dev

# Storybook
npm run storybook

# Test app (manual integration app)
npm run test-app

# Build package
npm run build
```

## Maintainer notes

See `docs/MAINTAINER_NOTES.md` for architecture walkthrough, assumptions, and
known implementation caveats.

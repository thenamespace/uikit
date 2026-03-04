# ENS Components — Full Reference

## Component props

### EnsNameRegistrationForm

```ts
interface EnsNameRegistrationFormProps {
  isTestnet?: boolean;
  referrer?: string;               // Registration referrer wallet address
  noBorder?: boolean;
  title?: string;
  subtitle?: string;
  bannerImage?: string;
  hideBanner?: boolean;
  bannerWidth?: number;
  avatarUploadDomain?: string;
  onConnectWallet?: () => void;
}
```

### EnsRecordsForm

```ts
interface EnsRecordsFormProps {
  name: string;                    // Full ENS name, e.g. "alice.eth"
  existingRecords: EnsRecords;
  isTestnet?: boolean;
  noBorder?: boolean;
  txConfirmations?: number;
  avatarUploadDomain?: string;
  resolverAddress?: string;
  resolverChainId?: number;
  onCancel?: () => void;
}
```

### SelectRecordsForm

```ts
interface SelectRecordsFormProps {
  records: EnsRecords;
  onRecordsUpdated: (records: EnsRecords) => void;
}
```

### SubnameMintForm

```ts
interface SubnameMintFormProps {
  parentName: string;
  isTestnet?: boolean;
  txConfirmations?: number;
  avatarUploadDomain?: string;
  onConnectWallet?: () => void;
  onCancel?: () => void;
}
```

### OffchainSubnameForm

```ts
interface OffchainSubnameFormProps {
  offchainManager: OffchainClient;  // from createOffchainClient()
  name: string;                     // Parent ENS name
  label?: string;                   // Pre-fill and lock the subname input
  title?: string;                   // Override header title text
  subtitle?: string;                // Show subtitle below header
  hideTitle?: boolean;              // Hide the entire header
  isTestnet?: boolean;              // Used for avatar upload context
  avatarUploadDomain?: string;      // SIWE domain for avatar upload
  onCancel?: () => void;
  onSubnameCreated?: (data: OffchainSubnameCreatedData) => Promise<void> | void;
  onSubnameUpdated?: (data: OffchainSubnameCreatedData) => Promise<void> | void;
}

interface OffchainSubnameCreatedData {
  label: string;
  parentName: string;
  fullSubname: string;
  addresses: Array<{ chain: ChainName; value: string }>;
  texts: Array<{ key: string; value: string }>;
  owner?: string;                   // Only valid for createSubname, not updateSubname
}
```

## Exported types

```ts
// From @thenamespace/ens-components
export type { EnsRecords, EnsAddressRecord, EnsTextRecord, EnsContenthashRecord }
export type { OffchainSubnameCreatedData }
```

## Key files

| File | Purpose |
|------|---------|
| `packages/components/src/components/index.ts` | Main component exports |
| `packages/components/src/index.tsx` | Library entry — re-exports components, hooks, types, utils |
| `packages/components/rollup.config.mjs` | Three-bundle build config |
| `packages/components/tsconfig.types.json` | Type-only build (excludes stories, wallet-connect) |
| `apps/landing/src/App.tsx` | All demo sections, PropsDef arrays, code generators |

## Externalized dependencies (rollup)

These are NOT bundled — consumers must install them:

- `react`, `react-dom`
- `wagmi`, `viem`
- `@tanstack/react-query`
- `@thenamespace/offchain-manager`

## CSS variables (theming)

```css
--ns-color-primary
--ns-color-bg
--ns-color-bg-secondary
--ns-color-text
--ns-color-text-secondary
--ns-color-border
--ns-radius-md
--ns-radius-lg
```

## Dependency versions

| Package | Version |
|---------|---------|
| `viem` | `^2.46.3` |
| `wagmi` | `^2.19.5` |
| `@rainbow-me/rainbowkit` | `^2.2.10` |
| `@thenamespace/offchain-manager` | `^1.0.10` |

> wagmi v3 not yet supported — rainbowkit `^2.x` requires `wagmi ^2.x`.

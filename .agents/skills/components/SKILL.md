---
name: components
description: Work with @thenamespace/ens-components — building components, wiring props, updating the landing page demo, publishing. Use when adding features, changing props, fixing bugs, or updating examples for any of the five ENS UI components.
---

# ENS Components Skill

Reference guide for working on `@thenamespace/ens-components` in this monorepo.

## Monorepo layout

```
ui-components/
├── packages/components/          # @thenamespace/ens-components (npm library)
│   ├── src/
│   │   ├── components/           # All UI components
│   │   │   ├── ens-name-registration/
│   │   │   ├── ens-records-form/
│   │   │   ├── offchain-subname-form/
│   │   │   ├── subname-mint-form/
│   │   │   ├── select-records-form/
│   │   │   ├── atoms/            # Primitive UI elements
│   │   │   └── molecules/        # Composed UI elements
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   └── rollup.config.mjs
├── apps/landing/                 # Interactive demo (port 4000)
│   └── src/App.tsx               # All demo sections live here
└── apps/storybook/               # Storybook 8 (port 6006)
```

## The five components

| Component | Props entry | CSS |
|-----------|------------|-----|
| `EnsNameRegistrationForm` | `ENSNameRegistrationForm.tsx` | adjacent `.css` |
| `EnsRecordsForm` | `EnsRecordsForm.tsx` | adjacent `.css` |
| `SelectRecordsForm` | `SelectRecordsForm.tsx` | adjacent `.css` |
| `SubnameMintForm` | `SubnameMintForm.tsx` | adjacent `.css` |
| `OffchainSubnameForm` | `OffchainSubnameForm.tsx` | `OffchainSubnameForm.css` |

All components are re-exported from `packages/components/src/components/index.ts`.

## Key architectural decisions

### OffchainSubnameForm — callback-delegated API

The form does **not** call the offchain API internally. It:
1. Uses `offchainManager` (prop) only for `getSingleSubname` (availability check)
2. Builds `OffchainSubnameCreatedData` on submit
3. Awaits `onSubnameCreated(data)` or `onSubnameUpdated(data)` — the **caller** calls the API

`onSubnameCreated` receives data matching `CreateSubnameRequest`, `onSubnameUpdated` matches `UpdateSubnameRequest` (no `owner` field on update).

### @thenamespace/offchain-manager is external

It is NOT bundled by rollup. Adding it to `externals` in `rollup.config.mjs` prevents `ChainName$1` type rename bugs when consumers pass `OffchainSubnameCreatedData.addresses` into `offchainManager.createSubname()`.

### EnsRecords shared data model

```ts
interface EnsRecords {
  addresses: { coinType: number; value: string }[];
  texts: { key: string; value: string }[];
  contenthash?: { protocol: string; value: string };
}
```

## Build workflow

After any component change you **must** rebuild before the landing/storybook apps pick it up:

```bash
pnpm --filter @thenamespace/ens-components build
```

Full pipeline:
1. `tsc -p tsconfig.types.json` → `dist/types/`
2. `rollup -c rollup.config.mjs` → `dist/index.js`, `dist/styles.js`, `dist/index.d.ts`

Type-check the landing page:
```bash
pnpm --filter landing exec tsc --noEmit
```

## Updating the landing page demo (App.tsx)

Each component has a `*_DEFS: PropDef[]` array that drives the PropsEditor and a `generate*Code()` function that generates the code snippet shown in the panel.

Pattern for adding a new prop:
1. Add to the `PropDef[]` array with `key`, `type`, `default`, `tip`
2. Add to the `generate*Code()` function if non-default
3. Pass from `values[key]` into the rendered component

`readonly: true` props are shown but not editable (e.g. `name`).
`isTestnet` toggles are synced globally — route via `onIsTestnetChange` and `useEffect`.

## Adding or changing a component prop

1. Update the props interface in the component file
2. Destructure in the component function
3. Wire into JSX
4. Rebuild the library
5. Update `packages/components/src/components/index.ts` if exporting a new type
6. Update the landing page `*_DEFS` array and code generator

## CSS conventions

- All classes are prefixed `ns-` to avoid collisions
- CSS variables for theming: `--ns-color-*`, `--ns-radius-*`, `--ns-spacing-*`
- Component styles live adjacent to the component file

## Publishing

CI publishes on push to `main` via `.github/workflows/npm.yaml`.
The workflow has a `workflow_dispatch` input to choose `patch / minor / major`.
No manual version bump needed — the workflow calls `npm version $bump`.

For full details see [reference.md](reference.md).

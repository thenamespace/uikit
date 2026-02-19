/// <reference types="vite/client" />

// Explicit asset declarations so tsc works without vite being installed
declare module "*.svg" {
  const content: string;
  export default content;
}
declare module "*.png" {
  const content: string;
  export default content;
}
declare module "*.jpg" {
  const content: string;
  export default content;
}
declare module "*.jpeg" {
  const content: string;
  export default content;
}
declare module "*.gif" {
  const content: string;
  export default content;
}
declare module "*.webp" {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_LIST_MANAGER_API?: string;
  readonly VITE_IS_TESTNET?: string;
  readonly VITE_IS_TESTNET_RPC_URL?: string;
  readonly VITE_ALCHEMY_TOKEN?: string;
  readonly VITE_INDEXER_API?: string;
  // Support for Next.js style env vars for compatibility
  readonly NEXT_PUBLIC_LIST_MANAGER_API?: string;
  readonly NEXT_PUBLIC_IS_TESTNET?: string;
  readonly NEXT_PUBLIC_IS_TESTNET_RPC_URL?: string;
  readonly NEXT_PUBLIC_ALCHEMY_TOKEN?: string;
  readonly NEXT_PUBLIC_INDEXER_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


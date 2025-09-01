import { ChainName } from "@/components"
import { base, arbitrum, polygon, optimism } from "viem/chains"

export interface SupportedEnsAddress {
    validateFunc?: (value: string) => boolean
    isEMV?: boolean
    label: string
    coinType: number
    chainId?: number
    chainName: ChainName
}

export const supportedAddresses: SupportedEnsAddress[] = [
    {
        isEMV: true,
        label: "Ethereum",
        coinType: 60,
        chainId: 1,
        chainName: "eth"
    },
       {
        isEMV: false,
        label: "Bitcoin",
        coinType: 0,
        chainName: "bitcoin"
    },
    {
        isEMV: false,
        label: "Solana",
        coinType: 501,
        chainName: "sol"
    },
    {
        isEMV: true,
        label: "Base",
        coinType: base.id,
        chainId: base.id,
        chainName: "base"
    },
    {
        isEMV: true,
        label: "Arbitrum One",
        coinType: 60,
        chainId: arbitrum.id,
        chainName: "arb"
    },
    {
        isEMV: true,
        label: "Polygon",
        coinType: 60,
        chainId: polygon.id,
        chainName: "matic"
    },
    {
        isEMV: true,
        label: "Optimism",
        coinType: 60,
        chainId: optimism.id,
        chainName: "op"
    },
    {
        isEMV: true,
        label: "Zora",
        coinType: 60,
        chainId: 7777777,
        chainName: "zora"
    }
]
import { ChainName } from "@/components"
import { convertEVMChainIdToCoinType } from "@/utils"
import { base, arbitrum, polygon, optimism, zora, Chain, mainnet } from "viem/chains"

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
        chainId: mainnet.id,
        chainName: "eth"
    },
       {
        isEMV: false,
        label: "Bitcoin",
        coinType: 0,
        chainName: "bitcoin",
        chainId: 0
    },
    {
        isEMV: false,
        label: "Solana",
        coinType: 501,
        chainName: "sol",
        chainId: 501
    },
    {
        isEMV: true,
        label: "Base",
        coinType: convertEVMChainIdToCoinType(base.id),
        chainId: base.id,
        chainName: "base"
    },
    {
        isEMV: true,
        label: "Arbitrum",
        coinType: convertEVMChainIdToCoinType(arbitrum.id),
        chainId: arbitrum.id,
        chainName: "arb"
    },
    {
        isEMV: true,
        label: "Polygon",
        coinType: convertEVMChainIdToCoinType(polygon.id),
        chainId: polygon.id,
        chainName: "matic"
    },
    {
        isEMV: true,
        label: "Optimism",
        coinType: convertEVMChainIdToCoinType(optimism.id),
        chainId: optimism.id,
        chainName: "op"
    },
    {
        isEMV: true,
        label: "Zora",
        coinType: convertEVMChainIdToCoinType(zora.id),
        chainId: zora.id,
        chainName: "zora"
    }
]

export const getSupportedAddressByCoin = (coin: number): SupportedEnsAddress | undefined => {
    return supportedAddresses.find(addr => addr.coinType === coin);
}

export const getSupportedAddressByName = (name: ChainName): SupportedEnsAddress | undefined => {
    return supportedAddresses.find(addr => addr.chainName === name);
}


import ethIcon from "../../assets/icons/chains/eth.svg";

export interface SupportedEnsAddress {
    validateFunc?: (value: string) => boolean
    isEMV?: boolean
    label: string
    coinType: number
    chainId?: number
    iconUrl: string
}

const supportedAddresses: SupportedEnsAddress[] = [
    {
        isEMV: true,
        label: "Ethereum Mainnet",
        coinType: 60,
        chainId: 1,
        iconUrl: ethIcon
    }
]
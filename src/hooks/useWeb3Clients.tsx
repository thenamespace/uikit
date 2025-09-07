import { usePublicClient, useWalletClient } from "wagmi"

export const useWeb3Client = ({chainId}: {chainId: number}) => {

    const publicClient = usePublicClient({chainId})
    const { data: walletClient } = useWalletClient({chainId})

    return {
        walletClient,
        publicClient
    }
}
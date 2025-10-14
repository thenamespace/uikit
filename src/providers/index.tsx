import { SidebarProvider } from "@/components/ui/sidebar";
import type { PropsWithChildren } from "react";
import { WalletConnect } from "./wallet-connect";

export const ProviderTree = ({ children }: PropsWithChildren) => {
	return (
		<WalletConnect>
			<SidebarProvider>
				<div>{children}</div>
			</SidebarProvider>
		</WalletConnect>
	);
};

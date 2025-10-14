import { Sidebar as SidebarCore } from "@/components/ui/sidebar";

import { SidebarHeader } from "./header";

export const Sidebar = () => {
	return (
		<SidebarCore
			className="m-6 h-[75%] overflow-clip px-1 py-0"
			collapsible="icon"
			variant="floating"
		>
			<SidebarHeader />
		</SidebarCore>
	);
};

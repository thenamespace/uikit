import { Sidebar as SidebarCore } from "@/components/ui/sidebar";

import { SidebarHeader } from "./header";

export const Sidebar = () => {
	return (
		<SidebarCore
			className="mx-6 my-auto h-[calc(100%-48px)] overflow-clip px-1 py-0"
			collapsible="icon"
			variant="floating"
		>
			<SidebarHeader />
		</SidebarCore>
	);
};

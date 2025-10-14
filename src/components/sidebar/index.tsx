import {
	SidebarContent,
	Sidebar as SidebarCore,
	SidebarSeparator,
} from "@/components/ui/sidebar";

import { SidebarHeader } from "./header";
import { MainGroup } from "./main-group";
import { SideGroup } from "./side-group";
import { EndGroup } from "./end-group";

export const Sidebar = () => {
	return (
		<SidebarCore
			collapsible="icon"
			variant="floating"
			className="m-2 h-[75svh] flex items-center"
		>
			<SidebarHeader />
			<SidebarSeparator className="my-2" />
			<MainGroup />
			<SidebarSeparator className="my-2" />
			<SideGroup />
			<div className="absolute bottom-4">
				<EndGroup />
			</div>
		</SidebarCore>
	);
};

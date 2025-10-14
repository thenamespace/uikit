import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

import { cn } from "@/utils";
import { FrameIcon, LayoutDashboardIcon, RocketIcon } from "lucide-react";

const mainGroupItems = [
	{
		href: "/dashboard",
		icon: RocketIcon,
		id: "dashboard",
		title: "Dashboard",
	},
	{
		href: "/apps",
		icon: LayoutDashboardIcon,
		id: "apps",
		title: "Apps",
	},
	{
		href: "/frame",
		icon: FrameIcon,
		id: "frame",
		title: "Frame",
	},
] as const;

export const MainGroup = () => {
	const pathname = "/apps";
	return (
		<SidebarGroup>
			<SidebarMenu className="flex items-center justify-center">
				{mainGroupItems.map((item) => (
					<SidebarMenuItem key={item.title} className="w-full">
						<SidebarMenuButton
							asChild={true}
							className={cn(
								"",
								pathname === item.href &&
									"!bg-black !text-white hover:!bg-black hover:!text-white",
							)}
							tooltip={item.title}
						>
							<a href={item.href}>
								<item.icon />
								<span className="font-medium">{item.title}</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
};

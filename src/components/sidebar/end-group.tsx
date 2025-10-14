import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

import { cn } from "@/utils";
import { SettingsIcon } from "lucide-react";

const endGroupItems = [
	{
		href: "/settings",
		icon: SettingsIcon,
		id: "settings",
		title: "Settings",
	},
] as const;

export const EndGroup = () => {
	const pathname = "/apps";
	return (
		<SidebarGroup>
			<SidebarMenu className="flex items-center justify-center">
				{endGroupItems.map((item) => (
					<SidebarMenuItem key={item.title} className="w-full">
						<SidebarMenuButton
							asChild={true}
							className={cn(
								"",
								// @ts-ignore
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

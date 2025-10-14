import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

import { cn } from "@/utils";
import {
	BoxIcon,
	CircleDotIcon,
	FileTextIcon,
	MessageSquareIcon,
} from "lucide-react";

const sideGroupItems = [
	{
		href: "/dashboard",
		icon: CircleDotIcon,
		id: "circle",
		title: "Circle",
	},
	{
		href: "/box",
		icon: BoxIcon,
		id: "box",
		title: "Box",
	},
	{
		href: "/summary",
		icon: FileTextIcon,
		id: "summary",
		title: "Summary",
	},
	{
		href: "/messages",
		icon: MessageSquareIcon,
		id: "messages",
		title: "Messages",
	},
] as const;

export const SideGroup = () => {
	const pathname = "/apps";
	return (
		<SidebarGroup>
			<SidebarMenu className="flex items-center justify-center">
				{sideGroupItems.map((item) => (
					<SidebarMenuItem key={item.title} className="w-full">
						<SidebarMenuButton
							asChild={true}
							className={cn(
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

import {
	SidebarHeader as SidebarHeaderCore,
	SidebarMenu,
	SidebarMenuItem,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/utils";
import { ChevronRight } from "lucide-react";

export const SidebarHeader = () => {
	const { open, setOpen, isMobile, setOpenMobile } = useSidebar();

	return (
		<SidebarHeaderCore className="!pt-4 relative" data-open={open}>
			<SidebarMenu>
				<SidebarMenuItem className={cn("flex items-center gap-4")}>
					<a className="group/header-icon" href="/">
						<div
							className={cn(
								"bg-black text-white rounded-xl flex items-center justify-center p-2",
								open ? "h-10 w-full" : "size-10",
							)}
						>
							<div
								className="group font-satoshi text-4xl font-medium inline-flex items-center justify-center leading-none pb-2"
								data-open={open}
							>
								<span className="">n</span>
								<span className="group-data-[open=false]:hidden">amespace</span>
							</div>
						</div>
					</a>
				</SidebarMenuItem>
			</SidebarMenu>
			<SidebarTrigger className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 border size-5 bg-sidebar border-border flex items-center justify-center rounded-lg">
				<ChevronRight className="size-4" />
			</SidebarTrigger>
		</SidebarHeaderCore>
	);
};

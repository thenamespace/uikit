import {
	SidebarHeader as SidebarHeaderCore,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/utils";

export const SidebarHeader = () => {
	const { open, setOpen, isMobile, setOpenMobile } = useSidebar();

	return (
		<SidebarHeaderCore className="!pt-3">
			<SidebarMenu>
				<SidebarMenuItem
					className={cn(
						"flex items-center gap-4",
						open ? "justify-between" : "justify-center",
					)}
				>
					<a className="group/header-icon flex flex-row items-center" href="/">
						<SidebarMenuButton className="!p-0 !m-0 !size-16 flex cursor-pointer items-center justify-center bg-transparent transition-all duration-300 ease-in-out hover:bg-transparent group-hover/header-icon:rotate-3 group-hover/header-icon:scale-[107%] group-data-[collapsible=icon]:size-12! [&>svg]:size-8">
							<KoraLogo bodyColor="#fff" eyesColor="#000" />
						</SidebarMenuButton>
						<div
							className={cn(
								"font-comic text-3xl text-white uppercase transition-all duration-300 ease-in-out",
								open ? "inline-flex" : "hidden",
							)}
						>
							Kora
						</div>
					</a>
					{open && (
						<button
							type="button"
							className="justify-self-end"
							onClick={() => {
								if (isMobile) {
									setOpenMobile(false);
								} else {
									setOpen(false);
								}
							}}
						>
							<SidebarLeftIcon
								className="size-5 text-white"
								strokeWidth={2.5}
							/>
						</button>
					)}
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeaderCore>
	);
};

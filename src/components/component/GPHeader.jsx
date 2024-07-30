import { NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { MountainIcon} from "@/components/ui/icons";
import Link from "next/link";


export function GPHeader() {
		<NavigationMenu className="hidden lg:flex">
			<NavigationMenuList>
				<NavigationMenuLink asChild>
					<Link
						href="#"
						className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
						prefetch={false}
					>
						Home
					</Link>
				</NavigationMenuLink>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Users</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="grid w-[400px] p-2">
							<NavigationMenuLink asChild>
								<Link
									href="#"
									className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									prefetch={false}
								>
									<div className="text-sm font-medium leading-none group-hover:underline">Manage Users</div>
									<div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
										View and edit user profiles.
									</div>
								</Link>
							</NavigationMenuLink>
							<NavigationMenuLink asChild>
								<Link
									href="#"
									className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									prefetch={false}
								>
									<div className="text-sm font-medium leading-none group-hover:underline">Manage Roles</div>
									<div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
										Assign and manage user roles.
									</div>
								</Link>
							</NavigationMenuLink>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Reports</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="grid w-[400px] p-2">
							<NavigationMenuLink asChild>
								<Link
									href="#"
									className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									prefetch={false}
								>
									<div className="text-sm font-medium leading-none group-hover:underline">Overview</div>
									<div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
										View high-level metrics and insights.
									</div>
								</Link>
							</NavigationMenuLink>
							<NavigationMenuLink asChild>
								<Link
									href="#"
									className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									prefetch={false}
								>
									<div className="text-sm font-medium leading-none group-hover:underline">Sales</div>
									<div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
										Track and analyze sales performance.
									</div>
								</Link>
							</NavigationMenuLink>
							<NavigationMenuLink asChild>
								<Link
									href="#"
									className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									prefetch={false}
								>
									<div className="text-sm font-medium leading-none group-hover:underline">Customers</div>
									<div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
										Analyze customer data and trends.
									</div>
								</Link>
							</NavigationMenuLink>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Settings</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="grid w-[400px] p-2">
							<NavigationMenuLink asChild>
								<Link
									href="#"
									className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									prefetch={false}
								>
									<div className="text-sm font-medium leading-none group-hover:underline">General</div>
									<div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
										Manage your account and organization settings.
									</div>
								</Link>
							</NavigationMenuLink>
							<NavigationMenuLink asChild>
								<Link
									href="#"
									className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									prefetch={false}
								>
									<div className="text-sm font-medium leading-none group-hover:underline">Billing</div>
									<div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
										View and manage your subscription and billing details.
									</div>
								</Link>
							</NavigationMenuLink>
							<NavigationMenuLink asChild>
								<Link
									href="#"
									className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									prefetch={false}
								>
									<div className="text-sm font-medium leading-none group-hover:underline">Integrations</div>
									<div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
										Connect your account with other tools and services.
									</div>
								</Link>
							</NavigationMenuLink>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
}
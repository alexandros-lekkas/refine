"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Settings,
  PieChart,
  GalleryVerticalEnd,
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tasks",
    url: "/dashboard/tasks",
    icon: CheckSquare,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: Calendar,
    subItems: [
      {
        title: "Routine Setup",
        url: "/dashboard/calendar/routine-setup",
      },
    ],
  },
  {
    title: "Insights",
    url: "/dashboard/insights",
    icon: PieChart,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href={"/dashboard"} passHref legacyBehavior>
              <SidebarMenuButton className="bg-secondary text-foreground py-6 px-4 text-lg transition-all duration-150 cursor-pointer">
                <GalleryVerticalEnd className="h-4 w-4" />
                <span className="text-base font-semibold">Refine</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url} passHref legacyBehavior>
                    <SidebarMenuButton
                      className="hover:bg-primary/10 data-[active=true]:bg-primary/20 data-[active=true]:text-primary py-5 px-4 text-lg transition-all duration-150 cursor-pointer"
                      data-active={pathname === item.url}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-base">{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                  {item.subItems && (
                    <div className="pl-11 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.url}
                          className={cn(
                            "block py-2 px-4 text-sm rounded-md transition-colors",
                            pathname === subItem.url
                              ? "bg-primary/20 text-primary"
                              : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                          )}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

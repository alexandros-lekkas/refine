"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Settings,
  PieChart,
  CheckSquare,
  Layers,
  Menu,
  Box
} from "lucide-react";
import { useState, useEffect } from "react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Box
  },
  {
    title: "Grid",
    href: "/dashboard/grid",
    icon: Layers
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: CheckSquare
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: PieChart
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings
  }
];

export function AppSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Dispatch custom event when sidebar state changes
    const event = new CustomEvent('sidebarStateChange', { 
      detail: { collapsed: isCollapsed }
    });
    window.dispatchEvent(event);
  }, [isCollapsed]);

  return (
    <div className={cn(
      "flex h-full flex-col items-center border-r bg-white py-4 transition-all duration-300",
      isCollapsed ? "w-[60px]" : "w-[260px]"
    )}>
      <div className={cn(
        "flex h-[60px] items-center justify-center border-b w-full",
        isCollapsed ? "px-[10px]" : "px-6"
      )}>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-[#fdf4ff] transition-colors"
        >
          <Menu className="h-6 w-6 text-black" />
        </button>
      </div>
      <div className="flex flex-1 flex-col items-center gap-2 pt-4 w-full">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex h-10 items-center rounded-md transition-colors",
              isCollapsed ? "w-10 justify-center mx-[10px]" : "w-[calc(100%-24px)] px-3",
              "hover:bg-[#fdf4ff]",
              pathname === item.href 
                ? "text-[#c026d3]" 
                : "text-black"
            )}
          >
            <item.icon className="h-5 w-5" />
            {!isCollapsed && (
              <span className="ml-3 text-sm font-medium">{item.title}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

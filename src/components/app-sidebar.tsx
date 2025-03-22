"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  PieChart, 
  Settings,
} from "lucide-react";
import { useState } from "react";
import { CollapseIcon } from "@/components/ui/collapse-icon";

export function AppSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    // Dispatch custom event for calendar width adjustment
    window.dispatchEvent(new CustomEvent('sidebarStateChange', {
      detail: { collapsed: !isCollapsed }
    }));
  };

  const links = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Tasks",
      href: "/dashboard/tasks",
      icon: CheckSquare,
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: PieChart,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <div className={cn(
      "h-screen border-r flex flex-col transition-all duration-300 bg-white",
      isCollapsed ? "w-[60px]" : "w-[240px]"
    )}>
      <div className="h-[60px] border-b flex items-center">
        <button 
          onClick={toggleSidebar} 
          className={cn(
            "text-gray-500 transition-colors p-1 ml-4",
            "hover:text-[#c026d3]"
          )}
        >
          <CollapseIcon />
        </button>
      </div>
      <div className="flex-1 py-6">
        <nav className="space-y-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-x-3 text-gray-600 text-sm font-medium px-4 py-2",
                  "hover:text-[#c026d3] hover:bg-[#fdf4ff] transition-colors",
                  isActive && "text-[#c026d3] bg-[#fdf4ff]",
                  isCollapsed && "justify-center"
                )}
              >
                <Icon className={cn(
                  "h-[20px] w-[20px] transition-colors",
                  isActive ? "text-[#c026d3]" : "text-gray-600"
                )} />
                {!isCollapsed && <span>{link.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

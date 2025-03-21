"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, LayoutGrid, ClipboardCheck, Clock, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

interface AppSidebarProps {
  onToggle: (isExpanded: boolean) => void;
}

export function AppSidebar({ onToggle }: AppSidebarProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    onToggle(newState);
  };

  const items = [
    {
      title: "Dashboard",
      icon: LayoutGrid,
      href: "/dashboard",
    },
    {
      title: "Tasks",
      icon: ClipboardCheck,
      href: "/dashboard/tasks",
    },
    {
      title: "Calendar",
      icon: Calendar,
      href: "/dashboard/calendar",
    },
    {
      title: "Time Tracking",
      icon: Clock,
      href: "/dashboard/time-tracking",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="flex flex-col h-screen border-r bg-white">
      <div className="p-4 flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-black hover:text-[#c026d3]"
          onClick={toggleSidebar}
        >
          {isExpanded ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="flex-1">
        <div className="px-4 space-y-2">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-black transition-all hover:text-[#c026d3]",
                  isActive && "bg-[#fdf4ff] text-[#c026d3]"
                )}
              >
                <item.icon className="h-4 w-4" />
                {isExpanded && <span>{item.title}</span>}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

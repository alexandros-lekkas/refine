"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { TaskProvider } from "@/lib/contexts/TaskContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TaskProvider>
        <SidebarProvider>
          <div className="flex h-screen">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto p-8">{children}</main>
          </div>
          <Toaster />
        </SidebarProvider>
      </TaskProvider>
    </ThemeProvider>
  );
}
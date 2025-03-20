"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { TaskProvider } from "@/lib/providers/tasks";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
          <div className="flex h-screen bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <div className="flex items-center p-4 border-b">
                <SidebarTrigger />
              </div>
              <main className="flex-1 overflow-y-auto p-8">{children}</main>
            </div>
          </div>
          <Toaster />
        </SidebarProvider>
      </TaskProvider>
    </ThemeProvider>
  );
}

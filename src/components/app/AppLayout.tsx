"use client";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";
interface AppLayoutProps {
  children: React.ReactNode;
}
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar
        variant="floating"
        collapsible="icon"
        style={{ userSelect: "none" }}
      />
      <main className="flex-1 overflow-y-auto lg:mt-0 mt-16">{children}</main>
    </SidebarProvider>
  );
}

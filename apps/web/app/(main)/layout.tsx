import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 w-full min-h-screen transition-all duration-300 ease-in-out bg-zinc-50/50 dark:bg-zinc-950">
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-border bg-background/50 px-6 backdrop-blur">
          <SidebarTrigger />
        </header>
        {children}
      </div>
    </SidebarProvider>
  );
}

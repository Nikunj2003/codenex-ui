import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Home, FolderKanban, BarChart3, CreditCard, User, LogOut,
  Plus, Bell, Search, Info, Book, Key, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type SidebarItem = {
  icon: any;
  label: string;
  path: string;
  badge?: number;
};

const workspaceItems: SidebarItem[] = [
  { icon: Home, label: "Home", path: "/app" },
  { icon: FolderKanban, label: "Projects", path: "/app/projects" },
  { icon: Bell, label: "Notifications", path: "/app/notifications", badge: 2 },
];

const accountItems: SidebarItem[] = [
  { icon: BarChart3, label: "Usage", path: "/app/usage" },
  { icon: CreditCard, label: "Billing", path: "/app/billing" },
  { icon: User, label: "Account", path: "/app/account" },
];

const sidebarItems = [...workspaceItems, ...accountItems];

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [location.pathname]);

  const renderSidebarItem = (item: SidebarItem) => {
    const active = location.pathname === item.path || (item.path !== "/app" && location.pathname.startsWith(item.path));
    return (
      <Link
        key={item.path}
        to={item.path}
        className={cn(
          "relative flex items-center gap-2.5 rounded-lg text-[13px] font-medium transition-colors px-3 py-2",
          active
            ? "bg-secondary text-foreground before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-[3px] before:rounded-r-full before:bg-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        )}
      >
        <item.icon className="h-4 w-4 flex-shrink-0" />
        <span>{item.label}</span>
        {item.badge && (
          <span className="ml-auto text-[10px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{item.badge}</span>
        )}
      </Link>
    );
  };

  return (
    <div className="h-screen flex w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 border-r border-border bg-background">
        <div className="h-14 flex items-center px-3 border-b border-border">
          <Link to="/app" className="flex items-center gap-2.5 px-1">
            <img src="/brand-icon.png" alt="Codenex" className="h-12 w-12 flex-shrink-0" />
            <span className="font-display text-2xl font-semibold tracking-tight">codenex</span>
          </Link>
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          <p className="label-caps text-muted-foreground/70 px-3 pt-4 pb-1 text-[10px]">Workspace</p>
          {workspaceItems.map(renderSidebarItem)}

          <p className="label-caps text-muted-foreground/70 px-3 pt-4 pb-1 text-[10px]">Account</p>
          {accountItems.map(renderSidebarItem)}
        </nav>

        <div className="p-2 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start h-auto px-2 py-2 hover:bg-secondary/50 !ring-0 !outline-none focus:ring-0 focus-visible:ring-0 data-[state=open]:bg-secondary/50">
                <div className="flex items-center gap-2.5 w-full">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-secondary text-foreground text-xs font-display font-semibold">NK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-[13px] font-medium truncate text-foreground leading-tight mb-1">Nikunj Khitha</p>
                    <span className="inline-flex text-[10px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full leading-none">Pro plan</span>
                  </div>
                  <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground/60 shrink-0" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-56 mb-1 ml-2">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">Nikunj Khitha</p>
                <p className="text-xs text-muted-foreground">Nikunj@example.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/app/about")}>
                <Info className="h-4 w-4 mr-2" /> About
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                <Book className="h-4 w-4 mr-2" /> Documentation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                <Key className="h-4 w-4 mr-2" /> API Key
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/login")} className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4 md:px-5 gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <Link to="/app">
                <img src="/brand-icon.png" alt="Codenex" className="h-12 w-12" />
              </Link>
            </div>
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-muted-foreground text-[13px] hover:bg-secondary transition-colors min-w-[180px]">
              <Search className="h-3.5 w-3.5" />
              <span>Search…</span>
              <kbd className="ml-auto text-[10px] bg-secondary px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <Button size="sm" onClick={() => navigate("/app/projects")} className="gap-1.5 h-8 text-xs">
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">New project</span>
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8 relative" onClick={() => navigate("/app/notifications")}>
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </Button>

            <ThemeToggle />
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="md:hidden flex border-b border-border overflow-x-auto bg-background">
          {sidebarItems.slice(0, 5).map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors",
                  active ? "border-primary text-foreground" : "border-transparent text-muted-foreground"
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main ref={mainRef} className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

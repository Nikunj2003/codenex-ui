import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Sparkles, Code2, Eye, Users, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Overview", path: "", icon: LayoutDashboard },
  { label: "Builder", path: "/builder", icon: Sparkles },
  { label: "Files", path: "/files", icon: Code2 },
  { label: "Preview", path: "/preview", icon: Eye },
  { label: "Members", path: "/members", icon: Users },
  { label: "Settings", path: "/settings", icon: Settings },
];

interface ProjectSubNavProps {
  projectId: string;
  projectName?: string;
}

export function ProjectSubNav({ projectId, projectName = "SaaS Dashboard" }: ProjectSubNavProps) {
  const location = useLocation();
  const basePath = `/app/projects/${projectId}`;

  const isActive = (tabPath: string) => {
    if (tabPath === "") return location.pathname === basePath;
    return location.pathname.startsWith(basePath + tabPath);
  };

  return (
    <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-4">
        {/* Top row: back + project name */}
        <div className="flex items-center gap-3 h-12">
          <Link
            to="/app/projects"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Projects</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <h2 className="text-sm font-display font-semibold truncate">{projectName}</h2>
        </div>

        {/* Tab row */}
        <div className="flex gap-1 -mb-px overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              to={basePath + tab.path}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium border-b-2 transition-colors whitespace-nowrap",
                isActive(tab.path)
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <tab.icon className="h-3 w-3" />
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

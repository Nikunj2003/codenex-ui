import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProjectSubNav } from "@/components/ProjectSubNav";
import { motion } from "framer-motion";
import {
  Sparkles, Eye, Code2, Users, Settings, Clock,
  ArrowRight, Globe,
} from "lucide-react";

const quickLinks = [
  { icon: Sparkles, label: "Builder", desc: "Open the AI workspace", path: "builder" },
  { icon: Code2, label: "Files", desc: "Inspect project code", path: "files" },
  { icon: Eye, label: "Preview", desc: "Live preview & publish", path: "preview" },
  { icon: Users, label: "Members", desc: "Manage collaborators", path: "members" },
  { icon: Settings, label: "Settings", desc: "Project configuration", path: "settings" },
  { icon: Globe, label: "Deploy", desc: "Production deployment", path: "preview", planned: true },
];

const activity = [
  { text: "Generated landing page component", time: "1h ago" },
  { text: "Updated sidebar navigation layout", time: "2h ago" },
  { text: "Added responsive breakpoints", time: "3h ago" },
];

const f = (d: number) => ({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.45 } });

export default function ProjectOverview() {
  const { projectId } = useParams();

  return (
    <div className="flex-1 flex flex-col">
      <ProjectSubNav projectId={projectId!} />
      <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-4xl space-y-10">
        <motion.div {...f(0)}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-display font-bold tracking-tight">SaaS Dashboard</h1>
                <span className="label-caps text-[10px] px-2 py-0.5 rounded-full border border-success/20 text-success bg-success/5">Active</span>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> Updated 2 hours ago
              </p>
            </div>
            <Link to={`/app/projects/${projectId}/builder`}>
              <Button size="sm" className="gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Open builder
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((item, i) => (
            <motion.div key={item.label} {...f(0.05 + i * 0.04)}>
              <Link to={`/app/projects/${projectId}/${item.path}`}>
                <div className="p-5 rounded-xl border border-border bg-card hover:border-foreground/10 hover:shadow-sm transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/8 transition-colors">
                      <item.icon className="h-4 w-4 text-foreground/60 group-hover:text-primary transition-colors" />
                    </div>
                    {item.planned && <span className="label-caps text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">Soon</span>}
                  </div>
                  <h3 className="font-display text-sm font-semibold mb-0.5">{item.label}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/30 mt-3 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Activity */}
        <motion.div {...f(0.25)} className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-base font-display font-semibold mb-5">Recent activity</h3>
          <div className="space-y-0">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                <div className="h-2 w-2 rounded-full bg-primary/30 flex-shrink-0" />
                <span className="text-[13px] flex-1">{a.text}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Plus, ArrowRight, FolderKanban, Zap, Clock, Bell, CreditCard, TrendingUp,
} from "lucide-react";

const recentProjects = [
  { id: "1", name: "SaaS Dashboard", updated: "2h ago", status: "active" },
  { id: "2", name: "E-commerce Storefront", updated: "1d ago", status: "active" },
  { id: "3", name: "Portfolio Website", updated: "3d ago", status: "draft" },
];

const f = (d: number) => ({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.45 } });

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-4xl space-y-10">
        {/* Header */}
        <motion.div {...f(0)} className="text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-2">{getGreeting()}, John</h1>
          <p className="text-muted-foreground">Pick up where you left off or start something new.</p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: FolderKanban, label: "Projects", value: "3", sub: "2 active", iconBg: "bg-primary/8", iconColor: "text-primary" },
            { icon: Zap, label: "Tokens used", value: "2,450", sub: "of 50k daily", iconBg: "bg-warning/8", iconColor: "text-warning" },
            { icon: Bell, label: "Notifications", value: "2", sub: "pending", iconBg: "bg-primary/8", iconColor: "text-primary" },
            { icon: TrendingUp, label: "This week", value: "+12", sub: "generations", iconBg: "bg-success/8", iconColor: "text-success" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              {...f(0.05 + i * 0.04)}
              className="rounded-xl border border-border bg-card p-5 text-center hover:border-foreground/10 transition-colors"
            >
              <div className={`h-10 w-10 rounded-xl ${stat.iconBg} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
              <p className="text-2xl font-display font-bold tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent projects */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-display font-semibold">Recent projects</h2>
            <Link to="/app/projects" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProjects.map((project, i) => (
              <motion.div key={project.id} {...f(0.15 + i * 0.04)}>
                <Link to={`/app/projects/${project.id}`}>
                  <div className="p-5 rounded-xl border border-border bg-card hover:border-foreground/10 hover:shadow-sm transition-all group">
                    <div className="flex items-start justify-between mb-5">
                      <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/8 transition-colors">
                        <FolderKanban className="h-4 w-4 text-foreground/60 group-hover:text-primary transition-colors" />
                      </div>
                      <span className={`label-caps text-[10px] px-2 py-0.5 rounded-full border ${
                        project.status === "active" ? "border-success/20 text-success bg-success/5" : "border-border text-muted-foreground"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="font-display text-sm font-semibold mb-1.5 group-hover:text-primary transition-colors">{project.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {project.updated}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}

            <motion.div {...f(0.3)}>
              <Link to="/app/projects">
                <div className="p-5 rounded-xl border-2 border-dashed border-border hover:border-primary/30 transition-all flex flex-col items-center justify-center min-h-[160px] group cursor-pointer">
                  <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/8 transition-colors">
                    <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">New project</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Quick actions */}
        <motion.div {...f(0.35)} className="flex justify-center gap-3 pb-4">
          <Link to="/app/usage">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Zap className="h-3 w-3" /> View usage
            </Button>
          </Link>
          <Link to="/app/billing">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <CreditCard className="h-3 w-3" /> Billing
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

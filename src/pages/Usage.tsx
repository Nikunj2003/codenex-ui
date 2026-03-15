import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Eye, ArrowUpRight, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const f = (d: number) => ({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.45 } });

export default function Usage() {
  return (
    <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-3xl space-y-8">
        <motion.div {...f(0)} className="text-center">
          <h1 className="text-3xl font-display font-bold tracking-tight mb-1">Usage</h1>
          <p className="text-sm text-muted-foreground">Monitor your resource consumption.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          <motion.div {...f(0.05)} className="p-6 rounded-xl border border-border bg-card hover:shadow-sm transition-all">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                <Zap className="h-4 w-4 text-foreground/60" />
              </div>
              <div>
                <h3 className="text-sm font-display font-semibold">Tokens today</h3>
                <p className="text-[11px] text-muted-foreground">Resets at midnight UTC</p>
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-end justify-between">
                <span className="text-2xl font-display font-bold tracking-tight">2,450</span>
                <span className="text-xs text-muted-foreground">/ 50,000</span>
              </div>
              <Progress value={4.9} className="h-3" />
              <span className="text-xs text-muted-foreground">4.9% used</span>
            </div>
          </motion.div>

          <motion.div {...f(0.1)} className="p-6 rounded-xl border border-border bg-card hover:shadow-sm transition-all">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                <Eye className="h-4 w-4 text-foreground/60" />
              </div>
              <div>
                <h3 className="text-sm font-display font-semibold">Active previews</h3>
                <p className="text-[11px] text-muted-foreground">Running instances</p>
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-end justify-between">
                <span className="text-2xl font-display font-bold tracking-tight">1</span>
                <span className="text-xs text-muted-foreground">/ 5</span>
              </div>
              <Progress value={20} className="h-3" />
              <span className="text-xs text-muted-foreground">20% used</span>
            </div>
          </motion.div>
        </div>

        <motion.div {...f(0.15)} className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <BarChart3 className="h-4 w-4 text-foreground/60" />
            <h3 className="text-base font-display font-semibold">Plan limits</h3>
          </div>
          <div className="space-y-0">
            {[
              { label: "Projects", used: "3", limit: "10" },
              { label: "Daily tokens", used: "2,450", limit: "50,000" },
              { label: "Active previews", used: "1", limit: "5" },
              { label: "Team seats", used: "2", limit: "3" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3.5 border-b border-border last:border-0 text-[13px]">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium font-mono text-xs">{item.used} <span className="text-muted-foreground/50">/</span> {item.limit}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <Link to="/app/billing">
              <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5">
                Upgrade plan <ArrowUpRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

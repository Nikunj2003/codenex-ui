import { useParams } from "react-router-dom";
import { ProjectSubNav } from "@/components/ProjectSubNav";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Eye, Monitor, Tablet, Smartphone, RefreshCw, Rocket, Globe, ExternalLink, Copy,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Device = "desktop" | "tablet" | "mobile";
const f = (d: number) => ({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.45 } });

export default function ProjectPreview() {
  const { projectId } = useParams();
  const [device, setDevice] = useState<Device>("desktop");

  return (
    <div className="flex-1 flex flex-col">
      <ProjectSubNav projectId={projectId!} />
      <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-5xl space-y-6">
        <motion.div {...f(0)} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight">Preview & Publish</h1>
            <p className="text-sm text-muted-foreground mt-1">Preview your app and deploy to production.</p>
          </div>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" className="gap-1.5 h-9 text-xs">
              <RefreshCw className="h-3 w-3" /> Rebuild
            </Button>
            <Button size="sm" className="gap-1.5 h-9 text-xs">
              <Rocket className="h-3 w-3" /> Publish
            </Button>
          </div>
        </motion.div>

        <motion.div {...f(0.05)} className="flex justify-center">
          <div className="flex gap-0.5 p-0.5 rounded-lg bg-secondary">
            {[
              { key: "desktop" as Device, icon: Monitor, label: "Desktop" },
              { key: "tablet" as Device, icon: Tablet, label: "Tablet" },
              { key: "mobile" as Device, icon: Smartphone, label: "Mobile" },
            ].map((d) => (
              <button
                key={d.key}
                onClick={() => setDevice(d.key)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-md text-[12px] font-medium transition-colors",
                  device === d.key ? "bg-card text-foreground surface-elevated" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <d.icon className="h-3.5 w-3.5" />
                {d.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div {...f(0.1)} className="rounded-xl border border-border bg-card overflow-hidden surface-elevated">
          <div
            className={cn(
              "mx-auto bg-background min-h-[480px] flex items-center justify-center transition-all",
              device === "mobile" ? "max-w-[375px] border-x border-border" : device === "tablet" ? "max-w-[768px] border-x border-border" : "w-full"
            )}
          >
            <div className="text-center p-8">
              <Eye className="h-10 w-10 text-foreground/8 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Preview renders here</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Build in the builder to see a live preview</p>
            </div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          <motion.div {...f(0.15)} className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-4 w-4 text-foreground/60" />
              <h3 className="text-sm font-display font-semibold">Deployment</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-muted-foreground">Status</span>
                <span className="label-caps text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">Not deployed</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-muted-foreground">Domain</span>
                <span className="text-[11px] text-muted-foreground/50">Coming soon</span>
              </div>
            </div>
          </motion.div>

          <motion.div {...f(0.2)} className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <ExternalLink className="h-4 w-4 text-foreground/60" />
              <h3 className="text-sm font-display font-semibold">Preview URL</h3>
            </div>
            <div className="flex items-center gap-2">
              <code className="text-[11px] bg-secondary px-3 py-2 rounded-lg flex-1 truncate font-mono">
                preview.codenex.dev/p/{projectId}
              </code>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-[11px] gap-1"
                onClick={() => toast.success("URL copied")}
              >
                <Copy className="h-3 w-3" /> Copy
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { ProjectSubNav } from "@/components/ProjectSubNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import { AlertTriangle, Key, Sparkles } from "lucide-react";
import { toast } from "sonner";

const f = (d: number) => ({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.45 } });

export default function ProjectSettings() {
  const { projectId } = useParams();
  return (
    <div className="flex-1 flex flex-col">
      <ProjectSubNav projectId={projectId!} />
      <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl space-y-8">
        <motion.div {...f(0)}>
          <h1 className="text-3xl font-display font-bold tracking-tight mb-1">Settings</h1>
          <p className="text-sm text-muted-foreground">Configure your project.</p>
        </motion.div>

        <motion.div {...f(0.05)} className="rounded-xl border border-border bg-card p-6 space-y-5">
          <h3 className="text-sm font-display font-semibold">General</h3>
          <div className="space-y-1.5">
            <Label className="text-sm">Project name</Label>
            <Input defaultValue="SaaS Dashboard" className="h-11" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Description</Label>
            <Input defaultValue="Admin panel with analytics" className="h-11" />
          </div>
          <div className="flex justify-end">
            <Button size="sm" className="h-9 text-xs px-5" onClick={() => toast.success("Settings saved")}>Save changes</Button>
          </div>
        </motion.div>

        <motion.div {...f(0.1)} className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="text-sm font-display font-semibold">Environment</h3>
          <p className="text-[13px] text-muted-foreground">Environment variables and API keys.</p>
          <div className="py-10 rounded-lg bg-secondary/40 surface-inset text-center">
            <Key className="h-8 w-8 text-foreground/8 mx-auto mb-3" />
            <p className="text-[13px] text-muted-foreground">Environment variables and secrets will appear here</p>
            <p className="text-[11px] text-muted-foreground/60 mt-1">Configure API keys and environment-specific values</p>
          </div>
        </motion.div>

        <motion.div {...f(0.15)} className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="text-sm font-display font-semibold">AI Configuration</h3>
          <p className="text-[13px] text-muted-foreground">Customize how AI builds for this project.</p>
          <div className="py-10 rounded-lg bg-secondary/40 surface-inset text-center">
            <Sparkles className="h-8 w-8 text-foreground/8 mx-auto mb-3" />
            <p className="text-[13px] text-muted-foreground">AI configuration options will appear here</p>
            <p className="text-[11px] text-muted-foreground/60 mt-1">Customize model behavior and generation settings</p>
          </div>
        </motion.div>

        <Separator />

        <motion.div {...f(0.2)} className="rounded-xl border border-destructive/15 bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <h3 className="text-sm font-display font-semibold text-destructive">Danger zone</h3>
          </div>
          <p className="text-[13px] text-muted-foreground">Permanently delete this project and all associated data. This action cannot be undone.</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="h-9 text-xs">Delete project</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete project <span className="font-medium text-foreground">{projectId}</span> and all associated data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={() => toast.success("Project deleted")}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.div>
      </div>
    </div>
    </div>
  );
}

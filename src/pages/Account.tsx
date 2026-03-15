import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import { Camera, Bell, Shield } from "lucide-react";

const f = (d: number) => ({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.45 } });

export default function Account() {
  return (
    <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl space-y-8">
        <motion.div {...f(0)} className="text-center">
          <h1 className="text-3xl font-display font-bold tracking-tight mb-1">Account</h1>
          <p className="text-sm text-muted-foreground">Manage your profile and preferences.</p>
        </motion.div>

        <motion.div {...f(0.05)} className="rounded-xl border border-border bg-card p-6 space-y-6">
          <h3 className="text-sm font-display font-semibold">Profile</h3>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative group">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-secondary text-foreground text-xl font-display font-semibold">JD</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 rounded-full bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="h-4 w-4 text-background" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-display font-semibold">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-sm">Full name</Label>
              <Input defaultValue="John Doe" className="h-11" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Email</Label>
              <Input defaultValue="john@example.com" disabled className="h-11" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm" className="h-9 text-xs px-5" onClick={() => toast.success("Profile updated")}>Save changes</Button>
          </div>
        </motion.div>

        <motion.div {...f(0.1)} className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="text-sm font-display font-semibold">Appearance</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-medium">Theme</p>
              <p className="text-xs text-muted-foreground">Switch between light and dark mode</p>
            </div>
            <ThemeToggle />
          </div>
        </motion.div>

        <motion.div {...f(0.15)} className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="text-sm font-display font-semibold">Notification Preferences</h3>
          <div className="py-10 rounded-lg bg-secondary/40 surface-inset text-center">
            <Bell className="h-8 w-8 text-foreground/8 mx-auto mb-3" />
            <p className="text-[13px] text-muted-foreground">Notification preferences will appear here</p>
            <p className="text-[11px] text-muted-foreground/60 mt-1">Manage email and in-app notification settings</p>
          </div>
        </motion.div>

        <motion.div {...f(0.2)} className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="text-sm font-display font-semibold">Security</h3>
          <div className="py-10 rounded-lg bg-secondary/40 surface-inset text-center">
            <Shield className="h-8 w-8 text-foreground/8 mx-auto mb-3" />
            <p className="text-[13px] text-muted-foreground">Password & 2FA settings coming soon</p>
            <p className="text-[11px] text-muted-foreground/60 mt-1">Manage your password and two-factor authentication</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

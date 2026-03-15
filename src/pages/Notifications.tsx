import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X, Mail, Bell, BellOff, Info, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

type NotificationType = "invite" | "system" | "activity" | "alert";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionable?: boolean;
  project?: string;
  role?: string;
  inviter?: string;
}

const initialNotifications: Notification[] = [
  {
    id: "1", type: "invite", title: "Project invitation",
    description: "Alice Chen invited you to Marketing Site",
    time: "2 hours ago", read: false, actionable: true,
    project: "Marketing Site", role: "Editor", inviter: "Alice Chen",
  },
  {
    id: "2", type: "invite", title: "Project invitation",
    description: "Tom Wilson invited you to Mobile App API",
    time: "1 day ago", read: false, actionable: true,
    project: "Mobile App API", role: "Viewer", inviter: "Tom Wilson",
  },
  {
    id: "3", type: "activity", title: "Build completed",
    description: "SaaS Dashboard build #42 finished successfully.",
    time: "3 hours ago", read: false,
  },
  {
    id: "4", type: "system", title: "Maintenance scheduled",
    description: "Scheduled maintenance on March 12, 2026 from 2–4 AM UTC.",
    time: "5 hours ago", read: true,
  },
  {
    id: "5", type: "alert", title: "Token usage spike",
    description: "You've used 80% of your daily token limit.",
    time: "6 hours ago", read: true,
  },
  {
    id: "6", type: "activity", title: "New member joined",
    description: "Sarah Lee joined E-commerce Storefront as Editor.",
    time: "2 days ago", read: true,
  },
];

const iconMap: Record<NotificationType, typeof Mail> = {
  invite: Mail,
  system: Info,
  activity: CheckCircle2,
  alert: AlertTriangle,
};

const colorMap: Record<NotificationType, string> = {
  invite: "bg-primary/8 text-primary",
  system: "bg-secondary text-foreground/60",
  activity: "bg-success/8 text-success",
  alert: "bg-warning/8 text-warning",
};

type Filter = "all" | NotificationType;

const f = (d: number) => ({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.45 } });

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? notifications : notifications.filter((n) => n.type === filter);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleAccept = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true, actionable: false } : n));
    toast.success("Invite accepted");
  };

  const handleDecline = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast("Invite declined");
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "invite", label: "Invites" },
    { key: "activity", label: "Activity" },
    { key: "system", label: "System" },
    { key: "alert", label: "Alerts" },
  ];

  return (
    <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-3xl space-y-6">
        {/* Header */}
        <motion.div {...f(0)} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight">Notifications</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8" onClick={markAllRead}>
              <Check className="h-3 w-3" /> Mark all read
            </Button>
          )}
        </motion.div>

        {/* Filters */}
        <motion.div {...f(0.04)} className="flex gap-1 overflow-x-auto scrollbar-none">
          {filters.map((ft) => (
            <button
              key={ft.key}
              onClick={() => setFilter(ft.key)}
              className={cn(
                "px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors whitespace-nowrap",
                filter === ft.key
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {ft.label}
            </button>
          ))}
        </motion.div>

        {/* List */}
        {filtered.length > 0 ? (
          <div className="space-y-2">
            {filtered.map((notif, i) => {
              const Icon = iconMap[notif.type];
              return (
                <motion.div
                  key={notif.id}
                  {...f(0.06 + i * 0.03)}
                  onClick={() => markRead(notif.id)}
                  className={cn(
                    "flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border bg-card transition-all cursor-pointer",
                    notif.read
                      ? "border-border"
                      : "border-border hover:border-foreground/10 hover:shadow-sm"
                  )}
                >
                  <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0", colorMap[notif.type])}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={cn("text-[13px] font-medium truncate", notif.read && "text-muted-foreground")}>{notif.title}</p>
                      {!notif.read && <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.description}</p>
                    {notif.role && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="label-caps text-[10px] px-2 py-0.5 rounded-full border border-primary/15 text-primary bg-primary/5">{notif.role}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {notif.time}
                    </span>
                    {notif.actionable && (
                      <div className="flex gap-1.5 ml-2">
                        <Button size="sm" className="h-7 text-[11px] gap-1 px-2.5" onClick={(e) => { e.stopPropagation(); handleAccept(notif.id); }}>
                          <Check className="h-3 w-3" /> Accept
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1 px-2.5" onClick={(e) => { e.stopPropagation(); handleDecline(notif.id); }}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div {...f(0.06)} className="py-20 rounded-xl border border-border bg-card text-center">
            <BellOff className="h-10 w-10 text-foreground/8 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No notifications in this category</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

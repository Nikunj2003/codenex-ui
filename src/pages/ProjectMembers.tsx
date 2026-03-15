import { useParams } from "react-router-dom";
import { ProjectSubNav } from "@/components/ProjectSubNav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { UserPlus, MoreHorizontal, Crown, Shield, Eye } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const members = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "OWNER", status: "accepted", initials: "JD" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "EDITOR", status: "accepted", initials: "JS" },
  { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "VIEWER", status: "pending", initials: "BW" },
];

const roleConfig = {
  OWNER: { icon: Crown, color: "text-warning" },
  EDITOR: { icon: Shield, color: "text-foreground" },
  VIEWER: { icon: Eye, color: "text-muted-foreground" },
};

const f = (d: number) => ({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.45 } });

export default function ProjectMembers() {
  const { projectId } = useParams();
  return (
    <div className="flex-1 flex flex-col">
      <ProjectSubNav projectId={projectId!} />
      <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-3xl space-y-8">
        <motion.div {...f(0)} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-display font-bold tracking-tight">Members</h1>
            <p className="text-sm text-muted-foreground mt-1">{members.length} people have access to this project</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5 h-9 text-xs">
                <UserPlus className="h-3.5 w-3.5" /> Invite
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">Invite a member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-sm">Email address</Label>
                  <Input placeholder="colleague@company.com" className="h-11" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">Role</Label>
                  <Select defaultValue="EDITOR">
                    <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EDITOR">Editor — can build and modify</SelectItem>
                      <SelectItem value="VIEWER">Viewer — read-only access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full h-11">Send invite</Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div {...f(0.05)} className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
          {members.map((member, i) => {
            const rc = roleConfig[member.role as keyof typeof roleConfig];
            const RoleIcon = rc.icon;
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08 + i * 0.04, duration: 0.3 }}
                className="flex items-center gap-4 px-6 py-5"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-secondary text-foreground text-sm font-display font-semibold">{member.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium truncate">{member.name}</p>
                    {member.status === "pending" && (
                      <span className="label-caps text-[9px] px-1.5 py-0.5 rounded-full border border-warning/20 text-warning bg-warning/5">Pending</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn("flex items-center gap-1 text-[11px] font-medium", rc.color)}>
                    <RoleIcon className="h-3 w-3" />
                    {member.role}
                  </span>
                  {member.role !== "OWNER" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Change role</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Plus, Search, FolderKanban, Clock, MoreHorizontal,
  Pencil, Trash2, Eye, Users,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

const projects = [
  { id: "1", name: "SaaS Dashboard", updated: "2h ago", status: "active", members: 3, desc: "Admin panel with analytics and user management" },
  { id: "2", name: "E-commerce Storefront", updated: "1d ago", status: "active", members: 2, desc: "Product catalog with cart and checkout flow" },
  { id: "3", name: "Portfolio Website", updated: "3d ago", status: "draft", members: 1, desc: "Personal portfolio with project showcase" },
  { id: "4", name: "Internal Tool", updated: "1w ago", status: "active", members: 4, desc: "Employee onboarding and HR dashboard" },
];

const f = (d: number) => ({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.45 } });

export default function Projects() {
  const [search, setSearch] = useState("");
  const filtered = projects.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-4xl space-y-8">
        <motion.div {...f(0)} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-display font-bold tracking-tight">Projects</h1>
            <p className="text-sm text-muted-foreground mt-1">{projects.length} projects · {projects.filter(p => p.status === "active").length} active</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-3.5 w-3.5" /> New project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">Create project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-sm">Project name</Label>
                  <Input placeholder="My awesome app" className="h-11" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">Description <span className="text-muted-foreground">(optional)</span></Label>
                  <Input placeholder="What are you building?" className="h-11" />
                </div>
                <Button className="w-full h-11">Create & open builder</Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div {...f(0.05)} className="relative max-w-sm mx-auto sm:mx-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search projects…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-10 text-sm" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((project, i) => (
            <motion.div key={project.id} {...f(0.08 + i * 0.04)}>
              <div className="relative p-5 rounded-xl border border-border bg-card hover:border-foreground/10 hover:border-primary/20 hover:shadow-sm transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/8 transition-colors">
                    <FolderKanban className="h-4 w-4 text-foreground/60 group-hover:text-primary transition-colors" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative z-10 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Pencil className="h-3.5 w-3.5 mr-2" /> Rename</DropdownMenuItem>
                      <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" /> Preview</DropdownMenuItem>
                      <DropdownMenuItem><Users className="h-3.5 w-3.5 mr-2" /> Members</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive"><Trash2 className="h-3.5 w-3.5 mr-2" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Link to={`/app/projects/${project.id}`} className="after:absolute after:inset-0">
                  <h3 className="font-display text-sm font-semibold mb-1 group-hover:text-primary transition-colors">{project.name}</h3>
                </Link>
                <p className="text-xs text-muted-foreground mb-5 line-clamp-1">{project.desc}</p>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {project.updated}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> {project.members}</span>
                    <span className={cn(
                      "label-caps text-[10px] px-2 py-0.5 rounded-full border",
                      project.status === "active" ? "border-success/20 text-success bg-success/5" : "border-border text-muted-foreground"
                    )}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

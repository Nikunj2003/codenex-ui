import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Eye, GitBranch, Users, Layers, Shield, Rocket, Globe } from "lucide-react";


const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const sections = [
  { icon: Cpu, title: "AI builder workflow", body: "Describe your app in natural language and watch Codenex generate a complete, production-ready application. Iterate through conversation, not configuration.", tag: "Core" },
  { icon: Users, title: "Project collaboration", body: "Invite team members as editors or viewers. Manage roles, handle invites, and build together with clear permission boundaries.", tag: "Teams" },
  { icon: Eye, title: "Live preview & publish", body: "See your app running in real-time with responsive device previews. Publish to production with a single click when you're ready.", tag: "Deploy" },
  { icon: Layers, title: "File visibility & control", body: "Inspect every generated file. Understand the architecture. Export your code at any time. You always maintain full ownership.", tag: "Transparency" },
  { icon: Shield, title: "Usage & billing management", body: "Clear visibility into your token usage, project limits, and subscription status. No surprises, no hidden costs.", tag: "Ops" },
  { icon: GitBranch, title: "Fast iteration loops", body: "Refine your app through rapid prompt iterations. Each change builds on the last, creating a natural evolution of your product.", tag: "Workflow" },
  { icon: Rocket, title: "Generation history", body: "Every generation step is tracked. Review past iterations, understand what changed, and roll back when needed.", tag: "Planned" },
  { icon: Globe, title: "Custom domains", body: "Connect your own domain to published apps. Professional deployment for production-ready applications.", tag: "Planned" },
];

export default function Features() {
  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative pt-28 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl" />
        </div>

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="max-w-2xl"
          >
            <p className="label-caps text-primary mb-5">Features</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
              Built for people who ship.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Every feature exists to help you move from idea to production faster, with full visibility and control.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURE GRID ─── */}
      <section className="pb-24 md:pb-36">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-5">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5, ease }}
                className="group flex flex-col sm:flex-row gap-5 p-6 md:p-8 rounded-xl border border-border/70 bg-background/92 shadow-[0_18px_60px_-48px_#388880] backdrop-blur-2xl hover:surface-elevated transition-shadow"
              >
                <div className="h-11 w-11 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <s.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                    <span className={`label-caps text-[10px] px-2 py-0.5 rounded-full border ${
                      s.tag === "Planned"
                        ? "border-border text-muted-foreground"
                        : "border-primary/15 text-primary bg-primary/5"
                    }`}>
                      {s.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 md:py-36 border-t border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-xl"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">
              See it in action.
            </h2>
            <p className="text-muted-foreground text-lg mb-9 leading-relaxed">
              Start building for free and experience every feature first-hand.
            </p>
            <Link to="/signup">
              <Button variant="hero" size="lg" className="gap-2">
                Start building free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

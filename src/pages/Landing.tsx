import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Eye, GitBranch, Users, Layers, Shield, Cpu, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const capabilities = [
  {
    icon: Cpu,
    title: "AI-first generation",
    body: "Describe your app in plain language. Codenex interprets your intent, generates clean architecture, and produces deployable code—not templates.",
  },
  {
    icon: Eye,
    title: "Instant preview",
    body: "Every change reflected immediately. Toggle device sizes, share preview URLs, and iterate visually before shipping.",
  },
  {
    icon: GitBranch,
    title: "Iterative refinement",
    body: "Each prompt builds on the last. Refine layouts, add features, fix details—all through natural conversation.",
  },
  {
    icon: Layers,
    title: "Full code visibility",
    body: "Inspect every generated file. Understand the architecture. Export your codebase and own it completely.",
  },
  {
    icon: Users,
    title: "Built for teams",
    body: "Invite collaborators with role-based access. Editors contribute, viewers observe, owners control.",
  },
  {
    icon: Shield,
    title: "Production-grade output",
    body: "Clean TypeScript, responsive design, semantic HTML, proper state management. Code you'd be proud to review.",
  },
];

const workflow = [
  { step: "01", title: "Describe", body: "Tell Codenex what you're building. Be specific or broad—both work." },
  { step: "02", title: "Generate", body: "Watch your app materialize. Files, components, styles—all created for you." },
  { step: "03", title: "Refine", body: "Iterate through conversation. Adjust layouts, add pages, tweak behavior." },
  { step: "04", title: "Ship", body: "Preview on any device. Hit publish when ready. It's that simple." },
];

const f = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease },
});

export default function Landing() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 15), y: x * 15 });
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28 md:pb-32 md:pt-44">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-3xl" />
        </div>

        <div className="container relative px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <div className="max-w-xl">
              <motion.p {...f(0)} className="label-caps mb-5 text-primary">
                AI-native app builder
              </motion.p>

              <motion.h1
                {...f(0.08)}
                className="mb-6 text-[2.35rem] font-display font-bold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl"
              >
                Ship products,
                <br className="hidden sm:block" /> not prototypes.
              </motion.h1>

              <motion.p
                {...f(0.16)}
                className="mb-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 md:mb-10 md:text-xl"
              >
                Describe what you want to build. Codenex generates production-ready web apps, lets you refine through
                conversation, and deploys when you're ready.
              </motion.p>

              <motion.div {...f(0.24)} className="flex flex-col gap-3 sm:flex-row">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button variant="hero" size="lg" className="w-full gap-2 sm:w-auto">
                    Start building free <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/features" className="w-full sm:w-auto">
                  <Button variant="hero-outline" size="lg" className="w-full sm:w-auto">
                    How it works
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div {...f(0.3)} className="flex justify-center md:justify-end">
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: 800 }}
              >
                <img
                  src="/card.png"
                  alt="Codenex Project Card"
                  className="w-full max-w-2xl rounded-2xl shadow-2xl"
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
                    transformStyle: "preserve-3d",
                  }}
                />
              </div>
            </motion.div>
          </div>

          <motion.div {...f(0.35)} className="mt-16 sm:mt-20 md:mt-28">
            <div className="overflow-hidden rounded-[1.5rem] border border-border/80 bg-card/95 surface-elevated">
              <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 sm:h-11 sm:flex-nowrap sm:py-0">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                  <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                  <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                </div>
                <div className="min-w-0 flex-1 sm:ml-4 sm:flex sm:justify-center">
                  <div className="flex min-w-0 items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground sm:px-4 sm:py-1.5">
                    <Terminal className="h-3 w-3 shrink-0" />
                    <span className="truncate">codenex.dev/builder</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:min-h-[580px] lg:flex-row">
                <div className="flex min-h-[360px] w-full flex-col border-b border-border lg:min-h-[580px] lg:w-[34%] lg:border-b-0 lg:border-r">
                  <div className="flex h-11 items-center border-b border-border px-3 sm:px-4">
                    <div className="flex gap-1 rounded-lg bg-secondary p-1">
                      <div className="flex items-center gap-1 rounded-md bg-card px-2.5 py-1 text-[10px] font-medium text-foreground/70 sm:px-3">
                        <div className="h-2.5 w-2.5 rounded-sm bg-foreground/12" />
                        <span>Chat</span>
                      </div>
                      <div className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] text-muted-foreground/50 sm:px-3">
                        <div className="h-2.5 w-2.5 rounded-sm bg-foreground/6" />
                        <span>Files</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div className="flex-1 space-y-5">
                      <div className="flex gap-3">
                        <div className="h-8 w-8 shrink-0 rounded-full bg-secondary" />
                        <div className="max-w-[75%] flex-1 space-y-2 pt-1 sm:max-w-sm">
                          <div className="h-2.5 w-full rounded bg-foreground/6" />
                          <div className="h-2.5 w-3/4 rounded bg-foreground/6" />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3">
                        <div className="w-full max-w-[85%] sm:max-w-xs">
                          <div className="space-y-2 rounded-2xl border border-primary/8 bg-primary/6 p-3.5">
                            <div className="h-2.5 w-full rounded bg-primary/12" />
                            <div className="h-2.5 w-2/3 rounded bg-primary/8" />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Sparkles className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div className="max-w-[80%] flex-1 space-y-2 pt-1 sm:max-w-md">
                          <div className="h-2.5 w-full rounded bg-foreground/6 animate-breathing" />
                          <div
                            className="h-2.5 w-5/6 rounded bg-foreground/5 animate-breathing"
                            style={{ animationDelay: "0.5s" }}
                          />
                          <div
                            className="h-2.5 w-2/3 rounded bg-foreground/4 animate-breathing"
                            style={{ animationDelay: "1s" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                      <div className="flex h-11 flex-1 items-center rounded-xl border border-border bg-background px-4">
                        <div className="h-2.5 w-24 rounded bg-foreground/5 sm:w-40" />
                      </div>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.06]">
                        <ArrowRight className="h-4 w-4 text-foreground/20" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col lg:w-[66%]">
                  <div className="flex h-11 items-center gap-2 border-b border-border px-3 sm:px-4">
                    <div className="rounded-md bg-secondary px-2.5 py-1 text-[10px] font-medium text-foreground/65">Preview</div>
                    <div className="px-2.5 py-1 text-[10px] text-foreground/30">Code</div>
                  </div>

                  <div className="flex-1 p-3 sm:p-4">
                    <div className="flex h-full min-h-[240px] flex-col gap-4 rounded-xl border border-border bg-background/80 p-4 sm:p-5">
                      <div className="grid gap-4 md:grid-cols-[1.35fr_0.9fr]">
                        <div className="rounded-xl border border-primary/10 bg-primary/[0.04] p-4">
                          <p className="label-caps mb-3 text-primary/80">Live preview</p>
                          <div className="space-y-3">
                            <div className="h-3 w-24 rounded bg-primary/15" />
                            <div className="h-7 w-full rounded-lg bg-foreground/6" />
                            <div className="grid grid-cols-2 gap-3">
                              <div className="h-24 rounded-xl bg-foreground/5" />
                              <div className="h-24 rounded-xl bg-foreground/5" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
                          <div className="rounded-xl border border-border bg-card p-4">
                            <div className="mb-2 h-2.5 w-16 rounded bg-foreground/7" />
                            <div className="h-6 w-20 rounded bg-foreground/10" />
                          </div>
                          <div className="rounded-xl border border-border bg-card p-4">
                            <div className="mb-2 h-2.5 w-12 rounded bg-foreground/7" />
                            <div className="h-6 w-16 rounded bg-foreground/10" />
                          </div>
                        </div>
                      </div>

                      <div className="grid flex-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-border bg-card/70 p-4">
                          <div className="mb-3 h-2.5 w-20 rounded bg-foreground/6" />
                          <div className="space-y-2">
                            <div className="h-2.5 w-full rounded bg-foreground/5" />
                            <div className="h-2.5 w-4/5 rounded bg-foreground/5" />
                          </div>
                        </div>
                        <div className="rounded-xl border border-border bg-card/70 p-4">
                          <div className="mb-3 h-2.5 w-16 rounded bg-foreground/6" />
                          <div className="space-y-2">
                            <div className="h-2.5 w-full rounded bg-foreground/5" />
                            <div className="h-2.5 w-3/4 rounded bg-foreground/5" />
                          </div>
                        </div>
                        <div className="rounded-xl border border-border bg-card/70 p-4 sm:block hidden">
                          <div className="mb-3 h-2.5 w-14 rounded bg-foreground/6" />
                          <div className="space-y-2">
                            <div className="h-2.5 w-full rounded bg-foreground/5" />
                            <div className="h-2.5 w-2/3 rounded bg-foreground/5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border py-24 md:py-36">
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-16 md:mb-20"
          >
            <p className="label-caps mb-4 text-primary">Capabilities</p>
            <h2 className="max-w-2xl text-2xl font-display font-bold tracking-tight sm:text-3xl md:text-5xl">
              Everything you need, nothing you don't.
            </h2>
          </motion.div>

          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16">
            {capabilities.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease }}
                className="flex gap-5"
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <item.icon className="h-[18px] w-[18px] text-foreground/70" />
                </div>
                <div>
                  <h3 className="mb-2 font-display text-base font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24 md:py-36">
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-16 md:mb-20"
          >
            <p className="label-caps mb-4 text-primary">Workflow</p>
            <h2 className="max-w-xl text-2xl font-display font-bold tracking-tight sm:text-3xl md:text-5xl">
              From idea to production in four moves.
            </h2>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card p-6 sm:p-7 md:p-8"
              >
                <p className="mb-5 text-3xl font-display font-bold text-foreground/8">{item.step}</p>
                <h3 className="mb-2 font-display text-base font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24 md:py-40">
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-xl"
          >
            <h2 className="mb-6 text-3xl font-display font-bold tracking-tight md:text-5xl">
              Ready to build
              <br />
              something real?
            </h2>
            <p className="mb-9 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Start with a free account. No credit card. No time limit. Just your next idea.
            </p>
            <Link to="/signup" className="block sm:inline-block">
              <Button variant="hero" size="lg" className="w-full gap-2 sm:w-auto">
                Get started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

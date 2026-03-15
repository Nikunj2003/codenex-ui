import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Eye, GitBranch, Users, Layers, Shield, Cpu, Sparkles} from "lucide-react";
import { motion } from "framer-motion";

import { useState, useCallback } from "react";


const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

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
      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-3xl" />
        </div>

        <div className="container relative">
          <div className="md:grid md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <motion.p {...f(0)} className="label-caps text-primary mb-5">
                AI-native app builder
              </motion.p>

              <motion.h1 {...f(0.08)} className="text-[2.75rem] sm:text-6xl md:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-7">
                Ship products,{" "}
                <br className="hidden sm:block" />
                not prototypes.
              </motion.h1>

              <motion.p {...f(0.16)} className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
                Describe what you want to build. Codenex generates production-ready web apps, lets you refine through conversation, and deploys when you're ready.
              </motion.p>

              <motion.div {...f(0.24)} className="flex flex-wrap gap-3">
                <Link to="/signup">
                  <Button variant="hero" size="lg" className="gap-2">
                    Start building free <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="hero-outline" size="lg">
                    How it works
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div {...f(0.3)} className="mt-12 md:mt-0 flex justify-center">
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: 800 }}
              >
                <img
                  src="/card.png"
                  alt="Codenex Project Card"
                  className="rounded-2xl w-full max-w-2xl shadow-2xl"
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
                    transformStyle: "preserve-3d",
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Builder mockup */}
          <motion.div {...f(0.35)} className="mt-20 md:mt-28">
            <div className="rounded-xl border border-border bg-card surface-elevated overflow-hidden">
              <div className="flex items-center gap-2 px-4 h-11 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                  <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                  <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                </div>
                <div className="ml-4 flex-1 flex justify-center">
                  <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
                    <Terminal className="h-3 w-3" />
                    codenex.dev/builder
                  </div>
                </div>
              </div>
              <div className="flex min-h-[480px] md:min-h-[580px]">
                {/* Left panel mock (Chat / Files toggle) */}
                <div className="w-[30%] flex flex-col border-r border-border">
                  {/* Left panel toolbar with Chat/Files toggle */}
                  <div className="h-10 border-b border-border flex items-center px-3 gap-2">
                    <div className="flex gap-0.5 p-0.5 rounded-md bg-secondary">
                      <div className="flex items-center gap-1 px-2 py-1 rounded bg-card text-[10px] text-foreground/60 font-medium">
                        <div className="h-2.5 w-2.5 rounded-sm bg-foreground/12" />
                        <span>Chat</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-muted-foreground/40">
                        <div className="h-2.5 w-2.5 rounded-sm bg-foreground/6" />
                        <span>Files</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-5 flex flex-col">
                  <div className="flex-1 space-y-5">
                    <div className="flex gap-3">
                      <div className="h-7 w-7 rounded-full bg-secondary flex-shrink-0" />
                      <div className="space-y-1.5 pt-1 flex-1 max-w-sm">
                        <div className="h-2.5 w-full rounded bg-foreground/6" />
                        <div className="h-2.5 w-3/4 rounded bg-foreground/6" />
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="max-w-xs">
                        <div className="p-3.5 rounded-xl bg-primary/6 border border-primary/8 space-y-1.5">
                          <div className="h-2.5 w-48 rounded bg-primary/12" />
                          <div className="h-2.5 w-32 rounded bg-primary/8" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-7 w-7 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div className="space-y-1.5 pt-1 flex-1 max-w-md">
                        <div className="h-2.5 w-full rounded bg-foreground/6 animate-breathing" />
                        <div className="h-2.5 w-5/6 rounded bg-foreground/5 animate-breathing" style={{ animationDelay: "0.5s" }} />
                        <div className="h-2.5 w-2/3 rounded bg-foreground/4 animate-breathing" style={{ animationDelay: "1s" }} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div className="flex-1 h-11 rounded-lg border border-border bg-background flex items-center px-4">
                      <div className="h-2.5 w-40 rounded bg-foreground/5" />
                    </div>
                    <div className="h-11 w-11 rounded-lg bg-foreground/5 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-foreground/20" />
                    </div>
                  </div>
                  </div>
                </div>
                {/* Preview mock */}
                <div className="hidden lg:flex flex-col w-[70%] border-l border-border">
                  <div className="h-10 border-b border-border flex items-center px-3 gap-2">
                    <div className="px-2.5 py-1 rounded bg-secondary text-[10px] font-medium text-foreground/60">Preview</div>
                    <div className="px-2.5 py-1 rounded text-[10px] text-foreground/30">Code</div>
                  </div>
                  <div className="flex-1 p-3">
                    <div className="h-full rounded-md border border-border bg-background flex items-center justify-center">
                      <Eye className="h-6 w-6 text-foreground/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CAPABILITIES ─── */}
      <section className="py-24 md:py-36 border-t border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-16 md:mb-20"
          >
            <p className="label-caps text-primary mb-4">Capabilities</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight max-w-2xl">
              Everything you need, nothing you don't.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
            {[
              { icon: Cpu, title: "AI-first generation", body: "Describe your app in plain language. Codenex interprets your intent, generates clean architecture, and produces deployable code—not templates." },
              { icon: Eye, title: "Instant preview", body: "Every change reflected immediately. Toggle device sizes, share preview URLs, and iterate visually before shipping." },
              { icon: GitBranch, title: "Iterative refinement", body: "Each prompt builds on the last. Refine layouts, add features, fix details—all through natural conversation." },
              { icon: Layers, title: "Full code visibility", body: "Inspect every generated file. Understand the architecture. Export your codebase and own it completely." },
              { icon: Users, title: "Built for teams", body: "Invite collaborators with role-based access. Editors contribute, viewers observe, owners control." },
              { icon: Shield, title: "Production-grade output", body: "Clean TypeScript, responsive design, semantic HTML, proper state management. Code you'd be proud to review." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease }}
                className="flex gap-5"
              >
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="h-[18px] w-[18px] text-foreground/70" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WORKFLOW ─── */}
      <section className="py-24 md:py-36 border-t border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-16 md:mb-20"
          >
            <p className="label-caps text-primary mb-4">Workflow</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight max-w-xl">
              From idea to production in four moves.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden surface-elevated">
            {[
              { step: "01", title: "Describe", body: "Tell Codenex what you're building. Be specific or broad—both work." },
              { step: "02", title: "Generate", body: "Watch your app materialize. Files, components, styles—all created for you." },
              { step: "03", title: "Refine", body: "Iterate through conversation. Adjust layouts, add pages, tweak behavior." },
              { step: "04", title: "Ship", body: "Preview on any device. Hit publish when ready. It's that simple." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card p-7 md:p-8"
              >
                <p className="text-3xl font-display font-bold text-foreground/8 mb-5">{item.step}</p>
                <h3 className="font-display text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 md:py-40 border-t border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-xl"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">
              Ready to build<br />something real?
            </h2>
            <p className="text-muted-foreground text-lg mb-9 leading-relaxed">
              Start with a free account. No credit card. No time limit. Just your next idea.
            </p>
            <Link to="/signup">
              <Button variant="hero" size="lg" className="gap-2">
                Get started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Server, Database, Code, Cloud, Layers, Terminal, Workflow } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const f = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease },
});

const features = [
  {
    icon: Code,
    title: "Frontend & Proxy",
    body: "Built with React UI for user interaction and a seamless Node.js Proxy Service to handle subdomains and route preview environments in real-time.",
  },
  {
    icon: Layers,
    title: "Gateway & Microservices",
    body: "Spring Cloud Gateway distributes traffic to dedicated Account, Workspace, and Intelligence services, ensuring modular, robust scalability.",
  },
  {
    icon: Server,
    title: "Workspace Management",
    body: "The Workspace Service manages project files, member access, and Kubernetes integrations. Projects are mapped to live deployments instantly.",
  },
  {
    icon: Terminal,
    title: "AI Ecosystem",
    body: "The Intelligence Service leverages Spring AI & OpenAI to provide context-aware chat, rapid code generation, and iterative event tracking.",
  },
  {
    icon: Database,
    title: "Distributed Data Layer",
    body: "Data flows securely between PostgreSQL clusters, Kafka brokers for decoupled events, Redis for lightning-fast caching, and MinIO for file storage.",
  },
  {
    icon: Cloud,
    title: "Dynamic Previews",
    body: "Code ships immediately via Kubernetes (GKE). Dedicated preview namespaces isolate running environments for secure, isolated testing.",
  },
];

export default function About() {
  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-3xl" />
        </div>

        <div className="container relative text-center">
          <motion.p {...f(0)} className="label-caps text-primary mb-5">
            About This Project
          </motion.p>
          <motion.h1 {...f(0.08)} className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6 mx-auto max-w-4xl">
            A Distributed <br className="hidden sm:block" />
            Microservices Architecture.
          </motion.h1>
          <motion.p {...f(0.16)} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Codenex is a comprehensive personal engineering project built by Nikunj Khitha. It showcases a modern, scalable backend designed to handle AI-driven code generation, real-time messaging, and dynamic Kubernetes deployments.
          </motion.p>
        </div>
      </section>

      {/* ─── ARCHITECTURE DIAGRAM ─── */}
      <section className="pb-24 md:pb-36">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="w-full max-w-6xl mx-auto rounded-2xl border border-border/70 bg-card overflow-hidden shadow-[0_18px_60px_-48px_#388880]"
          >
            <div className="p-4 border-b border-border/70 flex items-center gap-2">
              <div className="flex gap-1.5 mr-4">
                <div className="h-3 w-3 rounded-full bg-foreground/10" />
                <div className="h-3 w-3 rounded-full bg-foreground/10" />
                <div className="h-3 w-3 rounded-full bg-foreground/10" />
              </div>
              <div className="bg-secondary rounded text-xs px-3 py-1 text-muted-foreground flex items-center gap-2">
                <Workflow className="w-3 h-3" /> System Architecture Overview
              </div>
            </div>
            <div className="p-4 md:p-8 bg-background/50 flex justify-center">
              <img
                src="/Architecture.png"
                alt="Architecture Diagram"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── ARCHITECTURE BREAKDOWN ─── */}
      <section className="relative py-24 md:py-36 border-y border-border/70 bg-background/92 shadow-[0_18px_60px_-48px_#388880] backdrop-blur-2xl">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-16 md:mb-20 max-w-3xl"
          >
            <p className="label-caps mb-4 text-primary">Technical Overview</p>
            <h2 className="text-3xl font-display font-bold tracking-tight md:text-4xl">
              How Codenex Works
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Codenex isn't just a UI framework. It's a deeply orchestrated platform powered by a robust microservices backend, real-time messaging, and Kubernetes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease }}
                className="p-6 md:p-8 rounded-xl border border-border/70 bg-card/50 backdrop-blur-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <feature.icon className="h-5 w-5 text-foreground/80" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CREATOR CTA ─── */}
      <section className="py-24 md:py-36">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">
              Built by Nikunj Khitha
            </h2>
            <p className="text-muted-foreground text-lg mb-9 leading-relaxed">
              I built Codenex and its distributed architecture from the ground up to demonstrate my ability to engineer complex, production-grade cloud environments involving AI integration, microservices orchestration, and dynamic infrastructure.
            </p>
            <Link to="/">
              <Button variant="hero" size="lg" className="gap-2">
                Return to Home <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

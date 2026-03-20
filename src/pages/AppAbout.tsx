import { motion } from "framer-motion";
import { Server, Database, Code, Cloud, Layers, Terminal, Workflow } from "lucide-react";

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

export default function AppAbout() {
  return (
    <div className="flex-1 flex flex-col px-4 py-8 md:px-8 md:py-12 max-w-5xl mx-auto w-full">
      <motion.div {...f(0)} className="mb-12">
        <p className="label-caps text-primary mb-3">About This Project</p>
        <h1 className="text-3xl font-display font-bold tracking-tight md:text-5xl mb-4">
          A Distributed Microservices Architecture.
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          Codenex is a comprehensive personal engineering project built by Nikunj Khitha. It showcases a modern, scalable backend designed to handle AI-driven code generation, real-time messaging, and dynamic Kubernetes deployments.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease }}
        className="w-full rounded-2xl border border-border bg-card overflow-hidden shadow-sm mb-16"
      >
        <div className="p-4 border-b border-border flex items-center gap-2">
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
            className="w-full max-w-4xl h-auto rounded-xl"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="mb-10 max-w-3xl"
      >
        <p className="label-caps mb-3 text-primary">Technical Overview</p>
        <h2 className="text-2xl font-display font-bold tracking-tight md:text-3xl mb-3">
          How Codenex Works
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Codenex isn't just a UI framework. It's a deeply orchestrated platform powered by a robust microservices backend, real-time messaging, and Kubernetes.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease }}
            className="p-5 md:p-6 rounded-xl border border-border bg-card/50 transition-colors hover:bg-card/80"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <feature.icon className="h-5 w-5 text-foreground/80" />
            </div>
            <h3 className="mb-2 font-display text-base font-semibold">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="py-12 border-t border-border"
      >
        <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-4">
          Built by Nikunj Khitha
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
          I built Codenex and its distributed architecture from the ground up to demonstrate my ability to engineer complex, production-grade cloud environments involving AI integration, microservices orchestration, and dynamic infrastructure.
        </p>
      </motion.div>
    </div>
  );
}

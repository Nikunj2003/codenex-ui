import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  { name: "Starter", price: 0, current: false, features: ["1 project", "1,000 tokens/day", "Community support", "Basic preview"] },
  { name: "Pro", price: 29, current: true, features: ["10 projects", "50,000 tokens/day", "Priority support", "Custom domains", "3 team seats"] },
  { name: "Team", price: 79, current: false, features: ["Unlimited projects", "200,000 tokens/day", "Dedicated support", "Custom domains", "Unlimited seats", "SSO & audit logs"] },
];

const f = (d: number) => ({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.45 } });

export default function Billing() {
  return (
    <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-3xl space-y-8">
        <motion.div {...f(0)} className="text-center">
          <h1 className="text-3xl font-display font-bold tracking-tight mb-1">Billing</h1>
          <p className="text-sm text-muted-foreground">Manage your subscription and payments.</p>
        </motion.div>

        {/* Current plan card */}
        <motion.div {...f(0.05)} className="rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/8 flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-display font-semibold">Pro plan</h3>
                <p className="text-[11px] text-muted-foreground">$29/mo · Renews Mar 15, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="label-caps text-[10px] px-2 py-0.5 rounded-full border border-success/20 text-success bg-success/5">Active</span>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                <ExternalLink className="h-3 w-3" /> Billing portal
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Compare plans */}
        <div>
          <motion.h3 {...f(0.1)} className="text-base font-display font-semibold mb-5 text-center">Compare plans</motion.h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...f(0.12 + i * 0.04)}
                className={cn(
                  "rounded-xl border bg-card overflow-hidden hover:shadow-sm transition-all",
                  plan.current ? "border-primary ring-2 ring-primary/20" : "border-border"
                )}
              >
                {/* Gradient top bar for current plan */}
                {plan.current && (
                  <div className="h-1 bg-gradient-to-r from-primary to-primary/60" />
                )}

                {/* Card content — flex column to push button to bottom */}
                <div className="flex flex-col p-7 h-full">
                  {/* Header */}
                  <div className="text-center mb-5">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <h4 className="text-sm font-display font-semibold">{plan.name}</h4>
                      {plan.current && (
                        <span className="label-caps text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">Current</span>
                      )}
                    </div>
                    {plan.current && (
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span className="text-[10px] text-primary font-medium">Most popular</span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <p className="text-center text-3xl font-display font-bold tracking-tight mb-6">
                    ${plan.price}<span className="text-xs text-muted-foreground font-normal">/mo</span>
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-7 text-left flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-[13px]">
                        <Check className="h-3.5 w-3.5 text-success mt-0.5 flex-shrink-0" /> {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Button — always at bottom */}
                  <Button
                    variant={plan.current ? "outline" : "default"}
                    size="sm"
                    className="w-full h-9 text-xs mt-auto"
                    disabled={plan.current}
                  >
                    {plan.current ? "Current plan" : plan.price === 0 ? "Downgrade" : "Upgrade"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

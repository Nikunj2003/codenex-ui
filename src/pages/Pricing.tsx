import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";


const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const f = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease },
});

const plans = [
  {
    name: "Starter",
    price: { monthly: 0, yearly: 0 },
    desc: "For exploring what's possible",
    features: ["1 project", "1,000 tokens / day", "Community support", "Basic preview"],
    cta: "Get started",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: { monthly: 29, yearly: 24 },
    desc: "For builders who ship",
    features: ["10 projects", "50,000 tokens / day", "Priority support", "Custom domains", "3 team seats", "Full publish access"],
    cta: "Start pro trial",
    href: "/signup",
    highlighted: true,
  },
  {
    name: "Team",
    price: { monthly: 79, yearly: 66 },
    desc: "For growing organizations",
    features: ["Unlimited projects", "200,000 tokens / day", "Dedicated support", "Custom domains", "Unlimited seats", "SSO & audit logs", "Advanced analytics"],
    cta: "Talk to us",
    href: "/signup",
    highlighted: false,
  },
];

const faqs = [
  { q: "Can I switch plans later?", a: "Yes. Upgrade, downgrade, or cancel at any time. Changes take effect on your next billing cycle." },
  { q: "What happens when I hit my token limit?", a: "You'll get a clear notification. Generation pauses until the next day—no surprise charges." },
  { q: "Do I own the code Codenex generates?", a: "Absolutely. You have full ownership and can export your codebase at any time." },
  { q: "Is there a free trial for Pro?", a: "Yes—14 days, full access, no credit card required to start." },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-3xl" />
        </div>

        <div className="container relative text-center">
          <motion.p {...f(0)} className="label-caps text-primary mb-5">
            Pricing
          </motion.p>
          <motion.h1 {...f(0.08)} className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6 mx-auto max-w-2xl">
            Simple pricing for{" "}
            <br className="hidden sm:block" />
            every stage of growth.
          </motion.h1>
          <motion.p {...f(0.16)} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Start free. Upgrade when you need more. No hidden fees, no surprises.
          </motion.p>
        </div>
      </section>

      {/* ─── PLANS ─── */}
      <section className="pb-24 md:pb-32">
        <div className="container">
          {/* Toggle */}
          <motion.div {...f(0.2)} className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-1 p-1 rounded-full border border-border bg-card/80 backdrop-blur-sm">
              <button
                onClick={() => setYearly(false)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  !yearly ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  yearly ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Yearly
                <span className="ml-1.5 text-xs text-primary font-semibold">-17%</span>
              </button>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-5 items-stretch max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.5, ease }}
                className={cn(
                  "relative flex flex-col p-7 rounded-xl border backdrop-blur-sm",
                  plan.highlighted
                    ? "border-primary/30 bg-card/90 surface-elevated"
                    : "border-border bg-card/80"
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold tracking-wide uppercase">
                    Most popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display text-lg font-semibold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.desc}</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-display font-bold tracking-tight">
                    ${yearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="text-muted-foreground text-sm ml-1.5">/mo</span>
                </div>
                <ul className="space-y-3.5 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link to={plan.href}>
                  <Button
                    variant={plan.highlighted ? "hero" : "outline"}
                    size={plan.highlighted ? "lg" : "default"}
                    className="w-full"
                  >
                    {plan.cta}
                    {plan.highlighted && <ArrowRight className="h-4 w-4 ml-2" />}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-14"
          >
            <p className="label-caps text-primary mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              Common questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4, ease }}
                className="p-6 rounded-xl border border-border bg-card/80 backdrop-blur-sm"
              >
                <h3 className="font-display font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 md:py-40 border-t border-border">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">
              Start building today.
            </h2>
            <p className="text-muted-foreground text-lg mb-9 leading-relaxed">
              No credit card required. No time limit. Just your next idea.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/signup">
                <Button variant="hero" size="lg" className="gap-2">
                  Get started free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="hero-outline" size="lg">
                  See all features
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

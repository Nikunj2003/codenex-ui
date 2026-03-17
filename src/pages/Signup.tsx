import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2 } from "lucide-react";


const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const f = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease },
});

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/app"), 700);
  };

  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] items-start justify-center px-4 pb-10 pt-4 sm:pt-5 md:pt-5 lg:pt-7 xl:pt-8">
      {/* blur glow */}
      <div className="absolute w-[420px] h-[420px] rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />

      <motion.div
        {...f(0)}
        className="relative z-10 w-full max-w-[400px] sm:max-w-[420px] lg:max-w-[440px]"
      >
        <div className="rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm surface-elevated sm:p-8 lg:p-9">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2.5 mb-8">
              <img src="/logo.png" alt="Codenex" className="h-10 w-10" />
              <span className="font-display text-lg font-semibold tracking-tight">codenex</span>
            </Link>
            <h1 className="text-2xl font-display font-bold tracking-tight mb-1">Create your account</h1>
            <p className="text-sm text-muted-foreground">Start building in under a minute.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium">Full name</Label>
              <Input id="name" placeholder="Jane Smith" required className="h-11" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" required className="h-11" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input id="password" type="password" placeholder="Min. 8 characters" required className="h-11" />
            </div>
            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
            </Button>
          </form>

          {/* divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11 gap-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </Button>
            <Button variant="outline" className="h-11 gap-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-7">
          Already have an account?{" "}
          <Link to="/login" className="text-foreground font-medium hover:underline underline-offset-4">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}

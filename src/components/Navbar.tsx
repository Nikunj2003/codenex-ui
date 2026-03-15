import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="container h-20 pt-2">
        <div className="flex h-full items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          <Link to="/" className="flex items-center gap-2.5 group justify-self-start">
            <img src="/logo.png" alt="Codenex" className="h-14 w-14 transition-transform group-hover:scale-105" />
            <span className="font-display text-3xl font-semibold tracking-tight">codenex</span>
          </Link>

          <nav className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-[13px] font-medium transition-colors",
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center justify-self-end gap-2">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-[13px]">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm" className="px-5">
                Start building
              </Button>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-5 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-3 border-t border-border">
            <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full" size="sm">Log in</Button>
            </Link>
            <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="hero" className="w-full" size="sm">Start building</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

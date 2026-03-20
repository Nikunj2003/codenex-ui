import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
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

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/92 shadow-[0_18px_60px_-48px_#388880] backdrop-blur-2xl"
          : "bg-background/72 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none"
      )}
    >
      <div className="container px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between gap-3 transition-[min-height,padding] duration-300 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6",
            scrolled ? "min-h-[4.5rem] py-2" : "min-h-[4.75rem] py-3"
          )}
        >
          <Link to="/" className="group flex min-w-0 items-center gap-2 sm:gap-2.5 md:justify-self-start">
            <img
              src="/brand-icon.png"
              alt="Codenex"
              className="h-11 w-11 shrink-0 transition-transform group-hover:scale-105 sm:h-12 sm:w-12 md:h-14 md:w-14"
            />
            <span className="truncate font-display text-[2rem] font-semibold leading-none tracking-tight sm:text-[2.35rem] md:text-3xl">
              codenex
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-8 md:flex">
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

          <div className="hidden items-center justify-self-end gap-2 md:flex">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-[13px]">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm" className="px-5">
                Start building
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-1.5 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-foreground/80 hover:bg-secondary/80 hover:text-foreground"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="container px-4 pb-4 md:hidden sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/95 surface-elevated">
            <div className="space-y-1 p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    location.pathname === link.href
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="grid gap-2 border-t border-border/70 p-3">
              <Link to="/login">
                <Button variant="outline" className="h-11 w-full justify-center rounded-xl">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero" className="h-11 w-full justify-center rounded-xl">
                  Start building
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

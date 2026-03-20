import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative border-t border-border/70 bg-background/92 shadow-[0_-18px_60px_-48px_#388880] backdrop-blur-2xl">
      <div className="container py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <img src="/logo.png" alt="Codenex" className="h-10 w-10" />
              <span className="font-display text-lg font-semibold tracking-tight">codenex</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Ship products, not prototypes. Codenex turns your ideas into production-grade web applications.
            </p>
          </div>
          <div>
            <p className="label-caps text-muted-foreground mb-4">Product</p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
              <li><span className="text-muted-foreground/50 cursor-not-allowed" title="Coming soon">Changelog</span></li>
            </ul>
          </div>
          <div>
            <p className="label-caps text-muted-foreground mb-4">Company</p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><span className="text-muted-foreground/50 cursor-not-allowed" title="Coming soon">Blog</span></li>
              <li><span className="text-muted-foreground/50 cursor-not-allowed" title="Coming soon">Careers</span></li>
            </ul>
          </div>
          <div>
            <p className="label-caps text-muted-foreground mb-4">Legal</p>
            <ul className="space-y-3 text-sm">
              <li><span className="text-muted-foreground/50 cursor-not-allowed" title="Coming soon">Privacy</span></li>
              <li><span className="text-muted-foreground/50 cursor-not-allowed" title="Coming soon">Terms</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Codenex, Inc. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-foreground cursor-pointer transition-colors">Twitter</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-foreground cursor-pointer transition-colors">GitHub</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-foreground cursor-pointer transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

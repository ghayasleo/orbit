import { Link } from "react-router-dom";
import { Github, Phone, Mail } from "lucide-react";

const Logo = ({ className }: { className?: string }) => (
  <div
    className={`relative flex h-8 w-8 items-center justify-center ${className ?? ""}`}
  >
    <div className="absolute h-6 w-6 rounded-full border-[2.5px] border-brand opacity-80" />
    <div className="absolute h-3 w-3 rounded-full bg-brand ml-3 mt-3" />
  </div>
);

export function LandingFooter() {
  return (
    <footer className="bg-bg-subtle border-t border-border-subtle py-12">
      <div className="mx-auto max-w-[1160px] px-6 flex flex-col items-center gap-8">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo />
          <span className="font-display text-xl font-bold text-text-primary tracking-tight">
            Orbit
          </span>
        </Link>

        {/* Open Source Badge */}
        <div className="inline-flex items-center gap-2 bg-brand/10 text-brand text-xs font-semibold px-3 py-1 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
          Open Source · MIT Licensed
        </div>

        {/* Contact & Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary">
          <a
            href="https://github.com/ghayasleo/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-text-primary transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>ghayasleo</span>
          </a>

          <span className="hidden sm:block h-4 w-px bg-border-medium" />

          <a
            href="tel:03149179764"
            className="inline-flex items-center gap-2 hover:text-text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>03149179764</span>
          </a>

          <span className="hidden sm:block h-4 w-px bg-border-medium" />

          <a
            href="mailto:ghayasleo99@gmail.com"
            className="inline-flex items-center gap-2 hover:text-text-primary transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>ghayasleo99@gmail.com</span>
          </a>
        </div>

        {/* Bottom */}
        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} Orbit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

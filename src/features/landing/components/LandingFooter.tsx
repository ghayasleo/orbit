import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="bg-bg-subtle border-t border-border-subtle pt-16 pb-8">
      <div className="mx-auto max-w-[1160px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Left Column — Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              {/* Logo placeholder */}
              <div className="relative flex h-8 w-8 items-center justify-center">
                <div className="absolute h-6 w-6 rounded-full border-2 border-brand group-hover:border-brand-hover transition-colors opacity-70" />
                <div className="absolute h-6 w-6 rounded-full border-2 border-brand group-hover:border-brand-hover transition-colors translate-x-1 translate-y-1 opacity-40 mix-blend-multiply dark:mix-blend-screen" />
              </div>
              <span className="font-display text-lg font-bold text-text-primary tracking-tight">Orbit</span>
            </Link>
            
            <p className="text-sm text-text-muted font-normal">Organise your world.</p>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-border-medium text-text-secondary hover:text-text-primary hover:border-text-secondary transition-colors rounded-full px-3 py-1.5 text-sm w-fit"
            >
              <Github className="h-4 w-4" />
              <span>★ 1.2k</span>
            </a>

            <div className="inline-flex items-center justify-center bg-brand-subtle text-brand text-xs font-semibold px-3 py-1 rounded-full w-fit mt-2">
              MIT Licensed · Open Source
            </div>
          </div>

          {/* Column: Product */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-[0.06em]">Product</h4>
            <ul className="flex flex-col gap-3">
              {['Features', 'How it Works', 'Changelog', 'Roadmap', 'Self-Hosting Guide'].map((item) => (
                <li key={item}>
                  <Link to={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-sm font-normal text-text-secondary hover:text-text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Open Source */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-[0.06em]">Open Source</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'GitHub Repository', url: 'https://github.com' },
                { label: 'Contributing Guide', url: 'https://github.com' },
                { label: 'Report a Bug', url: 'https://github.com/issues' },
                { label: 'Request a Feature', url: 'https://github.com/issues' },
                { label: 'License (MIT)', url: 'https://github.com' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-sm font-normal text-text-secondary hover:text-text-primary transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: General */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-[0.06em]">General</h4>
            <ul className="flex flex-col gap-3">
              {['About Orbit', 'Privacy Policy', 'Terms of Use', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-sm font-normal text-text-secondary hover:text-text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted font-normal">© {new Date().getFullYear()} Orbit. Open Source.</p>
          <p className="text-sm text-text-muted font-normal flex items-center gap-1">
            Built with <span className="text-brand">♥</span> by the community
          </p>
        </div>
      </div>
    </footer>
  );
}

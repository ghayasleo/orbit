import { Outlet } from 'react-router-dom'
import { ThemeToggle } from '@/shared/components/ThemeToggle'

export function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left brand panel - hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative bg-zinc-950 dark:bg-zinc-900 flex-col justify-between p-12 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-purple-500/10 blur-2xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            </div>
            <span className="text-white text-xl font-bold tracking-tight">Orbit</span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Now in beta
            </div>
            <h2 className="text-4xl font-bold text-white leading-tight tracking-tight">
              Everything you need,<br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                all in one place.
              </span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-sm">
              Streamline your workflow with powerful tools built for modern teams.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { label: '10k+', desc: 'Users' },
              { label: '99.9%', desc: 'Uptime' },
              { label: '4.9★', desc: 'Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-white font-bold text-lg">{stat.label}</div>
                <div className="text-zinc-500 text-xs">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {['bg-violet-400', 'bg-indigo-400', 'bg-purple-400', 'bg-fuchsia-400'].map((color, i) => (
              <div key={i} className={`w-8 h-8 rounded-full ${color} border-2 border-zinc-950 flex items-center justify-center text-white text-xs font-bold`}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-zinc-400 text-sm">Trusted by thousands of teams</p>
        </div>
      </div>

      {/* Right content panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 lg:px-10">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            </div>
            <span className="font-bold text-lg">Orbit</span>
          </div>
          <div className="hidden lg:block" />
          <ThemeToggle />
        </div>

        <main className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16">
          <Outlet />
        </main>

        <footer className="px-6 py-4 lg:px-10">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Orbit. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}

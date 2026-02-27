import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { Button } from '@/shared/components/ui/button'

export function RootLayout() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isLanding
            ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between max-w-7xl">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-violet-500/30 transition-shadow">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-bold text-xl tracking-tight">Orbit</span>
          </Link>

          {isLanding && (
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#features"
                onClick={handleNavScroll('features')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#why"
                onClick={handleNavScroll('why')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Why Orbit
              </a>
            </nav>
          )}

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link
              to="/login"
              className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors px-2"
            >
              Log In
            </Link>
            <Button asChild size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-violet-500/25 transition-all">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'

const modules = [
  {
    icon: '⊞',
    name: 'Dashboard',
    description: 'See your entire day at a glance — tasks, habits, budget, and more in one command centre.',
  },
  {
    icon: '✓',
    name: 'Tasks',
    description: 'Capture, prioritise, and complete everything. Projects, subtasks, priorities, and recurring items.',
  },
  {
    icon: '🔔',
    name: 'Reminders',
    description: 'Time-based alerts that fire exactly when you need them. Snooze, link to tasks, or repeat.',
  },
  {
    icon: '💸',
    name: 'Expenses',
    description: 'Log every purchase in seconds. Charts, categories, and receipt photos keep your spending clear.',
  },
  {
    icon: '🤝',
    name: 'Loans',
    description: 'Track money lent and borrowed. Repayment schedules, interest, and automatic payment reminders.',
  },
  {
    icon: '🔥',
    name: 'Habits',
    description: 'Build streaks, break bad patterns, and visualise consistency with heatmaps and progress rings.',
  },
  {
    icon: '📊',
    name: 'Budget Planner',
    description: 'Set monthly category budgets and watch real-time spending fill the bars. Never overspend again.',
  },
  {
    icon: '📝',
    name: 'Notes',
    description: 'Rich text, checklists, voice memos, and images — everything captured and instantly searchable.',
  },
  {
    icon: '🔄',
    name: 'Subscriptions',
    description: 'Know exactly what you pay each month. Renewal alerts and cost-saving insights included.',
  },
  {
    icon: '🎯',
    name: 'Goals',
    description: 'Set long-term objectives with milestones, linked habits, and progress tracking over time.',
  },
]

const benefits = [
  {
    icon: '📶',
    title: 'Works Offline',
    description:
      'Every feature works without an internet connection. Data syncs seamlessly in the background when you\'re back online.',
  },
  {
    icon: '🧩',
    title: 'All-in-One',
    description:
      'Ten powerful modules in a single app. No juggling between tools — your tasks, money, habits, and goals live together.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description:
      'No tracking. No ads. No data sold. Your personal data stays yours — encrypted, exportable, and fully deletable.',
  },
]

export function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute top-1/2 -left-60 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-violet-600/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center py-24 sm:py-32">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            10 modules · One app · Fully offline
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Your entire life,{' '}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
              beautifully organised
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Orbit brings tasks, expenses, habits, loans, goals, notes, reminders, budgets, and subscriptions into one
            seamless personal productivity hub — built for how real life works.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-violet-500/30 transition-all text-base px-8 h-12"
            >
              <Link to="/signup">Get Started Free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base px-8 h-12 border-border hover:bg-accent transition-all"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <a href="#features">Explore Features</a>
            </Button>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-xs text-muted-foreground">
            Free to use · No credit card required · Works on any device
          </p>

          {/* App preview placeholder */}
          <div className="mt-16 sm:mt-20 relative mx-auto max-w-4xl">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-card">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60 z-10 pointer-events-none" />
              {/* Mock app UI */}
              <div className="p-4 sm:p-6 bg-card">
                {/* Mock top bar */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="h-3 w-32 bg-muted rounded-full mb-2" />
                    <div className="h-5 w-48 bg-gradient-to-r from-violet-500/30 to-indigo-500/30 rounded-full" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-violet-500/20" />
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20" />
                  </div>
                </div>
                {/* Mock widget grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Tasks today', value: '7', color: 'violet' },
                    { label: 'Budget used', value: '64%', color: 'indigo' },
                    { label: 'Habit streak', value: '12 🔥', color: 'orange' },
                    { label: 'Upcoming', value: '3 bills', color: 'blue' },
                    { label: 'Net savings', value: '+₨ 12k', color: 'green' },
                    { label: 'Active goals', value: '4 / 6', color: 'purple' },
                  ].map((w) => (
                    <div
                      key={w.label}
                      className="rounded-xl border border-border bg-background p-3 sm:p-4 hover:border-violet-500/30 transition-colors"
                    >
                      <p className="text-xs text-muted-foreground mb-1">{w.label}</p>
                      <p className="text-lg sm:text-2xl font-bold">{w.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Glow under preview */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-violet-600/20 blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* Feature Modules Grid */}
      <section id="features" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-3">
              Everything you need
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              10 modules. One cohesive app.
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Every module talks to the others. Log an expense and it updates your budget. Complete a habit and it
              advances your goal. It all just works.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {modules.map((mod) => (
              <div
                key={mod.name}
                className="group relative rounded-2xl border border-border bg-card p-5 hover:border-violet-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-200 cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/15 to-indigo-500/15 flex items-center justify-center text-lg mb-4 group-hover:from-violet-500/25 group-hover:to-indigo-500/25 transition-colors">
                  {mod.icon}
                </div>
                <h3 className="font-semibold text-base mb-1.5">{mod.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{mod.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Orbit */}
      <section id="why" className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-violet-500/5 to-background" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-3">
              Built differently
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Why choose Orbit?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Most productivity apps do one thing. Orbit does everything — and makes it feel effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group text-center p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/15 to-indigo-500/15 flex items-center justify-center text-2xl mx-auto mb-5 group-hover:scale-110 transition-transform duration-200">
                  {b.icon}
                </div>
                <h3 className="font-bold text-lg mb-3">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '10', label: 'Modules' },
              { value: '100%', label: 'Offline capable' },
              { value: '0', label: 'Ads or trackers' },
              { value: '∞', label: 'Entries, always free' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-indigo-600/5 to-transparent" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-violet-500/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            Free forever · No credit card
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
            Ready to get organised?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
            Join Orbit and take control of your tasks, finances, habits, and goals — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-violet-500/30 transition-all text-base px-10 h-12"
            >
              <Link to="/signup">Create Your Free Account</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto text-muted-foreground">
              <Link to="/login">Already have an account? Log in →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">O</span>
            </div>
            <span className="font-semibold text-foreground">Orbit</span>
            <span>· Your personal productivity hub</span>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/login" className="hover:text-foreground transition-colors">
              Log In
            </Link>
            <Link to="/signup" className="hover:text-foreground transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

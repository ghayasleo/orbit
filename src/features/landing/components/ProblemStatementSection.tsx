import { Layers, Link2, BrainCircuit, ArrowUpRight } from "lucide-react";

export function ProblemStatementSection() {
  const pains = [
    {
      title: "Too many apps",
      desc: "A habit tracker here, notes there, budget somewhere else. Switching contexts kills momentum.",
      icon: Layers,
      accent: "from-sky-500/20 to-indigo-500/5",
      ring: "ring-sky-500/20",
    },
    {
      title: "Nothing connects",
      desc: "Your tools don’t share intent. Goals, reminders, and money live on separate islands.",
      icon: Link2,
      accent: "from-violet-500/20 to-fuchsia-500/5",
      ring: "ring-violet-500/20",
    },
    {
      title: "Mental overhead adds up",
      desc: "Remembering where things live becomes a job. Tools should reduce thinking, not create it.",
      icon: BrainCircuit,
      accent: "from-emerald-500/20 to-teal-500/5",
      ring: "ring-emerald-500/20",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[90px]" />
        <div className="absolute -bottom-48 right-[-120px] h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            The problem
          </div>

          <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Life is scattered.{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-white bg-clip-text text-transparent">
              Your tools make it worse.
            </span>
          </h2>

          <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-300">
            Most people juggle 5–8 apps just to stay on top of daily life. The
            tools don’t share context, so your attention gets split — and
            important stuff slips through.
          </p>
        </div>

        {/* Content Grid */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left column: narrative + mini stats */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">
                The “busy” feeling isn’t your workload.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                It’s the friction between tools: switching, syncing,
                remembering, and rebuilding context every time you open a
                different app.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Stat label="apps/day" value="5–8" />
                <Stat label="context switches" value="30+" />
                <Stat label="missed tasks" value="weekly" />
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                <div>
                  <p className="text-xs text-zinc-400">The pattern</p>
                  <p className="text-sm font-medium text-white">
                    More tools → more friction → less done
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-200">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Optional: small “quote” style callout */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5">
              <p className="text-sm text-zinc-200">
                “My reminders are everywhere — I’m always one notification away
                from forgetting.”
              </p>
              <p className="mt-2 text-xs text-zinc-400">Common user reality</p>
            </div>
          </div>

          {/* Right column: improved cards */}
          <div className="lg:col-span-7">
            <div className="grid gap-4 md:grid-cols-3">
              {pains.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className={[
                      "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6",
                      "transition hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05]",
                      "hover:shadow-[0_20px_80px_-30px_rgba(99,102,241,0.35)]",
                      "ring-1 ring-transparent",
                      p.ring,
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                        "bg-gradient-to-b",
                        p.accent,
                      ].join(" ")}
                    />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/30">
                          <Icon className="h-5 w-5 text-zinc-200" />
                        </div>
                        <div className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <ArrowUpRight className="h-4 w-4 text-zinc-300" />
                        </div>
                      </div>

                      <h4 className="mt-5 text-lg font-semibold text-white">
                        {p.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                        {p.desc}
                      </p>

                      <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-white/0 via-white/15 to-white/0" />
                      <p className="mt-4 text-xs text-zinc-400">
                        Result: less clarity, more “busy”.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom strip */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-zinc-200">
                  Tools should feel like one system — not a scattered toolbox.
                </p>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-zinc-300">
                  Next: how Orbit fixes it →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-3">
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

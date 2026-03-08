import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { FeaturesSectionWithHoverEffects } from "@/shared/components/ui/feature-section-with-hover-effects";

export function FeaturesGridSection() {
  return (
    <section
      id="features"
      className="dark:bg-black bg-white scroll-mt-15 py-5 md:py-15 overflow-hidden relative isolate"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-white via-zinc-100 to-white dark:from-black dark:via-zinc-950 dark:to-black"></div>
        <div className="absolute hidden dar:block inset-0 bg-linear-to-b from-transparent via-black/10 dark:to-black"></div>
      </div>
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 -z-1">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-[1280px] px-6">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span
            className="px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest mb-6 inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Capabilities
          </motion.span>
          <motion.h2
            className="font-display text-[40px] md:text-[64px] font-bold text-text-primary leading-[1.1] max-w-[850px] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            One App. <span className="text-brand">Ten Modules.</span>
            <br />
            Seamless Productivity.
          </motion.h2>
          <motion.p
            className="text-xl text-text-secondary leading-relaxed max-w-[640px] font-normal mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A cohesive ecosystem designed to capture every aspect of your life.
            No more jumping between apps – everything you need is right here.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="relative isolate dark:bg-[url('/images/wave-background.webp')] bg-cover bg-fixed">
          <div className="absolute hidden dark:block inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.5)_30%,rgba(255,255,255,0.9)_100%)] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.7)_30%,rgba(0,0,0,0.8)_100%)]"></div>
          <FeaturesSectionWithHoverEffects />
        </div>

        {/* Sync Message */}
        <motion.div
          className="mt-5 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-4 py-4 px-8 rounded-full bg-brand/5 border border-brand/10 text-brand font-medium">
            <RefreshCw className="h-5 w-5 animate-spin-slow" />
            <span>
              Fully Integrated. Each module talks to the other automatically.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

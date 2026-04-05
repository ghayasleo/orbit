import { ServiceNodeMap } from "@/shared/ui/service-node-map";
import { LAYER_CONFIG } from "@/shared/config";
import { cn } from "@/shared/lib";
import { motion } from "framer-motion";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-bg-base py-16 md:py-28 relative overflow-hidden"
    >
      <div className="mx-auto max-w-[1160px] px-6">
        {/* Header Block */}
        <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center tracking-widest text-[12px] font-bold uppercase text-brand mb-4">
            THE ORBIT SYSTEM
          </div>
          <h2 className="font-display text-[40px] md:text-[56px] text-balance font-bold text-text-primary leading-tight max-w-[800px] mb-6 tracking-tight">
            Everything connects. Nothing slips.
          </h2>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-[640px] font-normal mx-auto mb-8">
            9 modules. One integrated brain. Data flows automatically so you
            never enter anything twice.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {Object.entries(LAYER_CONFIG)
              .filter(([layer]) => layer !== "Core")
              .map(([layer, config]) => (
                <div
                  key={layer}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 border rounded-full",
                    config.bg,
                    config.border
                  )}
                >
                  <span className="text-sm">{config.icon}</span>
                  <span className="text-[10px] font-bold dark:text-white/60 uppercase tracking-widest">
                    {layer}
                  </span>
                </div>
              ))}
          </div>
        </motion.div>

        <ServiceNodeMap />
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-brand/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
    </section>
  );
}

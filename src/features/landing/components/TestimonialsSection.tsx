import { Particles } from "@/shared/components/ui/particles";
import { Testimonials } from "@/shared/components/ui/unique-testimonial";
import { motion } from "framer-motion";

export function TestimonialsSection() {
  return (
    <section className="relative bg-linear-to-b from-black to-bg-subtle py-16 md:py-28 overflow-hidden">
      <Particles className="absolute inset-0 pointer-events-none" />
      <div className="mx-auto max-w-[1160px] px-6">
        {/* Header Block */}
        <motion.div
          className="flex flex-col items-center text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="inline-flex items-center tracking-[0.06em] text-[12px] font-semibold uppercase text-text-muted mb-4">
            WHAT PEOPLE ARE SAYING
          </div>
          <h2 className="font-display text-[32px] text-balance md:text-[38px] font-bold text-text-primary leading-tight max-w-[640px] tracking-tight">
            Once They Tried It, There Was No Going Back.
          </h2>
        </motion.div>

        <Testimonials />
      </div>
    </section>
  );
}

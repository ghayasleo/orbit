import { motion } from 'framer-motion';
import { Button } from '@/shared/components/ui/button';
import { Link } from 'react-router-dom';

export function CTABannerSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      
      {/* Background Gradient & Texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5B6AF0] to-[#9B6BF2] -z-20" />
      {/* Subtle Noise Texture Overlay (Optional, using a standard CSS pattern) */}
      <div 
        className="absolute inset-0 opacity-[0.05] -z-10 mix-blend-overlay"
         // You can replace this with a real noise SVG if available, or keep it generic
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="mx-auto max-w-[1160px] px-6 text-center text-white relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 30 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true, margin: "-10%" }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="mx-auto max-w-[680px] flex flex-col items-center"
        >
          {/* Eyebrow Label */}
          <div className="inline-flex items-center tracking-[0.06em] text-[12px] font-semibold uppercase text-white/70 mb-6">
            GET STARTED
          </div>

          {/* Headline */}
          <h2 className="font-display text-[44px] md:text-[60px] font-extrabold leading-[1.1] mb-8 tracking-tight">
            Your most organised life<br className="hidden sm:block"/>
            is one app away.
          </h2>

          {/* Subheading */}
          <p className="text-lg text-white/80 leading-[1.6] max-w-[460px] font-normal mb-10">
            Free forever. Open source. Works on every device. No excuses left — just a better way to manage your everyday.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
             <Button
                className="h-[50px] rounded-[10px] bg-white text-[#5B6AF0] px-7 text-base font-semibold transition-all hover:-translate-y-[1px] hover:shadow-lg hover:bg-white/95 border-0"
                asChild
              >
                <Link to="/login">Get Started — It's Free</Link>
             </Button>

             <Button
                variant="outline"
                className="h-[50px] rounded-[10px] px-7 text-base font-medium border-white/50 text-white hover:text-white hover:bg-white/10 hover:border-white transition-colors bg-transparent"
                asChild
              >
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
             </Button>
          </div>

          {/* Trust Line */}
          <p className="text-[13px] text-white/60 font-normal">
            MIT Licensed · No credit card · Works offline · Your data is yours
          </p>

        </motion.div>
      </div>
    </section>
  );
}

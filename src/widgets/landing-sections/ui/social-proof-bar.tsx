import { motion } from "framer-motion";

export function SocialProofBar() {
  const logos = [
    "Product Hunt",
    "GitHub",
    "Hacker News",
    "Dev.to",
    "Reddit r/selfhosted",
  ];

  // We duplicate the array to create a seamless infinite scroll effect
  const repeatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-10 border-b border-border-subtle overflow-hidden bg-background pt-10">
      <div className="mx-auto max-w-[1160px] px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Scrolling Marquee Container */}
          <div className="relative flex overflow-hidden w-full mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              className="flex items-center gap-12 sm:gap-16 whitespace-nowrap"
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30, // 30 seconds for full loop as per spec
                  ease: "linear",
                },
              }}
            >
              {repeatedLogos.map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  className="text-text-muted font-display font-semibold text-lg md:text-xl transition-colors hover:text-text-secondary cursor-default"
                >
                  {logo}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

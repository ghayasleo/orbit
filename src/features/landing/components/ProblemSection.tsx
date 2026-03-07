import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Link2, BrainCircuit } from "lucide-react";

interface TagProps {
  text: string;
  icon?: React.ReactNode;
}

const Tag = ({ text, icon }: TagProps) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary w-fit mb-4">
    {icon && <span className="w-4 h-4">{icon}</span>}
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export function ProblemSection() {
  const refDiscover = useRef(null);
  const refDefine = useRef(null);
  const refDevelop = useRef(null);

  // amount: 0.5 means when 50% of the item is in view
  const isDiscoverInView = useInView(refDiscover, {
    margin: "-40% 0px -40% 0px",
  });
  const isDefineInView = useInView(refDefine, { margin: "-40% 0px -40% 0px" });
  const isDevelopInView = useInView(refDevelop, {
    margin: "-40% 0px -40% 0px",
  });

  return (
    <section
      id="process"
      className="relative py-10 px-6 bg-bg-base bg-[url('/images/wave-background.webp')] bg-cover bg-fixed"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.5)_30%,rgba(0,0,0,0.9)_100%)]"></div>
      <div className="relative isolate mx-auto pt-10">
        {/* Background gradient effects similar to SCSS pseudos */}
        {/* <div className="absolute inset-0 top-0 h-1/2 -z-10 bg-[linear-gradient(180deg,#121212_0%,rgba(18,18,18,0.9)_50%,#121212_100%)] rounded-t-[36px]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 -z-10 bg-[linear-gradient(180deg,#121212_0%,rgba(18,18,18,0.9)_50%,#121212_100%)] rounded-b-[36px]" /> */}

        {/* Section Header */}
        <div className="mb-10 md:mb-15 max-w-2xl text-center mx-auto">
          <div className="inline-flex items-center tracking-widest text-[12px] font-bold uppercase text-brand mb-4">
            The Problem
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-text-primary text-balance">
            Life is scattered. Your tools make it worse.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            Most people juggle 5–8 apps just to stay on top of daily life. The
            tools don’t share context, so your attention gets split — and
            important stuff slips through.
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-7xl mx-auto">
          {/* Left Column: Text Steps */}
          <div className="flex-1 lg:h-full flex flex-col space-y-24 lg:space-y-0">
            {/* Step 1 */}
            <div
              ref={refDiscover}
              className="lg:h-screen flex flex-col justify-center max-w-lg"
            >
              <Tag
                text="Too many apps"
                icon={<Layers className="w-full h-full text-sky-500" />}
              />
              <p className="text-2xl md:text-3xl font-medium leading-tight text-text-primary">
                A habit tracker here, notes there, budget somewhere else.
                Switching contexts kills momentum.
              </p>
            </div>

            {/* Step 2 */}
            <div
              ref={refDefine}
              className="lg:h-screen flex flex-col justify-center max-w-lg"
            >
              <Tag
                text="Nothing connects"
                icon={<Link2 className="w-full h-full text-violet-500" />}
              />
              <p className="text-2xl md:text-3xl font-medium leading-tight text-text-primary">
                Your tools don’t share intent. Goals, reminders, and money live
                on separate islands.
              </p>
            </div>

            {/* Step 3 */}
            <div
              ref={refDevelop}
              className="lg:h-screen flex flex-col justify-center max-w-lg"
            >
              <Tag
                text="Mental overhead adds up"
                icon={
                  <BrainCircuit className="w-full h-full text-emerald-500" />
                }
              />
              <p className="text-2xl md:text-3xl font-medium leading-tight text-text-primary">
                Remembering where things live becomes a job. Tools should reduce
                thinking, not create it.
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Images */}
          <div className="flex-1 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center mt-12 lg:mt-0">
            <div className="relative w-full aspect-560/481 max-w-2xl mx-auto">
              <motion.div
                className="absolute inset-0 w-full bg-[#003E5E] shadow-2xl grid place-content-center rounded-3xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isDiscoverInView ? 1 : 0,
                  zIndex: isDiscoverInView ? 10 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <img src="/images/problem-1.png" alt="Research" />
              </motion.div>
              <motion.div
                className="absolute inset-0 w-full bg-[#341A63] shadow-2xl grid place-content-center rounded-3xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isDefineInView ? 1 : 0,
                  zIndex: isDefineInView ? 10 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <img src="/images/problem-2.png" alt="Research" />
              </motion.div>
              <motion.div
                className="absolute inset-0 w-full bg-[#00472C] shadow-2xl grid place-content-center rounded-3xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isDevelopInView ? 1 : 0,
                  zIndex: isDevelopInView ? 10 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <img src="/images/problem-3.png" alt="Research" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

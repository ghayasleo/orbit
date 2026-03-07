import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";

// Abstract placeholder images for the steps
const processOne =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800&h=600";
const processTwo =
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=600";
const processThree =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=600";
const processFour =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600";

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
  const refDeliver = useRef(null);

  // amount: 0.5 means when 50% of the item is in view
  const isDiscoverInView = useInView(refDiscover, {
    margin: "-40% 0px -40% 0px",
  });
  const isDefineInView = useInView(refDefine, { margin: "-40% 0px -40% 0px" });
  const isDevelopInView = useInView(refDevelop, {
    margin: "-40% 0px -40% 0px",
  });
  const isDeliverInView = useInView(refDeliver, {
    margin: "-40% 0px -40% 0px",
  });

  return (
    <section id="process" className="relative py-20 px-6 bg-bg-base">
      <div className="relative isolate mx-auto pt-20">
        {/* Background gradient effects similar to SCSS pseudos */}
        <div className="absolute inset-0 top-0 h-1/2 -z-10 bg-linear-to-b from-primary/5 to-transparent rounded-t-[36px]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 -z-10 bg-linear-to-t from-primary/5 to-transparent rounded-b-[36px]" />

        {/* Section Header */}
        <div className="mb-16 md:mb-24 max-w-2xl text-center mx-auto">
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
                icon={<Search className="w-full h-full" />}
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
                icon={<PenTool className="w-full h-full" />}
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
                icon={<Code className="w-full h-full" />}
              />
              <p className="text-2xl md:text-3xl font-medium leading-tight text-text-primary">
                Remembering where things live becomes a job. Tools should reduce
                thinking, not create it.
              </p>
            </div>

            {/* Step 4 */}
            <div
              ref={refDeliver}
              className="lg:h-screen flex flex-col justify-center max-w-lg"
            >
              <Tag text="Launch" icon={<Rocket className="w-full h-full" />} />
              <p className="text-2xl md:text-3xl font-medium leading-tight text-text-primary">
                Deploy the final product and gather feedback for continuous
                improvement.
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Images */}
          <div className="flex-1 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center mt-12 lg:mt-0">
            <div className="relative w-full aspect-4/3 max-w-2xl mx-auto">
              <motion.img
                className="absolute inset-0 w-full h-full object-cover rounded-[36px] shadow-2xl"
                src={processOne}
                alt="Research"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: isDiscoverInView ? 1 : 0,
                  scale: isDiscoverInView ? 1 : 0.95,
                  zIndex: isDiscoverInView ? 10 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.img
                className="absolute inset-0 w-full h-full object-cover rounded-[36px] shadow-2xl"
                src={processTwo}
                alt="Plan"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: isDefineInView ? 1 : 0,
                  scale: isDefineInView ? 1 : 0.95,
                  zIndex: isDefineInView ? 10 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.img
                className="absolute inset-0 w-full h-full object-cover rounded-[36px] shadow-2xl"
                src={processThree}
                alt="Create"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: isDevelopInView ? 1 : 0,
                  scale: isDevelopInView ? 1 : 0.95,
                  zIndex: isDevelopInView ? 10 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.img
                className="absolute inset-0 w-full h-full object-cover rounded-[36px] shadow-2xl"
                src={processFour}
                alt="Launch"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: isDeliverInView ? 1 : 0,
                  scale: isDeliverInView ? 1 : 0.95,
                  zIndex: isDeliverInView ? 10 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

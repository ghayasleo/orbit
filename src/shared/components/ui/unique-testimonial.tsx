import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote:
      "I've tried Notion, Todoist, YNAB, and three different habit trackers. Orbit replaced all of them. Not because it does everything perfectly — but because it does everything *together*.",
    author: "Sarah Chen",
    role: "Designer at Figma",
    avatar:
      "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    breakpoints: {
      992: 372.5,
      0: 275,
    },
  },
  {
    id: 2,
    quote:
      "The fact that it's open source and free made me sceptical at first. But after two weeks I recommended it to my entire team. The loans module alone has saved me from so many awkward conversations.",
    author: "Marcus Johnson",
    role: "Engineer at Vercel",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    breakpoints: {
      992: 372.5,
      0: 307.5,
    },
  },
  {
    id: 3,
    quote:
      "I'm a student on a tight budget. The expenses and budget modules together have genuinely changed how I think about money. And the habit tracker keeps me consistent with studying.",
    author: "Elena Rodriguez",
    role: "Founder at Craft",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    breakpoints: {
      992: 372.5,
      0: 307.5,
    },
  },
] as const;

function getResponsiveHeight(
  breakpoints: Record<number, number>,
): number | "auto" {
  const width = window.innerWidth;
  const matched = Object.entries(breakpoints)
    .map(([bp, h]) => ({ bp: Number(bp), h }))
    .sort((a, b) => b.bp - a.bp)
    .find(({ bp }) => width >= bp);
  return matched?.h ?? "auto";
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimatingRef = useRef(false);
  const [height, setHeight] = useState<number | "auto">(() => {
    if (typeof window === "undefined") return "auto"; // ← SSR guard
    return getResponsiveHeight(testimonials[0].breakpoints);
  });

  const activeTestimonial = useMemo(
    () => testimonials[activeIndex] || testimonials[0],
    [activeIndex],
  );

  const updateHeight = useCallback(() => {
    setHeight(getResponsiveHeight(activeTestimonial.breakpoints));
  }, [activeTestimonial.breakpoints]);

  useEffect(() => {
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [updateHeight]);

  const handleSelect = useCallback(
    (index: number) => {
      if (index === activeIndex || isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      setActiveIndex(index);
      isAnimatingRef.current = false;
    },
    [activeIndex],
  );

  return (
    <div className="flex flex-col items-center gap-10 py-16 w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center gap-6 mt-2">
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-xs text-muted-foreground tracking-[0.2em] uppercase"
            >
              {activeTestimonial.role}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2">
          {testimonials.map((testimonial, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={testimonial.id}
                onClick={() => handleSelect(index)}
                className={cn(
                  "relative flex items-center gap-0 rounded-full cursor-pointer",
                  "transition-all duration-500 ease-in-out p-0.5 group hover:pr-4 hover:pl-2 hover:py-2",
                  isActive
                    ? "bg-foreground shadow-lg pr-4 pl-2 py-2"
                    : "bg-transparent hover:bg-muted/80 p-0.5",
                )}
              >
                <div className="relative shrink-0">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    loading="eager"
                    decoding="async"
                    className={cn(
                      "w-8 h-8 rounded-full object-cover",
                      "transition-all duration-500 ease-in-out",
                      isActive ? "ring-2 ring-background/30" : "ring-0",
                      !isActive && "hover:scale-105",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-in-out group-hover:grid-cols-[1fr] group-hover:opacity-100 group-hover:ml-2",
                    isActive
                      ? "grid-cols-[1fr] opacity-100 ml-2"
                      : "grid-cols-[0fr] opacity-0 ml-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      className={cn(
                        "text-sm font-medium whitespace-nowrap block transition-colors duration-300",
                        isActive ? "text-background" : "text-foreground",
                      )}
                    >
                      {testimonial.author}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        animate={{ height }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full md:px-8"
      >
        <span className="absolute -left-3 top-0 text-7xl font-serif text-foreground/6 select-none pointer-events-none">
          "
        </span>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center py-10"
          >
            <p className="text-xl md:text-3xl font-light text-foreground text-center max-w-lg leading-relaxed">
              {activeTestimonial.quote}
            </p>
          </motion.div>
        </AnimatePresence>

        <span className="absolute -right-3 bottom-0 text-7xl font-serif text-foreground/6 select-none pointer-events-none">
          "
        </span>
      </motion.div>
    </div>
  );
}

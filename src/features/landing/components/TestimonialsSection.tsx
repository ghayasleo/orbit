import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function TestimonialsSection() {
  const testimonials = [
    {
      stars: 5,
      quote: 'I\'ve tried Notion, Todoist, YNAB, and three different habit trackers. Orbit replaced all of them. Not because it does everything perfectly — but because it does everything *together*.',
      name: 'Sana M.',
      detail: 'UX Designer, Lahore'
    },
    {
      stars: 5,
      quote: 'The fact that it\'s open source and free made me sceptical at first. But after two weeks I recommended it to my entire team. The loans module alone has saved me from so many awkward conversations.',
      name: 'Hamza K.',
      detail: 'Freelance Developer, Karachi'
    },
    {
      stars: 5,
      quote: 'I\'m a student on a tight budget. The expenses and budget modules together have genuinely changed how I think about money. And the habit tracker keeps me consistent with studying.',
      name: 'Nadia R.',
      detail: 'University Student, Islamabad'
    },
    {
      stars: 5,
      quote: 'What got me was the offline support. I log expenses immediately as I spend — no signal needed. By the time I\'m home it\'s all synced. My budgeting has never been more accurate.',
      name: 'Tariq A.',
      detail: 'Accountant, Rawalpindi'
    },
    {
      stars: 5,
      quote: 'I contribute to the project on GitHub and I use it daily. That combination is rare. The codebase is clean, the team is responsive, and the roadmap is public. Highly recommend to any developer.',
      name: 'Zara F.',
      detail: 'Software Engineer & Contributor'
    },
    {
      stars: 5,
      quote: 'Found three forgotten subscriptions in the first ten minutes. Cancelled them all. Orbit paid for itself immediately — except it\'s free. Which makes it even better.',
      name: 'Bilal S.',
      detail: 'Marketing Lead, Faisalabad'
    }
  ];

  /* For Mobile Carousel Dots */
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.offsetWidth;
      // Calculate which card is most visible
      const newIndex = Math.round(scrollPosition / cardWidth);
      
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < testimonials.length) {
        setActiveIndex(newIndex);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeIndex, testimonials.length]);

  return (
    <section className="bg-bg-subtle py-16 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1160px] px-6">
        
        {/* Header Block */}
        <motion.div 
          className="flex flex-col items-center text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="inline-flex items-center tracking-[0.06em] text-[12px] font-semibold uppercase text-text-muted mb-4">
            WHAT PEOPLE ARE SAYING
          </div>
          <h2 className="font-display text-[32px] md:text-[38px] font-bold text-text-primary leading-tight max-w-[640px] tracking-tight">
            People switched. They didn't go back.
          </h2>
        </motion.div>

        {/* Desktop Grid / Mobile Carousel */}
        <div className="relative">
          
          <motion.div 
            ref={scrollContainerRef}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            {testimonials.map((testimonial, i) => (
              <motion.div 
                key={i}
                className="bg-bg-card border border-border-subtle rounded-2xl p-7 shadow-card flex flex-col min-w-[300px] sm:min-w-[340px] md:min-w-0 snap-center shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(testimonial.stars)].map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[15px] font-normal text-text-primary leading-relaxed mb-8 flex-1">
                  "{testimonial.quote.replace(/\*/g, '')}" {/* Removing asterisk markdown markers for visual display */}
                </p>

                {/* Author Info */}
                <div className="flex flex-col gap-0.5 mt-auto">
                  <h4 className="font-display text-[15px] font-semibold text-text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="text-[13px] text-text-muted font-normal">
                    {testimonial.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Dots Indicator (Mobile Only) */}
          <div className="flex md:hidden justify-center gap-2 mt-2">
            {testimonials.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-4 bg-brand' : 'w-1.5 bg-border-medium'}`}
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}

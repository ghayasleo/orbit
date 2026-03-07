import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { ArrowRight } from "lucide-react";

export function FAQSection() {
  const faqs = [
    {
      q: "Is Orbit really free? What's the catch?",
      a: "There is no catch. Orbit is open source under the MIT License — free to use, free to self-host, and free to modify. There is no paid tier, no premium features behind a paywall, and no plans to change that. The project is community-supported.",
    },
    {
      q: "How is my data stored? Is it private?",
      a: "Your data is stored locally on your device using IndexedDB. The app works fully offline without sending any data to a server. If you choose to enable cloud sync (optional), your data is encrypted in transit with TLS 1.3 and at rest with AES-256. We have no advertising, no tracking, and no interest in your personal data.",
    },
    {
      q: "Can I self-host Orbit?",
      a: "Yes. Because Orbit is MIT licensed, you can clone the repository, deploy it on your own infrastructure, and use it entirely independently. Self-hosting documentation is available in the GitHub repo.",
    },
    {
      q: "Does it work on iPhone and Android?",
      a: "Yes. Orbit is a Progressive Web App (PWA), which means it runs in any modern browser on any device. On Android (Chrome) and iOS (Safari), you can install it to your home screen and it behaves like a native app — including offline support and push notifications.",
    },
    {
      q: "How do the modules connect to each other?",
      a: "This is the core idea behind Orbit. Every expense you log automatically updates your Budget Planner. Loan payment dates generate Reminders automatically. Subscriptions create Expense entries when they renew. Habits you complete count toward linked Goals. Tasks can be tied to Goals too. The Dashboard pulls from all of them at once. You enter data once, and it flows everywhere it's relevant.",
    },
    {
      q: "Can I import data from other apps?",
      a: "Yes. The Expenses module accepts CSV imports with a column mapping interface, so you can bring in data from bank statements or any other tracker. You can also import a full Orbit backup (JSON format) to restore your data on a new device.",
    },
    {
      q: "Is there a mobile app on the App Store or Play Store?",
      a: "Not yet — Orbit is currently available as a PWA only. A listing on the Play Store (via TWA) is on the roadmap. The PWA experience on both Android and iOS is already very close to native.",
    },
    {
      q: "How can I contribute to Orbit?",
      a: "Open the GitHub repository and look for issues tagged `good first issue` or `help wanted`. Contributions of all kinds are welcome — code, design, translations, documentation, and bug reports. There's a contributing guide in the repo to help you get started.",
    },
  ];

  return (
    <section id="faq" className="bg-bg-base py-16 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1160px] px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Column — Intro */}
          <motion.div
            className="w-full lg:w-[340px] lg:sticky lg:top-[120px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Eyebrow Label */}
            <div className="inline-flex items-center tracking-[0.06em] text-[12px] font-semibold uppercase text-text-muted mb-4">
              FAQ
            </div>

            {/* Headline */}
            <h2 className="font-display text-[32px] md:text-[38px] font-bold text-text-primary leading-tight mb-6 tracking-tight">
              Good questions deserve good answers.
            </h2>

            {/* Body Copy */}
            <p className="text-[15px] text-text-secondary leading-[1.6] font-normal mb-6">
              These are the questions we get asked the most. If something isn't
              answered here, open an issue on GitHub or reach out directly — we
              read everything.
            </p>

            {/* GitHub Nudge */}
            <a
              href="https://github.com/issues"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 text-brand font-semibold text-[14px] hover:underline underline-offset-4"
            >
              Ask a question on GitHub
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Right Column — Accordion */}
          <motion.div
            className="w-full flex-1"
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-border-subtle"
                >
                  <AccordionTrigger className="font-display text-left text-[18px] md:text-[20px] font-semibold text-text-primary py-6 hover:no-underline hover:text-brand transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] text-text-secondary leading-[1.7] pb-6 pr-6">
                    {/* Render simplistic markdown if needed (like `code` blocks) */}
                    {faq.a.split(/`([^`]+)`/).map((part, i) =>
                      i % 2 === 1 ? (
                        <code
                          key={i}
                          className="bg-bg-subtle border border-border-subtle px-1.5 py-0.5 rounded text-[13px] text-text-primary whitespace-nowrap"
                        >
                          {part}
                        </code>
                      ) : (
                        part
                      ),
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

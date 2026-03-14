import { HeroSection } from "../../components/hero-section";
import { SocialProofBar } from "../../components/social-proof-bar";
import { ProblemSection } from "../../components/problem-section";
import { FeaturesGridSection } from "../../components/features-grid-section";
import { HowItWorksSection } from "../../components/how-it-works-section";
import { TestimonialsSection } from "../../components/testimonials-section";
import { FAQSection } from "../../components/faq-section";
import { CTABannerSection } from "../../components/cta-banner-section";
import { LandingFooter } from "../../components/landing-footer";
import { ReactLenis } from "lenis/react";
import { useEffect } from "react";

export function LandingPage() {
  useEffect(() => {
    document.querySelector("html")?.classList.add("no-scrollbar");

    return () => {
      document.querySelector("html")?.classList.remove("no-scrollbar");
    };
  }, []);

  return (
    <ReactLenis root options={{ smoothWheel: true, lerp: 0.03 }}>
      <div className="flex flex-col min-h-screen font-inter bg-bg-base text-text-primary selection:bg-primary/50 selection:text-white">
        <main className="flex-1">
          {/* 02 — Hero */}
          <HeroSection />

          {/* 03 — Social Proof Bar */}
          <SocialProofBar />

          {/* Process Section */}
          <ProblemSection />

          {/* 05 — Features / Modules */}
          <FeaturesGridSection />

          {/* 06 — How It Works */}
          <HowItWorksSection />

          {/* 09 — Testimonials */}
          <TestimonialsSection />

          {/* 10 — FAQ */}
          <FAQSection />

          {/* 11 — Final CTA Banner */}
          <CTABannerSection />
        </main>

        {/* 12 — Footer */}
        <LandingFooter />
      </div>
    </ReactLenis>
  );
}

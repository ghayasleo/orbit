// import { LandingNavbar } from '../components/LandingNavbar';
import { HeroSection } from "../components/HeroSection";
import { SocialProofBar } from "../components/SocialProofBar";
import { ProblemSection } from "../components/ProblemSection";
import { ProblemStatementSection } from "../components/ProblemStatementSection";
import { FeaturesGridSection } from "../components/FeaturesGridSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { AppPreviewSection } from "../components/AppPreviewSection";
// import { OpenSourceSection } from '../components/OpenSourceSection';
import { TestimonialsSection } from "../components/TestimonialsSection";
import { FAQSection } from "../components/FAQSection";
import { CTABannerSection } from "../components/CTABannerSection";
import { LandingFooter } from "../components/LandingFooter";
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
        {/* 01 — Navbar */}
        {/* <LandingNavbar /> */}

        <main className="flex-1">
          {/* 02 — Hero */}
          <HeroSection />

          {/* 03 — Social Proof Bar */}
          {/* <SocialProofBar /> */}

          {/* Process Section */}
          <ProblemSection />

          {/* 04 — Problem Statement */}
          {/* <ProblemStatementSection /> */}

          {/* 05 — Features / Modules */}
          <FeaturesGridSection />

          {/* 06 — How It Works */}
          <HowItWorksSection />

          {/* 07 — App Preview */}
          <AppPreviewSection />

          {/* 08 — Open Source & Community */}
          {/* <OpenSourceSection /> */}

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

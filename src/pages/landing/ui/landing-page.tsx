import { HeroSection } from '@/widgets/landing-hero';
import {
  SocialProofBar,
  ProblemSection,
  FeaturesGridSection,
  HowItWorksSection,
  TestimonialsSection,
  FAQSection,
  CTABannerSection,
  LandingFooter,
} from '@/widgets/landing-sections';
import { ReactLenis } from 'lenis/react';
import { useEffect } from 'react';

export function LandingPage() {
  useEffect(() => {
    document.querySelector('html')?.classList.add('no-scrollbar');
    return () => {
      document.querySelector('html')?.classList.remove('no-scrollbar');
    };
  }, []);

  return (
    <ReactLenis root options={{ smoothWheel: true, lerp: 0.03 }}>
      <div className="flex flex-col min-h-screen font-inter bg-bg-base text-text-primary selection:bg-primary/50 selection:text-white">
        <main className="flex-1">
          <HeroSection />
          <SocialProofBar />
          <ProblemSection />
          <FeaturesGridSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <FAQSection />
          <CTABannerSection />
        </main>
        <LandingFooter />
      </div>
    </ReactLenis>
  );
}

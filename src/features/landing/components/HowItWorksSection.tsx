
import { QuantumTimeline } from '@/shared/components/ui/premium-process-timeline';

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-bg-base py-16 md:py-28 relative">
      <div className="mx-auto max-w-[1160px] px-6">
        
        {/* Header Block is now handled inside QuantumTimeline or we can keep it here if we prefer, but QuantumTimeline has its own. 
            We will use QuantumTimeline which already has a nice header setup. */}
        <QuantumTimeline />

      </div>
    </section>
  );
}

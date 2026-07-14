import { AnimatePresence } from 'framer-motion';
import StepIndicator from '../ui/StepIndicator';
import StepDevotee from './StepDevotee';
import StepPoojaDetails from './StepPoojaDetails';
import StepParticipants from './StepParticipants';
import StepSummary from './StepSummary';
import { useBookingStore } from '../../store/bookingStore';

const STEP_LABELS = ['Devotee', 'Pooja', 'Participants', 'Review'];

export default function BookingWizard() {
  const step = useBookingStore((s) => s.step);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-pearl px-6 pt-36 pb-20">
      {/* warm radial wash behind the header */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 0%, rgba(212,175,55,0.18), transparent 60%), radial-gradient(ellipse 50% 45% at 90% 10%, rgba(196,30,58,0.12), transparent 60%)',
        }}
      />
      <div className="relative z-[1] mx-auto max-w-[640px]">
        <h1 className="section-title mb-2">Book a Pooja</h1>
        <p className="mb-10 text-center text-maroon/70">
          Fill in the details below to schedule your sacred ritual.
        </p>
        <StepIndicator steps={STEP_LABELS} currentStep={step} />
        <AnimatePresence mode="wait">
          {step === 1 && <StepDevotee key="devotee" />}
          {step === 2 && <StepPoojaDetails key="pooja" />}
          {step === 3 && <StepParticipants key="participants" />}
          {step === 4 && <StepSummary key="summary" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

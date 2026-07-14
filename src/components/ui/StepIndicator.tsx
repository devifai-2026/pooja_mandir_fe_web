import { cn } from '../../lib/utils';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-12 flex items-center justify-center gap-3">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        return (
          <div className="flex items-center gap-3" key={label}>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 text-[0.9rem] font-bold',
                  'transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
                  isActive
                    ? 'scale-[1.08] border-gold bg-[image:var(--gradient-gold)] text-indigo-deep shadow-[0_6px_20px_rgba(212,175,55,0.4),0_0_0_6px_rgba(212,175,55,0.12)]'
                    : isDone
                      ? 'border-gold bg-gold text-white'
                      : 'border-gold/35 bg-white/60 text-maroon',
                )}
              >
                {isDone ? '✓' : stepNum}
              </div>
              <span className="hidden text-[0.8rem] font-semibold text-maroon sm:inline">
                {label}
              </span>
            </div>
            {stepNum !== steps.length && (
              <div
                className={cn(
                  'h-0.5 w-10 transition-colors duration-500',
                  isDone ? 'bg-gold' : 'bg-gold/30',
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

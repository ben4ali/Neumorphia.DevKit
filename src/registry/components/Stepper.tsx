import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  id: string;
  title: string;
  description?: string;
}

export interface NeumorphicStepperProps {
  steps: StepItem[];
  activeStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export const NeumorphicStepper: React.FC<NeumorphicStepperProps> = ({
  steps,
  activeStep,
  onStepClick,
  className = '',
}) => {
  return (
    <div className={`space-y-6 text-left ${className}`}>
      {steps.map((step, idx) => {
        const isCompleted = idx < activeStep;
        const isCurrent = idx === activeStep;
        const isLast = idx === steps.length - 1;

        return (
          <div key={step.id} className="relative flex items-start gap-4 group">
            {/* Indicator Column */}
            <div className="flex flex-col items-center flex-shrink-0">
              <button
                disabled={!onStepClick}
                onClick={() => onStepClick?.(idx)}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs font-mono transition-all border outline-none ${
                  isCompleted
                    ? 'shadow-neo-inset-sm bg-neo-well/50 text-neo-success border-neo-border'
                    : isCurrent
                    ? 'shadow-neo-raised-sm bg-neo-surface text-neo-secondary border-neo-secondary ring-2 ring-neo-secondary/30'
                    : 'shadow-neo-raised-sm bg-neo-surface text-neo-primary/40 border-neo-border'
                }`}
                aria-label={`Step ${idx + 1}: ${step.title}`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
              </button>

              {/* Vertical Engraved Trench */}
              {!isLast && (
                <div className="w-[2px] h-10 my-1.5 nms-divider-v" />
              )}
            </div>

            {/* Step Content */}
            <div className="space-y-0.5 pt-1 flex-1">
              <h4
                className={`text-xs sm:text-sm font-bold transition-colors ${
                  isCurrent
                    ? 'text-neo-secondary'
                    : isCompleted
                    ? 'text-neo-primary'
                    : 'text-neo-primary/50'
                }`}
              >
                {step.title}
              </h4>
              {step.description && (
                <p className="text-xs text-neo-primary/60 leading-relaxed">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

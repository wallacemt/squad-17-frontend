"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex justify-between">
        {/* Progress Line */}
        <div className="absolute left-0 top-6 h-0.5 w-full bg-border-color">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-hover-crxr transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          const isPending = currentStep < stepNumber;

          return (
            <div key={step.id} className="relative flex flex-col items-center flex-1">
              {/* Circle */}
              <div
                className={cn(
                  "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300",
                  isCompleted &&
                    "border-primary bg-gradient-to-br from-primary to-color-primary-hover shadow-[0_0_20px_rgba(255,193,7,0.3)]",
                  isCurrent && "border-primary bg-surface-crx shadow-[0_0_20px_rgba(255,193,7,0.3)] scale-110",
                  isPending && "border-border-color bg-bg-surface"
                )}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6 text-on-primary-crx" strokeWidth={3} />
                ) : (
                  <div
                    className={cn(
                      "text-sm font-bold transition-colors",
                      isCurrent && "text-color-primary",
                      isPending && "text-text-muted"
                    )}
                  >
                    {step.icon}
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="mt-3 text-center">
                <div
                  className={cn(
                    "text-sm font-semibold transition-colors",
                    (isCompleted || isCurrent) && "text-text-primary",
                    isPending && "text-text-muted"
                  )}
                >
                  {step.title}
                </div>
                <div className="text-xs text-text-muted mt-1 max-w-[120px]">{step.description}</div>
              </div>

              {/* Status Badge */}
              {isCurrent && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full w-20 bg-primary/50 px-2 py-0.5 text-xs font-medium "></span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

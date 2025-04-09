"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Send } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isValid: boolean;
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  nextLabel?: string;
  backLabel?: string;
}

export default function FormNavigation({
  currentStep,
  totalSteps,
  isValid,
  onBack,
  onNext,
  onSubmit,
  submitLabel = "Submit",
  nextLabel = "Next",
  backLabel = "Back",
}: FormNavigationProps) {
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (isLastStep && onSubmit) {
      onSubmit();
    } else if (onNext) {
      onNext();
    }
  };

  return (
    <div className="flex justify-between py-4 border-t">
      <div>
        {currentStep > 0 && onBack && (
          <Button variant="outline" onClick={onBack} type="button">
            {backLabel}
          </Button>
        )}
      </div>

      <Button onClick={handleNext} disabled={!isValid} type="button">
        {!isLastStep ? (
          <>
            {nextLabel} <ChevronRight className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            {submitLabel} <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}

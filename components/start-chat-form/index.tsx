"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import FormNavigation from "./form-navigation";
import type { ImageFile, Option } from "./types";
import { cn } from "@/lib/utils";
import ImageUploadField from "./image-upload-field";
import ChoiceOptionField from "./choice-option-field";
import { colors } from "@/lib/colors";

export default function StartChatForm({ className }: { className?: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  // Sample options with different colors
  const options: Option[] = [
    { id: "option1", label: "Option 1", color: colors[0] },
    { id: "option2", label: "Option 2", color: colors[1] },
    { id: "option3", label: "Option 3", color: colors[3] },
    { id: "option4", label: "Option 4", color: colors[5] },
    { id: "option5", label: "Option 5", color: colors[10] },
    { id: "option6", label: "Option 6", color: colors[12] },
  ];

  const handleRemoveImage = (id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const handleNext = () => {
    if (currentStep < 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", {
      images: images.map((img) => img.file.name),
      selectedOption,
    });

    // Reset form after submission
    alert("Form submitted successfully!");
    setImages([]);
    setSelectedOption("");
    setCurrentStep(0);
  };

  const isStepValid = () => {
    if (currentStep === 0) return images.length > 0;
    if (currentStep === 1) return selectedOption !== "";
    return false;
  };

  return (
    <form
      className={cn("w-full h-full flex flex-col", className)}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">Multi-Step Form</h1>
        <p className="text-sm text-muted-foreground">
          {currentStep === 0
            ? "Step 1: Upload up to 5 images"
            : "Step 2: Select an option"}
        </p>
      </div>

      <div className="flex-grow overflow-hidden flex flex-col py-4">
        <AnimatePresence mode="wait">
          {currentStep === 0 ? (
            <ImageUploadField
              images={images}
              setImages={setImages}
              handleRemoveImage={handleRemoveImage}
            />
          ) : (
            <ChoiceOptionField
              options={options}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          )}
        </AnimatePresence>
      </div>

      <FormNavigation
        currentStep={currentStep}
        totalSteps={2}
        isValid={isStepValid()}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </form>
  );
}

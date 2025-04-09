"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "./image-upload";
import ImagePreview from "./image-preview";
import OptionSelect from "./option-select";
import FormNavigation from "./form-navigation";
import type { ImageFile, Option } from "./types";

export default function StartChatForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  // Sample options with different colors
  const options: Option[] = [
    { id: "option1", label: "Option 1", color: "rose" },
    { id: "option2", label: "Option 2", color: "blue" },
    { id: "option3", label: "Option 3", color: "green" },
    { id: "option4", label: "Option 4", color: "amber" },
    { id: "option5", label: "Option 5", color: "purple" },
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
      className="w-full h-full flex flex-col"
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
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <ImagePreview images={images} onRemove={handleRemoveImage} />
              <ImageUpload
                images={images}
                onChange={setImages}
                maxImages={5}
                className={images.length > 0 ? "mt-auto" : "flex-grow"}
              />
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-grow"
            >
              <OptionSelect
                title="Select an option"
                options={options}
                value={selectedOption}
                onChange={setSelectedOption}
              />
            </motion.div>
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

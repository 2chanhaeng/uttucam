"use client";

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { ColorOption } from "@/lib/colors";
import { colorStyles } from "./option-colors";

interface OptionButtonProps {
  id: string;
  value: string;
  label: string;
  color?: ColorOption;
  onSelect: (value: string) => void;
}

export default function OptionButton({
  id,
  value,
  label,
  color = "red",
  onSelect,
}: OptionButtonProps) {
  const { bg, selectedBg, selectedBorder, selectedText } = colorStyles[color];

  // Handle click on the entire option area
  const handleOptionClick = () => {
    onSelect(value);
  };

  return (
    <div
      className={cn(
        "flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-colors",
        "hover:opacity-90",
        "data-[state=checked]:border-l-2",
        bg,
        selectedBg,
        selectedBorder
      )}
      onClick={handleOptionClick}
    >
      <RadioGroupItem value={value} id={id} className={selectedText} />
      <Label htmlFor={id} className="flex-1 cursor-pointer">
        {label}
      </Label>
    </div>
  );
}

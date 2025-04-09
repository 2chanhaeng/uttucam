"use client";

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { ColorOption } from "./types";

interface OptionButtonProps {
  id: string;
  value: string;
  label: string;
  color?: ColorOption;
  onSelect?: (value: string) => void;
}

// Color mapping for styling with background colors
const colorStyles: Record<
  ColorOption,
  {
    bg: string;
    bgSelected: string;
    border: string;
    text: string;
  }
> = {
  primary: {
    bg: "bg-primary/5",
    bgSelected: "bg-primary/10",
    border: "border-primary/30",
    text: "text-primary",
  },
  rose: {
    bg: "bg-rose-500/5",
    bgSelected: "bg-rose-500/10",
    border: "border-rose-500/30",
    text: "text-rose-500",
  },
  blue: {
    bg: "bg-blue-500/5",
    bgSelected: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-500",
  },
  green: {
    bg: "bg-green-500/5",
    bgSelected: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-500",
  },
  amber: {
    bg: "bg-amber-500/5",
    bgSelected: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-500",
  },
  purple: {
    bg: "bg-purple-500/5",
    bgSelected: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-500",
  },
  slate: {
    bg: "bg-slate-500/5",
    bgSelected: "bg-slate-500/10",
    border: "border-slate-500/30",
    text: "text-slate-500",
  },
};

export default function OptionButton({
  id,
  value,
  label,
  color = "primary",
  onSelect,
}: OptionButtonProps) {
  const styles = colorStyles[color];

  // Handle click on the entire option area
  const handleOptionClick = () => {
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-colors",
        styles.bg, // Apply background color
        "hover:opacity-90",
        "data-[state=checked]:border-2",
        "data-[state=checked]:" + styles.bgSelected,
        "data-[state=checked]:" + styles.border
      )}
      onClick={handleOptionClick}
    >
      <RadioGroupItem
        value={value}
        id={id}
        className={cn("data-[state=checked]:", styles.text)}
      />
      <Label htmlFor={id} className="flex-1 cursor-pointer">
        {label}
      </Label>
    </div>
  );
}

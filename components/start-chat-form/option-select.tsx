"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import OptionButton from "./option-button";
import type { Option } from "./types";

interface OptionSelectProps {
  title?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function OptionSelect({
  title = "Select an option",
  options,
  value,
  onChange,
}: OptionSelectProps) {
  return (
    <div className="space-y-4">
      <Label>{title}</Label>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
        {options.map((option) => (
          <OptionButton
            key={option.id}
            id={option.id}
            value={option.id}
            label={option.label}
            color={option.color}
            onSelect={onChange}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

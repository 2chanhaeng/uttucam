import type { ColorOption } from "@/lib/colors";

interface ColorOptionStyles {
  bg: `bg-${ColorOption}-500/50`;
  selectedBg: `data-[state=checked]:bg-${ColorOption}-500`;
  selectedBorder: `data-[state=checked]:border-${ColorOption}-500/30`;
  selectedText: `data-[state=checked]:text-${ColorOption}-500`;
}

export const colorStyles: Record<ColorOption, ColorOptionStyles> = {
  red: {
    bg: "bg-red-500/50",
    selectedBg: "data-[state=checked]:bg-red-500",
    selectedBorder: "data-[state=checked]:border-red-500/30",
    selectedText: "data-[state=checked]:text-red-500",
  },
  orange: {
    bg: "bg-orange-500/50",
    selectedBg: "data-[state=checked]:bg-orange-500",
    selectedBorder: "data-[state=checked]:border-orange-500/30",
    selectedText: "data-[state=checked]:text-orange-500",
  },
  amber: {
    bg: "bg-amber-500/50",
    selectedBg: "data-[state=checked]:bg-amber-500",
    selectedBorder: "data-[state=checked]:border-amber-500/30",
    selectedText: "data-[state=checked]:text-amber-500",
  },
  yellow: {
    bg: "bg-yellow-500/50",
    selectedBg: "data-[state=checked]:bg-yellow-500",
    selectedBorder: "data-[state=checked]:border-yellow-500/30",
    selectedText: "data-[state=checked]:text-yellow-500",
  },
  lime: {
    bg: "bg-lime-500/50",
    selectedBg: "data-[state=checked]:bg-lime-500",
    selectedBorder: "data-[state=checked]:border-lime-500/30",
    selectedText: "data-[state=checked]:text-lime-500",
  },
  green: {
    bg: "bg-green-500/50",
    selectedBg: "data-[state=checked]:bg-green-500",
    selectedBorder: "data-[state=checked]:border-green-500/30",
    selectedText: "data-[state=checked]:text-green-500",
  },
  emerald: {
    bg: "bg-emerald-500/50",
    selectedBg: "data-[state=checked]:bg-emerald-500",
    selectedBorder: "data-[state=checked]:border-emerald-500/30",
    selectedText: "data-[state=checked]:text-emerald-500",
  },
  teal: {
    bg: "bg-teal-500/50",
    selectedBg: "data-[state=checked]:bg-teal-500",
    selectedBorder: "data-[state=checked]:border-teal-500/30",
    selectedText: "data-[state=checked]:text-teal-500",
  },
  cyan: {
    bg: "bg-cyan-500/50",
    selectedBg: "data-[state=checked]:bg-cyan-500",
    selectedBorder: "data-[state=checked]:border-cyan-500/30",
    selectedText: "data-[state=checked]:text-cyan-500",
  },
  sky: {
    bg: "bg-sky-500/50",
    selectedBg: "data-[state=checked]:bg-sky-500",
    selectedBorder: "data-[state=checked]:border-sky-500/30",
    selectedText: "data-[state=checked]:text-sky-500",
  },
  blue: {
    bg: "bg-blue-500/50",
    selectedBg: "data-[state=checked]:bg-blue-500",
    selectedBorder: "data-[state=checked]:border-blue-500/30",
    selectedText: "data-[state=checked]:text-blue-500",
  },
  indigo: {
    bg: "bg-indigo-500/50",
    selectedBg: "data-[state=checked]:bg-indigo-500",
    selectedBorder: "data-[state=checked]:border-indigo-500/30",
    selectedText: "data-[state=checked]:text-indigo-500",
  },
  violet: {
    bg: "bg-violet-500/50",
    selectedBg: "data-[state=checked]:bg-violet-500",
    selectedBorder: "data-[state=checked]:border-violet-500/30",
    selectedText: "data-[state=checked]:text-violet-500",
  },
  purple: {
    bg: "bg-purple-500/50",
    selectedBg: "data-[state=checked]:bg-purple-500",
    selectedBorder: "data-[state=checked]:border-purple-500/30",
    selectedText: "data-[state=checked]:text-purple-500",
  },
  fuchsia: {
    bg: "bg-fuchsia-500/50",
    selectedBg: "data-[state=checked]:bg-fuchsia-500",
    selectedBorder: "data-[state=checked]:border-fuchsia-500/30",
    selectedText: "data-[state=checked]:text-fuchsia-500",
  },
  pink: {
    bg: "bg-pink-500/50",
    selectedBg: "data-[state=checked]:bg-pink-500",
    selectedBorder: "data-[state=checked]:border-pink-500/30",
    selectedText: "data-[state=checked]:text-pink-500",
  },
  rose: {
    bg: "bg-rose-500/50",
    selectedBg: "data-[state=checked]:bg-rose-500",
    selectedBorder: "data-[state=checked]:border-rose-500/30",
    selectedText: "data-[state=checked]:text-rose-500",
  },
};

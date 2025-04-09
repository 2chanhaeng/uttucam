// Define image file type
export interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

// Define option type with color support
export type ColorOption =
  | "primary"
  | "rose"
  | "blue"
  | "green"
  | "amber"
  | "purple"
  | "slate";

export interface Option {
  id: string;
  label: string;
  color?: ColorOption;
}

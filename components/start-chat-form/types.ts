import { ColorOption } from "@/lib/colors";

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

export interface Option {
  id: string;
  label: string;
  color?: ColorOption;
}

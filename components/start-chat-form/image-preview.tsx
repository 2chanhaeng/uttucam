"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { ImageFile } from "./types";

interface ImagePreviewProps {
  images: ImageFile[];
  onRemove: (id: string) => void;
}

export default function ImagePreview({ images, onRemove }: ImagePreviewProps) {
  if (images.length === 0) return null;

  return (
    <div className="flex-grow overflow-y-auto pr-2 mb-4">
      <div className="space-y-3">
        {images.map((image) => (
          <div key={image.id} className="relative rounded-md overflow-hidden">
            <img
              src={image.preview || "/placeholder.svg"}
              alt={`Preview ${image.file.name}`}
              className="w-full h-auto object-cover rounded-md"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 rounded-full"
              onClick={() => onRemove(image.id)}
              type="button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

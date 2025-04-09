"use client";

import { useRef, useEffect, useState } from "react";
import { ImagePlus, Upload, Clipboard } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { ImageFile } from "./types";

interface ImageUploadProps {
  images: ImageFile[];
  onChange: (newImages: ImageFile[]) => void;
  maxImages?: number;
  className?: string;
}

export default function ImageUpload({
  images,
  onChange,
  maxImages = 5,
  className = "",
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const [pasteSupported, setPasteSupported] = useState(true);

  // Check if clipboard API is supported
  useEffect(() => {
    setPasteSupported("clipboard" in navigator);
  }, []);

  // Process files (from input or drop)
  const processFiles = (files: FileList | null) => {
    if (!files?.length) return;

    const newFiles = Array.from(files);
    const totalImages = images.length + newFiles.length;

    // Limit to maxImages
    if (totalImages > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    const newImages = newFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    onChange([...images, ...newImages]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle manual paste button click
  const handlePasteButtonClick = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      let imageFound = false;

      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.startsWith("image/")) {
            const blob = await clipboardItem.getType(type);

            // Check if adding this image would exceed the limit
            if (images.length + 1 > maxImages) {
              alert(`You can only upload up to ${maxImages} images`);
              return;
            }

            const newImage = {
              id: crypto.randomUUID(),
              file: new File([blob], `pasted-image-${Date.now()}.png`, {
                type,
              }),
              preview: URL.createObjectURL(blob),
            };

            onChange([...images, newImage]);
            imageFound = true;
            break;
          }
        }
        if (imageFound) break;
      }

      if (!imageFound) {
        alert("No image found in clipboard");
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
      alert("Failed to access clipboard. Please check permissions.");
    }
  };

  // Handle clipboard paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const imageItems = Array.from(items).filter(
        (item) => item.type.indexOf("image") !== -1
      );
      if (imageItems.length === 0) return;

      // Check if adding these images would exceed the limit
      if (images.length + imageItems.length > maxImages) {
        alert(`You can only upload up to ${maxImages} images`);
        return;
      }

      const newImages: ImageFile[] = [];

      imageItems.forEach((item) => {
        const blob = item.getAsFile();
        if (!blob) return;

        newImages.push({
          id: crypto.randomUUID(),
          file: new File([blob], `pasted-image-${Date.now()}.png`, {
            type: blob.type,
          }),
          preview: URL.createObjectURL(blob),
        });
      });

      if (newImages.length > 0) {
        onChange([...images, ...newImages]);
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [images, onChange, maxImages]);

  // Handle drag and drop
  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      dropArea.classList.add("bg-muted");
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dropArea.classList.remove("bg-muted");
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dropArea.classList.remove("bg-muted");
      if (e.dataTransfer) processFiles(e.dataTransfer.files);
    };

    dropArea.addEventListener("dragover", handleDragOver);
    dropArea.addEventListener("dragenter", handleDragOver);
    dropArea.addEventListener("dragleave", handleDragLeave);
    dropArea.addEventListener("drop", handleDrop);

    return () => {
      dropArea.removeEventListener("dragover", handleDragOver);
      dropArea.removeEventListener("dragenter", handleDragOver);
      dropArea.removeEventListener("dragleave", handleDragLeave);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, [images, onChange, maxImages]);

  return (
    <div ref={dropAreaRef} className={`w-full ${className}`}>
      {images.length === 0 ? (
        <div className="space-y-4">
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG or GIF (MAX. {maxImages} images)
              </p>
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => processFiles(e.target.files)}
              ref={fileInputRef}
            />
          </Label>

          {pasteSupported && (
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handlePasteButtonClick}
            >
              <Clipboard className="w-4 h-4" />
              Paste from clipboard
            </Button>
          )}
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <p className="text-sm text-muted-foreground mb-2">
            You can also paste images from clipboard (Ctrl+V / Cmd+V) or drag &
            drop
          </p>
          <div className="flex flex-wrap gap-2">
            {images.length < maxImages && (
              <Label
                htmlFor="image-upload-more"
                className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50"
              >
                <div className="flex items-center justify-center">
                  <ImagePlus className="w-5 h-5 mr-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Add more</p>
                </div>
                <input
                  id="image-upload-more"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => processFiles(e.target.files)}
                  ref={fileInputRef}
                />
              </Label>
            )}

            {pasteSupported && (
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center gap-2 h-[52px]"
                onClick={handlePasteButtonClick}
              >
                <Clipboard className="w-4 h-4" />
                Paste
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

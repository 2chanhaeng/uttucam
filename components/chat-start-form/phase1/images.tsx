import { XIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

export default function Phase1Images({
  images,
  setImages,
}: {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}) {
  if (!images || images.length === 0) return null;

  return (
    <div className="flex-1 min-h-0 overflow-auto mb-4">
      <div className="space-y-2">
        {images.map((image, i) => (
          <div
            key={`chat-image-${i}`}
            className="relative rounded-md overflow-hidden"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              className="w-full h-auto object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => {
                setImages((prevFiles) =>
                  prevFiles.filter((_, index) => i !== index)
                );
              }}
              className="absolute top-2 right-2 h-6 w-6 rounded-full bg-transparent inline-flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

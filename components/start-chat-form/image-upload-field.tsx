import { motion } from "framer-motion";
import ImageUpload from "./image-upload";
import ImagePreview from "./image-preview";
import { ImageFile } from "./types";

export default function ImageUploadField({
  images,
  setImages,
  handleRemoveImage,
}: {
  images: ImageFile[];
  setImages: (images: ImageFile[]) => void;
  handleRemoveImage: (id: string) => void;
}) {
  return (
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
  );
}

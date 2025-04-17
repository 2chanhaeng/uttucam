import { useRef, type Dispatch, type SetStateAction } from "react";
import Phase1Images from "./images";
import Phase1ImageUpload from "./image-upload";
import { Button } from "@/components/ui/button";

export default function Phase1({
  images,
  setImages,
}: {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}) {
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const isShowSummary = images.length === 0;

  return (
    <section
      className="h-full flex flex-col justify-end pb-4 max-h-[calc(100%-62px)]"
      ref={dropAreaRef}
    >
      <Summary show={isShowSummary} />
      <Phase1Images images={images} setImages={setImages} />
      <Phase1ImageUpload
        images={images}
        setImages={setImages}
        maxImages={5}
        dropAreaRef={dropAreaRef}
      />
      <Button type="submit">Send</Button>
    </section>
  );
}

function Summary({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Uttucam</h1>
      <p className="text-gray-700 mb-4 px-4">
        Uttucam is a AI assistant that helps you write better messages in
        conversations.
        <br />
        You can upload a screenshot of a chat room, and Uttucam will provide you
        with examples of answers that would work well in that conversation.
        <br />
        Try it!
      </p>
    </div>
  );
}

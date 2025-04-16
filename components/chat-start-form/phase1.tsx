import { XIcon } from "lucide-react";

export default function Phase1({
  files,
  setFiles,
  fileInputRef,
}: {
  files?: FileList;
  setFiles: (files: FileList | undefined) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <>
      {files && files.length > 0 && (
        <div className="flex gap-2 overflow-x-scroll">
          {Array.from(files).map((file, index) => (
            <div key={index} className="relative">
              <img
                className="size-24 rounded-md"
                src={URL.createObjectURL(file)}
                alt={file.name}
              />
              <button
                type="button"
                onClick={() => {
                  // remove the file from the list
                  const dataTransfer = new DataTransfer();
                  Array.from(files)
                    .filter((_, i) => i !== index)
                    .forEach((file) => dataTransfer.items.add(file));
                  setFiles(
                    dataTransfer.files.length > 0
                      ? dataTransfer.files
                      : undefined
                  );
                }}
                className="ml-2 bg-background/60 rounded-full absolute top-1 right-1"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <label>
        📎
        <input
          type="file"
          onChange={(event) => {
            if (event.target.files) {
              setFiles(event.target.files);
            }
          }}
          multiple
          hidden
          ref={fileInputRef}
        />
      </label>
      <button type="submit" className="flex-shrink text-center content-center">
        Send
      </button>
    </>
  );
}

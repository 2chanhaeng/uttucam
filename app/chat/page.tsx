"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useState } from "react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {console.log(message) ?? ""}
          {message.experimental_attachments && (
            <div className="h-96 overflow-x-scroll">
              {message.experimental_attachments.map((attachment, i) =>
                attachment?.contentType?.startsWith("image/") ? (
                  <img
                    key={`${message.id}-${i}`}
                    src={attachment.url}
                    alt={attachment.name}
                    className="h-full rounded-lg"
                  />
                ) : (
                  <pre key={`${message.id}-${i}`}>
                    {JSON.stringify(attachment)}
                  </pre>
                )
              )}
            </div>
          )}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}
        </div>
      ))}

      <form
        className="fixed bottom-0 w-full max-w-md bg-background m-2 p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl z-10 flex flex-col gap-2"
        onSubmit={(event) => {
          handleSubmit(event, {
            experimental_attachments: files,
          });

          setFiles(undefined);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
      >
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
                  className="ml-2 bg-background/60 rounded-sm absolute top-1 right-1"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 justify-center">
          <input
            className="flex-grow"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <label className="flex-shrink text-center content-center">
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
        </div>
      </form>
    </div>
  );
}

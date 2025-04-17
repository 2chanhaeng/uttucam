"use client";

import { useChat } from "@ai-sdk/react";
import { FormEvent, useEffect, useState } from "react";
import { fileArrayToFileList, initialMessages } from "./lib";
import { AnswerOption } from "./types";
import Phase1 from "./phase1";
import Phase2 from "./phase2";
import Phase3 from "./phase3";
import Spinner from "@/components/spinner";

export default function ChatStartForm() {
  const {
    input,
    messages,
    setInput,
    handleSubmit,
    status,
    error,
    setMessages,
  } = useChat({
    initialMessages,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<AnswerOption[]>([]);
  const [phase, setPhase] = useState(1);
  const [advice, setAdvice] = useState("");

  const handlePhase1 = (event: FormEvent) => {
    // Phase 1: send the chat images
    if (files) {
      console.log("Phase 1", files);
      const experimental_attachments = fileArrayToFileList(files);
      handleSubmit(event, {
        experimental_attachments,
        allowEmptySubmit: true,
      });
      setPhase(1.5);
    } else {
      event.preventDefault();
      // throw an alert if no images
      // TODO: show toast
      alert("Please attach chat images");
      return;
    }
  };

  useEffect(() => {
    // # Phase 1.5: wait for the assistant to send the JSON
    if (phase !== 1.5) return;
    // After Phase 1, the assistant will send a JSON with options
    // extract the last message from the assistant
    // and parse the JSON from it, set the options state
    const lastMessage = messages.at(-1);
    if (lastMessage && lastMessage.role === "assistant") {
      console.log("Last message:", lastMessage);
      const json = lastMessage.content.match(/\{[^\}]*\}/gm) ?? [];
      if (status === "ready" && !json) {
        // TODO: show toast
        alert("Something went wrong. Please try again.");
        setPhase(1);
        return;
      }
      const newOptions: AnswerOption[] = json
        .map((item) => {
          try {
            return JSON.parse(item);
          } catch {
            console.error("JSON parsing error:", json);
            return null;
          }
        })
        .filter((item) => item !== null);

      setOptions(newOptions);
      if (status === "ready") {
        setPhase(2);
      }
    }
  }, [phase, options, status, messages]);

  const handlePhase2 = (event: FormEvent) => {
    // Phase 2: send the selected option
    console.log({ Phase: "2.5", input });
    if (input !== "") {
      handleSubmit(event);
      setPhase(2.5);
    } else {
      event.preventDefault();
      console.log("No input:", { input });
    }
  };

  useEffect(() => {
    // # Phase 3: show the advice
    if (phase <= 2 || messages.length < 5) return;
    const lastMessage = messages.at(-1);
    if (!lastMessage || lastMessage.role !== "assistant") return;
    if (status === "streaming") {
      setAdvice(lastMessage.content);
    } else if (status === "ready") {
      console.log("Last message:", lastMessage);
      setAdvice(lastMessage.content);
      setPhase(3);
    }
  }, [phase, status, messages]);

  useEffect(() => {
    console.log("Messages:", messages);
  }, [messages]);

  useEffect(() => {
    if (error) {
      console.error(error);
      console.log(error);
      setMessages((prev) => [...prev.toSpliced(0, -1)]);
      setPhase((num) => num - 0.5);
    }
  }, [error, setMessages]);

  return (
    <form
      className="flex flex-col items-center justify-center w-full h-full max-w-lg p-4"
      onSubmit={(event) => {
        console.log("Form submitted");
        if (phase === 1) handlePhase1(event);
        else if (phase === 2) handlePhase2(event);
      }}
    >
      {phase <= 1 ? (
        <Phase1 images={files} setImages={setFiles} />
      ) : phase <= 2 ? (
        <Phase2 options={options} setInput={setInput} />
      ) : (
        <Phase3 advice={advice} />
      )}
      <SpinnerWrapper status={status} />
      {status === "error" && (
        <div className="text-red-500">
          {error?.message || "An error occurred. Please try again."}
        </div>
      )}
    </form>
  );
}

function SpinnerWrapper({ status }: { status: string }) {
  if (status !== "streaming" && status !== "submitted") return null;
  return <Spinner className="m-4 size-24" />;
}

"use client";

import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { initialMessages } from "./lib";
import { AnswerOption } from "./types";
import Phase1 from "./phase1";
import Phase2 from "./phase2";
import Phase3 from "./phase3";

export default function ChatStartForm() {
  const { input, messages, setInput, handleSubmit, status } = useChat({
    initialMessages,
  });
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [options, setOptions] = useState<AnswerOption[]>([]);
  const [phase, setPhase] = useState(1);
  const [advice, setAdvice] = useState("");

  const handlePhase1 = (event: FormEvent) => {
    // Phase 1: send the chat images
    if (files) {
      console.log("Phase 1", files);
      handleSubmit(event, {
        experimental_attachments: files,
        allowEmptySubmit: true,
      });
      setPhase(1.5);
      // reset the files
      setFiles(undefined);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
      const json = lastMessage.content.match(/\[[^\]]*\]/gm);
      if (status === "ready" && !json) {
        console.error("No JSON found in: ", lastMessage.content);
        // TODO: show toast
      }
      try {
        const newOptions = JSON.parse(json ? json[0] : "") as AnswerOption[];
        setOptions(newOptions);
        setPhase(2);
      } catch {
        console.error("JSON parsing error:", json);
        // TODO: show toast
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

  return (
    <form
      onSubmit={(event) => {
        console.log("Form submitted");
        if (phase === 1) handlePhase1(event);
        else if (phase === 2) handlePhase2(event);
      }}
    >
      <span
        className={cn({
          "bg-yellow-400": status === "submitted",
          "bg-blue-500": status === "streaming",
          "bg-teal-500": status === "ready",
          "bg-red-500 text-white": status === "error",
        })}
      >
        {status}
      </span>
      {phase === 1 ? (
        <Phase1 files={files} setFiles={setFiles} fileInputRef={fileInputRef} />
      ) : phase === 2 ? (
        <Phase2 options={options} setInput={setInput} />
      ) : (
        <Phase3 advice={advice} />
      )}
    </form>
  );
}

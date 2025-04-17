"use client";

import { Button } from "../ui/button";
import { getBgColor } from "./lib";
import { AnswerOption } from "./types";

export default function Phase2({
  options,
  setInput,
}: {
  options: AnswerOption[];
  setInput: (input: string) => void;
}) {
  return (
    <div className="grid gap-2 grid-cols-2 auto-rows-max">
      {options.map(({ tone, content, color }, index) => (
        <Button
          key={`${tone}-${index}`}
          onClick={async (event) => {
            event.preventDefault();
            // event.currentTarget is null after await
            // so form should be declared before await
            const form = event.currentTarget?.form;
            if (form) {
              // without await, the form will be
              // submitted before setInput is called
              await setInput(tone);
              form.requestSubmit();
            }
          }}
          type="button"
          className={
            getBgColor(color) +
            " text-foreground hover:scale-105 focus:scale-105 flex flex-col h-auto p-2 whitespace-normal"
          }
        >
          <h3 className="font-bold text-xl">{tone}</h3>
          <p className="text-base block w-full">{content}</p>
        </Button>
      ))}
    </div>
  );
}

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
    <div className="flex flex-col gap-2">
      {options.map(({ tone, content, color }, index) => (
        <button
          key={`${tone}-${index}`}
          onClick={async (event) => {
            event.preventDefault();
            console.log("event.currentTarget", event.currentTarget);
            // event.currentTarget is null after await
            // so form should be declared before await
            const form = event.currentTarget?.form;
            console.log("form", form);
            if (form) {
              // without await, the form will be
              // submitted before setInput is called
              await setInput(tone);
              console.log("Input set to:", tone);
              form.requestSubmit();
            }
          }}
          type="button"
          className={getBgColor(color)}
        >
          <span className="font-semibold text-lg">{tone}</span>
          <br />
          <span className="text-sm">{content}</span>
        </button>
      ))}
    </div>
  );
}

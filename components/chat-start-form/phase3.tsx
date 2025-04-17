import ReactMarkdown from "react-markdown";

export default function Phase3({ advice }: { advice: string }) {
  return (
    <section className="flex flex-col gap-2 p-4 items-start">
      <ReactMarkdown>{advice}</ReactMarkdown>
    </section>
  );
}

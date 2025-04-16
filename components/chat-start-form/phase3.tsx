import ReactMarkdown from "react-markdown";

export default function Phase3({ advice }: { advice: string }) {
  return <ReactMarkdown>{advice}</ReactMarkdown>;
}

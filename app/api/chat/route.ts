import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages /* , modelId */ } = await req.json();
  const modelId = "o4-mini-2025-04-16";

  const result = streamText({
    model: openai(modelId),
    messages,
  });

  return result.toDataStreamResponse();
}

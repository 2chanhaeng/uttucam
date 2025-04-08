import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages /* , modelId */ } = await req.json();
  const modelId = "gemini-2.5-pro-exp-03-25";

  const result = streamText({
    model: google(modelId),
    messages,
  });

  return result.toDataStreamResponse();
}

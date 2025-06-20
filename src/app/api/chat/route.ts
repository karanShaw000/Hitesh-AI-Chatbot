import { getHiteshSystemPrompt } from "@/prompts/hitesh";
import { NextResponse } from "next/server";
import OpenAI, { OpenAIError } from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

export async function POST(req: Request) {
  const chats = await req.json() as ChatCompletionMessageParam[];

  if (!chats || chats.length === 0) return NextResponse.json({ message: { role: "assistant", content: "No message found" } }, { status: 400 });

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string
  })

  try {
    const res = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: getHiteshSystemPrompt() },
        ...chats,
      ],
    });

    const message = res.choices[0].message;
    if (message.content) {
      return NextResponse.json({ message }, { status: 200 })
    } else {
      return NextResponse.json({ message: { role: "assistant", content: "Maaf kara chai thandi ho gaee hai" } }, { status: 500 })
    }
  } catch (error) {
    if (error instanceof OpenAIError) {
      return NextResponse.json({ message: { role: "assistant", content: error.message } }, { status: 500 })
    }
    return NextResponse.json({ message: { role: "assistant", content: "Something went wrong!!!" } }, { status: 500 })
  }
}

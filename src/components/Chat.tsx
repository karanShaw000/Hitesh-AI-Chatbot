"use client"

import { FormEvent, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { ArrowUpIcon } from "lucide-react"
import { MessageType } from "@/lib/types"

export function Chat() {

  const [messages, setMessages] = useState<MessageType[]>([
  ])
  const [input, setInput] = useState("")
  const inputLength = input.trim().length
  const [isPending, setIsPending] = useState(false)
  const [isError, setIsError] = useState(false)

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault()
    if (inputLength === 0) return
    setMessages([
      ...messages,
      { role: "user", content: input, },
    ])

    // setIsError(false)
    setIsPending(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          [...messages, { role: "user", content: input, },]
        ),
      });

      const data = await res.json();

      if (res.ok && data?.message?.content) {
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: data.message.content,
          },
        ]);
      } else {
        setIsError(true)
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: data.message.content,
          },
        ]);
      }

    } catch (error) {
      console.error(error)
      alert("Something went wrong when calling hitesh maybe network problem")
    } finally {
      setInput("")
      setIsPending(false)
    }
  }

  return (
    <>
      <Card className="h-[700px] w-3xl mx-auto flex flex-col justify-between">
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center gap-4">
            <Avatar className="border">
              <AvatarImage src="/hitesh.png" alt="Image" />
              <AvatarFallback>H</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm leading-none font-medium">Hitesh Chaudhary</p>
              <p className="text-muted-foreground text-xs">Drinking a cup of chai</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user" && "bg-primary text-primary-foreground ml-auto",
                  message.role === "assistant" && "bg-muted",
                )}
              >
                {message.content}
              </div>
            ))}

            {isError && <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-destructive text-primary-foreground mx-auto">{`${messages.length > 1 && messages[messages.length - 1].role === "assistant" ? messages[messages.length - 1].content : "Something went wrong"}`}</div>}
            {isPending && <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">Loading...</div>}
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={onSubmitHandler}
            className="relative w-full"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1 pr-10"
              autoComplete="off"
              value={input}
              disabled={isPending}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2 rounded-full"
              disabled={inputLength === 0 || isPending}
            >
              <ArrowUpIcon className="size-3.5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  )
}

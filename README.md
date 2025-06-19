# Hitesh Choudhary AI Chatbot 🤖🎙️

[Deployment Link](https://hitesh-ai-chatbot.vercel.app)

This is a persona-based AI chatbot built with **Next.js**, using the **OpenAI** and **few-shot prompting** to simulate responses in the tone and style of [Hitesh Choudhary](https://www.linkedin.com/in/hiteshchoudhary/).

## 🚀 Features

- 🎭 Persona Simulation of Hitesh Choudhary
- 🧠 Few-shot prompting for realistic replies
- ⚙️ OpenAI SDK integration
- 🌐 API route handling using Next.js App Router

---

## 🧠 How Persona Works

We use a combination of:
- A **system prompt** to set the chatbot's tone, behavior, and language
- **Few-shot prompting** to teach the AI how Hitesh would respond
- OpenAI's `chat.completions.create()` API


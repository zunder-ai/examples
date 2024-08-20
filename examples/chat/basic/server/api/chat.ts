import OpenAI from "openai";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const {
    openaiApiKey,
    openaiModel,
  } = useRuntimeConfig()

  const openai = new OpenAI({ apiKey: openaiApiKey })

  try {
    const { messages } = await readBody(event);

    // Ensure messages array is provided
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Invalid messages format");
    }

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: openaiModel,
      messages: messages.map((msg) => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.content,
      }))
    });

    // Extract the response
    const aiResponse = completion.choices[0].message.content;

    return { response: aiResponse };
  } catch (error) {
    console.error("Error in chat API:", error);
    return { error: "An error occurred while processing your request." };
  }
});

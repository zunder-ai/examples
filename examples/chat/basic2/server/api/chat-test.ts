import { defineEventHandler } from "h3";

const simulatedResponses = [
  "Hello! How can I assist you today?",
  "That's an interesting question. Let me think about it for a moment.",
  "I'm sorry, I don't have enough information to answer that accurately. Could you provide more details?",
  "Based on what you've told me, I would suggest the following...",
  "That's a great point! Have you also considered...",
  "I'm afraid I don't have a definitive answer for that, but here's what I know...",
  "Let me summarize what we've discussed so far...",
  "Is there anything else you'd like to know about this topic?",
  "That's all the information I have on this subject. Is there something else I can help you with?",
  "I'm an AI assistant, so I don't have personal experiences, but I can provide information on that topic if you'd like.",
];

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const message = body.message;

  // Simulate a delay (between 1 and 3 seconds)
  const delay = Math.floor(Math.random() * 1000) + 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Select a random response
  const responseIndex = Math.floor(Math.random() * simulatedResponses.length);
  const responseContent = simulatedResponses[responseIndex];

  // Return a simulated response
  return {
    isUser: false,
    avatar: "AI",
    content: `${responseContent}\n\nYou said: "${message}"`,
  };
});

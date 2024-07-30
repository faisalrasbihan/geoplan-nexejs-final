// utils/vercel-ai.js
import { createClient } from '@vercel/ai';

const vercelAIClient = createClient({
  apiKey: process.env.NEXT_PUBLIC_VERCEL_AI_API_KEY, // Ensure you have set this environment variable
});

export const getChatGPTResponse = async (input) => {
  const response = await vercelAIClient.createCompletion({
    prompt: input,
    max_tokens: 150,
  });
  return response.choices[0].text.trim();
};

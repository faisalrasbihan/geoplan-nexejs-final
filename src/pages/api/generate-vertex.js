// src/pages/api/generate-vertex.js

import { generateText, streamText } from 'ai';
import { createVertex } from '@ai-sdk/google-vertex';

const systemPrompt = `
You are a helpful assistant. Please generate a response to the user query in markdown format.
`;

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

console.log('Service Account:', serviceAccount);

const vertexClient = createVertex({
  projectId: serviceAccount.project_id,
  location: "global",
  engineId: "geoplan_1720920197790",
  credentials: serviceAccount,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    console.log('API key : ' , process.ENV.GOOGLE_APPLICATION_CREDENTIALS);
    const { text } = await generateText({
      model: vertexClient('gemini-1.5-pro'),
      system: systemPrompt,
      prompt: prompt,
    });

    return res.status(200).json({ text });
  } catch (error) {
    console.error('Error generating text:', error);
    return res.status(500).json({ message: 'There was an error generating the response.' });
  }
}

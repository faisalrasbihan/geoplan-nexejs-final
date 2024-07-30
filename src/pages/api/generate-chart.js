// src/pages/api/generate-chart.jsx

import { generateJson } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';

const systemPrompt = `
Generate 5-8 randomized JSON responses in the following format:

Each JSON should include:
- A type key with one of the following values: ['line', 'treemap', 'bar', 'pie'].
- A title key with a random title, for example, "Pengeluaran".
- A value key with a random currency value, for example, "Rp. 17687.47".
- An improvement key with a random percentage improvement, for example, "63.6% from last month".
- A data key containing an array of 12 objects, each with a name key representing the months (Jan, Feb, Mar, etc.) and a value key with a random integer value.

Example format:

{
  "type": "line",
  "title": "Pengeluaran",
  "value": "Rp. 17687.47",
  "improvement": "63.6% from last month",
  "data": [
    {"name": "Jan", "value": 4914},
    {"name": "Feb", "value": 7550},
    {"name": "Mar", "value": 6772},
    {"name": "Apr", "value": 6482},
    {"name": "May", "value": 9355},
    {"name": "Jun", "value": 7345},
    {"name": "Jul", "value": 9730},
    {"name": "Aug", "value": 5752},
    {"name": "Sep", "value": 3881},
    {"name": "Oct", "value": 2626},
    {"name": "Nov", "value": 5933},
    {"name": "Dec", "value": 7568}
  ]
}
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    const { json } = await generateJson({
      model: vertex('gemini-1.5-pro', {
        apiKey: process.env.GOOGLE_API_KEY,
        project: process.env.GOOGLE_VERTEX_PROJECT,
      }),
      system: systemPrompt,
      prompt: prompt,
    });
    console.log(json);
    return res.status(200).json({ json });
  } catch (error) {
    console.error('Error generating chart data:', error);
    return res.status(500).json({ message: 'There was an error generating the chart data.' });
  }
}

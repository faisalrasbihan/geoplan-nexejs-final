// src/pages/api/chat-response.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { question } = req.body;
  
    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }
  
    try {
      const response = await fetch('https://asia-southeast1-ai4indonesia.cloudfunctions.net/geoplan-rag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
  
      const text = await response.text(); // Read the response as text
  
      return res.status(200).json({ summary: text });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'There was an error processing your request.' });
    }
  }
  
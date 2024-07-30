// src/pages/api/generate-json.js

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const kalimantanProvinces = [
  'Kalimantan Barat',
  'Kalimantan Tengah',
  'Kalimantan Selatan',
  'Kalimantan Timur',
  'Kalimantan Utara'
];

export const kalimantanKabupaten = {
  'Kalimantan Barat': [
    'Sambas',
    'Bengkayang',
    'Landak',
    'Mempawah',
    'Sanggau',
    'Ketapang',
    'Sintang',
    'Kapuas Hulu',
    'Sekadau',
    'Melawi',
    'Kayong Utara',
    'Kubu Raya',
    'Kota Pontianak',
    'Kota Singkawang'
  ],
  'Kalimantan Tengah': [
    'Kotawaringin Barat',
    'Kotawaringin Timur',
    'Kapuas',
    'Barito Selatan',
    'Barito Utara',
    'Lamandau',
    'Seruyan',
    'Katingan',
    'Gunung Mas',
    'Barito Timur',
    'Murung Raya',
    'Kota Palangkaraya',
    'Sukamara',
    'Pulang Pisau'
  ],
  'Kalimantan Selatan': [
    'Tanah Laut',
    'Kotabaru',
    'Banjar',
    'Barito Kuala',
    'Tapin',
    'Hulu Sungai Selatan',
    'Hulu Sungai Tengah',
    'Hulu Sungai Utara',
    'Tabalong',
    'Balangan',
    'Kota Banjarmasin',
    'Kota Banjarbaru',
    'Tanah Bumbu'
  ],
  'Kalimantan Timur': [
    'Paser',
    'Kutai Barat',
    'Kutai Kartanegara',
    'Penajam Paser Utara',
    'Kutai Timur',
    'Berau',
    'Mahakam Ulu',
    'Kota Balikpapan',
    'Kota Samarinda',
    'Kota Bontang'
  ],
  'Kalimantan Utara': [
    'Malinau',
    'Bulungan',
    'Tana Tidung',
    'Nunukan',
    'Kota Tarakan'
  ]
};

export const years = [2023, 2022];

const systemPrompt = `
When generating a response to a user query, extract the Province name, Kabupaten name, and Year (default to 2023 if not provided) from the input prompt. Ensure that the Province name is one of the Kalimantan provinces and the Kabupaten name is one of the respective kabupaten for the extracted province. If not provided or invalid, default to 'Kalimantan Timur' for Province and 'Sambas' for Kabupaten.

The JSON format should be:
{
  "Province": "<extracted_province>",
  "Kabupaten": "<extracted_kabupaten>",
  "Year": <extracted_year>
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
    const { text } = await generateText({
      model: openai('gpt-4-turbo', {
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      }),
      system: systemPrompt,
      prompt: prompt,
    });

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(text);
    } catch (e) {
      throw new Error('Failed to parse JSON response from AI');
    }

    const province = kalimantanProvinces.includes(jsonResponse.Province)
      ? jsonResponse.Province
      : 'Kalimantan Timur';
    
    const kabupaten = kalimantanKabupaten[province].includes(jsonResponse.Kabupaten)
      ? jsonResponse.Kabupaten
      : 'Sambas';
    
    const year = years.includes(jsonResponse.Year)
      ? jsonResponse.Year
      : 2023;

    return res.status(200).json({ Province: province, Kabupaten: kabupaten, Year: year });
  } catch (error) {
    console.error('Error generating JSON:', error);
    return res.status(500).json({ message: 'There was an error generating the response.' });
  }
}

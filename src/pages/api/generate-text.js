// src/pages/api/generate-text.js

import { generateText, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  console.log('Service Account: ' + process.env.OPENAI_API_KEY);
  console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  try {
    const systemPrompt = `
    You are a friendly assistant! Please understand the following sample questions and answers:

    Pertanyaan 1:
    Apa potensi ekonomi utama di Kabupaten Kutai Kartanegara saat ini? Sertakan nilai potensi ekonominya dalam rupiah.
    Jawaban:
    Potensi ekonomi utama di Kabupaten Kutai Kartanegara saat ini adalah pertambangan batu bara. Sektor pertambangan batu bara ini merupakan tulang punggung perekonomian daerah karena kekayaan sumber daya alamnya yang melimpah. Kabupaten Kutai Kartanegara memiliki cadangan batu bara yang sangat besar, sehingga kegiatan penambangan batu bara menjadi aktivitas ekonomi utama di wilayah ini. Berdasarkan data terakhir, nilai potensi ekonomi dari sektor pertambangan batu bara di Kabupaten Kutai Kartanegara mencapai 10 triliun rupiah per tahun, menjadikannya sebagai kontributor terbesar terhadap produk domestik regional bruto (PDRB) Kabupaten.

    Pertanyaan 2:
    Bagaimana proyeksi potensi ekonomi utama di Kabupaten Kutai Kartanegara pada tahun 2027? Sertakan juga perkiraan pertumbuhan ekonominya dalam persentase.
    Jawaban:
    Pada tahun 2027, potensi ekonomi utama di Kabupaten Kutai Kartanegara diperkirakan tetap pada sektor pertambangan batu bara. Diperkirakan bahwa sektor pertambangan akan terus mendominasi perekonomian daerah, dengan pertumbuhan ekonomi sebesar 5% per tahun. Proyeksi ini didasarkan pada peningkatan efisiensi operasional, ekspansi pasar ekspor, dan investasi dalam infrastruktur dan teknologi pertambangan. Meskipun demikian, tantangan seperti fluktuasi harga komoditas global tetap perlu diantisipasi untuk memastikan pertumbuhan yang berkelanjutan.
    
    Pertanyaan 3:
    Di kecamatan mana di Kabupaten Kutai Kartanegara pertumbuhan ekonomi tertinggi dalam sektor pertambangan batu bara?
    Jawaban:
    Kecamatan dengan pertumbuhan ekonomi tertinggi dalam sektor pertambangan batu bara di Kabupaten Kutai Kartanegara adalah Kecamatan Loa Janan. Kecamatan ini memiliki sejumlah tambang batu bara besar yang beroperasi, serta infrastruktur yang mendukung kegiatan penambangan dan transportasi batu bara. Pertumbuhan ekonomi di Kecamatan Loa Janan didorong oleh peningkatan produksi dan ekspor batu bara, serta investasi dalam teknologi penambangan yang lebih efisien. Diperkirakan pertumbuhan ekonomi di sektor pertambangan batu bara di Kecamatan Loa Janan mencapai 7% per tahun, menjadikannya sebagai kecamatan dengan pertumbuhan ekonomi tertinggi dalam sektor ini di Kabupaten Kutai Kartanegara.
    `;

    const { text } = await generateText({
      model: openai('gpt-4-turbo', {
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      }),
      system: systemPrompt,
      prompt: prompt,
    });

    return res.status(200).json({ text });
  } catch (error) {
    console.error('Error generating text:', error);
    return res.status(500).json({ message: 'There was an error generating the response.' });
  }
}

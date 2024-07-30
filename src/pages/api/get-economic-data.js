// pages/api/get-economic-data.js
import { BigQuery } from '@google-cloud/bigquery';
import path from 'path';
import { readFileSync } from 'fs';

const serviceAccountPath = path.join(process.cwd(), 'ai4indonesia-db15de025795.json');
const serviceAccountKey = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

const bigquery = new BigQuery({
  credentials: serviceAccountKey,
  projectId: serviceAccountKey.project_id,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { province, kabupaten } = req.body;

  if (!province || !kabupaten) {
    return res.status(400).json({ message: 'Province and Kabupaten are required' });
  }

  const query = `
    SELECT 
      prov_name,
      kab_name,
      SUM(pred_2023) as pred_2023,
      SUM(pred_2024) as pred_2024,
      SUM(pred_2025) as pred_2025,
      SUM(pred_2026) as pred_2026,
      SUM(pred_2027) as pred_2027,
      SUM(pred_2028) as pred_2028
    FROM \`ai4indonesia.geoplan_dev.ai4_data_pinjaman_kec_rank_v3\`
    WHERE LOWER(prov_name) = LOWER(@province)
      AND LOWER(kab_name) = LOWER(@kabupaten)
      AND jenis_kpi = 'Konstruksi'
    GROUP BY prov_name, kab_name
  `;

  const options = {
    query: query,
    params: { province, kabupaten },
    location: 'asia-southeast2',
  };

  try {
    const [rows] = await bigquery.query(options);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error querying BigQuery:', error);
    res.status(500).json({ message: 'Error querying BigQuery', error: error.message });
  }
}

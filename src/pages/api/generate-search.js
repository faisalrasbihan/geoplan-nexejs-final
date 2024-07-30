// src/pages/api/generate-search.js

import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import { SearchServiceClient } from '@google-cloud/discoveryengine';

dotenv.config();

const projectId = process.env.GOOGLE_VERTEX_PROJECT || 'ai4indonesia';
const location = process.env.GOOGLE_VERTEX_LOCATION || 'global';
const credentialsPath = path.join(process.cwd(), 'ai4indonesia-db15de025795.json');

let credentials;

async function loadCredentials() {
  if (!credentials) {
    const fileContents = await fs.readFile(credentialsPath, 'utf8');
    credentials = JSON.parse(fileContents);
  }
  return credentials;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { prompt, preamble } = req.body;

  if (!prompt || !preamble) {
    return res.status(400).json({ message: 'Prompt and preamble are required' });
  }

  console.log('Service Account: ' + process.env.GOOGLE_VERTEX_PROJECT);
  console.log(credentialsPath);

  try {
    const creds = await loadCredentials();

    const client = new SearchServiceClient({
      credentials: creds,
      clientOptions: location !== 'global' ? { apiEndpoint: `${location}-discoveryengine.googleapis.com` } : undefined,
    });

    const contentSearchSpec = {
      summarySpec: {
        summaryResultCount: 10,
        includeCitations: false,
        ignoreAdversarialQuery: true,
        ignoreNonSummarySeekingQuery: true,
        modelPromptSpec: { preamble: preamble },
        modelSpec: { version: 'stable' },
      },
    };

    const request = {
      servingConfig: `projects/${projectId}/locations/${location}/collections/default_collection/engines/geoplan_1720920197790/servingConfigs/default_config`,
      query: prompt,
      pageSize: 10,
      contentSearchSpec: contentSearchSpec,
      queryExpansionSpec: {
        condition: 'AUTO',
      },
      spellCorrectionSpec: {
        mode: 'AUTO',
      },
    };

    const IResponseParams = {
      ISearchResult: 0,
      ISearchRequest: 1,
      ISearchResponse: 2,
    };

    const response = await client.search(request);
    const results = response[IResponseParams.ISearchResponse].results;

    for (const result of results) {
      console.log(result);
    }
    console.log('Summary :', response.summary)
    console.log('Full API Response:', JSON.stringify(response, null, 2)); // Detailed debugging log
    // console.log('SUmmary Text :', response.summary.summaryText)
    console.log('API Response:', response); // Debugging log

    if (!response.results) {
      throw new Error('No results found in the response.');
    }

    const summaryText = response.results.map(result => result.summaryText).join('\n');

    return res.status(200).json({ text: summaryText });
  } catch (error) {
    console.error('Error generating text:', error);
    return res.status(500).json({ message: 'There was an error generating the response.' });
  }
}

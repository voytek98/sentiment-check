import { HFPrediction } from '@shared/types';

export type HFResponse = HFPrediction[];

export async function analyzeWithHF(text: string): Promise<HFPrediction> {
  const res = await fetch(
    'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    },
  );

  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error('Unexpected response from Hugging Face');
  }

  const predictions: HFResponse = data[0];

  const best = predictions.reduce((max, curr) => (curr.score > max.score ? curr : max));

  return {
    label: best.label,
    score: best.score,
  };
}

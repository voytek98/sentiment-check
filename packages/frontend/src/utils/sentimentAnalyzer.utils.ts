import { ResultStatusType } from 'antd/es/result';
import { SentimentResult } from '../gql/graphql';
import { SentimentLabel } from '@shared/types';

const sentimentClassification = {
  [SentimentLabel.POSITIVE]: {
    0.9: {
      label: 'Extremely Positive',
      description: 'The text conveys a very strong positive sentiment.',
      tip: 'To maintain this level of positivity, continue using affirmative language and focus on strengths and opportunities.',
    },
    0.8: {
      label: 'Very Positive',
      description: 'The text expresses a strong positive sentiment.',
      tip: 'To keep this positive sentiment, consider emphasizing positive aspects and using affirmative language.',
    },
    0.6: {
      label: 'Positive',
      description: 'The text conveys a positive sentiment.',
      tip: 'To enhance positivity, try to highlight benefits and positive aspects more prominently.',
    },
  },
  [SentimentLabel.NEGATIVE]: {
    0.9: {
      label: 'Extremely Negative',
      description: 'The text conveys a very strong negative sentiment.',
      tip: 'To reduce negativity, consider using more constructive language and focusing on solutions rather than problems.',
    },
    0.8: {
      label: 'Very Negative',
      description: 'The text expresses a strong negative sentiment.',
      tip: 'To improve sentiment, consider balancing criticism with positive observations and focusing on solutions.',
    },
    0.6: {
      label: 'Negative',
      description: 'The text conveys a negative sentiment.',
      tip: 'To improve sentiment, consider using more constructive language and focusing on solutions rather than problems.',
    },
  },
} as const;

const isSentimentLabel = (label: SentimentResult['label']): label is SentimentLabel => {
  return Object.values(SentimentLabel).includes(label as SentimentLabel);
};

const getStatus = (label: SentimentResult['label'], score: SentimentResult['score']): ResultStatusType => {
  if (label === SentimentLabel.POSITIVE) return score >= 0.6 ? 'success' : 'warning';
  if (label === SentimentLabel.NEGATIVE) return score >= 0.6 ? 'error' : 'warning';
  return 'info';
};

const getSentimentDetails = (label: SentimentResult['label'], score: SentimentResult['score']) => {
  if (!isSentimentLabel(label)) {
    throw new Error(`Invalid sentiment label: ${label}`);
  }

  const classification = sentimentClassification[label];
  const thresholds = Object.keys(classification)
    .map(Number)
    .sort((a, b) => b - a);

  for (const threshold of thresholds) {
    if (score >= threshold) {
      return classification[threshold as keyof typeof classification];
    }
  }

  return {
    label: 'Neutral',
    description: 'The sentiment is relatively neutral.',
    tip: 'Consider using more expressive language to convey a clearer sentiment.',
  };
};

export const analyzeSentimentResult = (result: SentimentResult) => {
  if (!isSentimentLabel(result.label)) {
    throw new Error(`Invalid sentiment label: ${result.label}`);
  }

  const { label, description, tip } = getSentimentDetails(result.label, result.score);
  const status = getStatus(result.label, result.score);

  return { label, description, tip, status };
};

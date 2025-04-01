export enum SentimentLabel {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
}

export type HFPrediction = {
  label: SentimentLabel;
  score: number;
};

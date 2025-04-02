import { describe, it, expect } from 'vitest';
import { SentimentLabel } from '@shared/types';
import { analyzeSentimentResult, sentimentClassification, neutralClassification } from './sentimentAnalyzer.utils';

describe('sentimentAnalyzer utils', () => {
  describe('analyzeSentimentResult', () => {
    it('should handle extremely positive sentiment', () => {
      const result = analyzeSentimentResult({
        label: SentimentLabel.POSITIVE,
        score: 0.95,
      });

      const classification = {
        ...sentimentClassification[SentimentLabel.POSITIVE][0.9],
        status: 'success',
      };

      expect(result).toEqual(classification);
    });

    it('should handle very positive sentiment', () => {
      const result = analyzeSentimentResult({
        label: SentimentLabel.POSITIVE,
        score: 0.85,
      });

      const classification = {
        ...sentimentClassification[SentimentLabel.POSITIVE][0.8],
        status: 'success',
      };

      expect(result).toEqual(classification);
    });

    it('should handle positive sentiment', () => {
      const result = analyzeSentimentResult({
        label: SentimentLabel.POSITIVE,
        score: 0.7,
      });

      const classification = {
        ...sentimentClassification[SentimentLabel.POSITIVE][0.6],
        status: 'warning',
      };

      expect(result).toEqual(classification);
    });

    it('should handle extremely negative sentiment', () => {
      const result = analyzeSentimentResult({
        label: SentimentLabel.NEGATIVE,
        score: 0.95,
      });

      const classification = {
        ...sentimentClassification[SentimentLabel.NEGATIVE][0.9],
        status: 'error',
      };

      expect(result).toEqual(classification);
    });

    it('should handle very negative sentiment', () => {
      const result = analyzeSentimentResult({
        label: SentimentLabel.NEGATIVE,
        score: 0.85,
      });

      const classification = {
        ...sentimentClassification[SentimentLabel.NEGATIVE][0.8],
        status: 'error',
      };

      expect(result).toEqual(classification);
    });

    it('should handle negative sentiment', () => {
      const result = analyzeSentimentResult({
        label: SentimentLabel.NEGATIVE,
        score: 0.7,
      });

      const classification = {
        ...sentimentClassification[SentimentLabel.NEGATIVE][0.6],
        status: 'warning',
      };

      expect(result).toEqual(classification);
    });

    it('should handle low positive scores as neutral with warning status', () => {
      const result = analyzeSentimentResult({
        label: SentimentLabel.POSITIVE,
        score: 0.5,
      });

      const classification = { ...neutralClassification, status: 'warning' };

      expect(result).toEqual(classification);
    });

    it('should handle low negative scores as neutral with warning status', () => {
      const result = analyzeSentimentResult({
        label: SentimentLabel.NEGATIVE,
        score: 0.5,
      });

      const classification = { ...neutralClassification, status: 'warning' };

      expect(result).toEqual(classification);
    });

    it('should throw error for invalid sentiment label', () => {
      expect(() => {
        analyzeSentimentResult({
          label: 'INVALID_LABEL' as SentimentLabel,
          score: 0.5,
        });
      }).toThrow('Invalid sentiment label: INVALID_LABEL');
    });
  });
});

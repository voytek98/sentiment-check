import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { analyzeSentiment } from './sentiment.service';
import { graphqlClient } from './client';
import { SentimentLabel } from '@shared/types';

vi.mock('./client', () => ({
  graphqlClient: {
    request: vi.fn(),
  },
}));

describe('sentiment.service', () => {
  const mockGraphqlResponse = {
    analyzeSentiment: {
      label: SentimentLabel.POSITIVE,
      score: 0.85,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (graphqlClient.request as Mock).mockResolvedValue(mockGraphqlResponse);
  });

  describe('analyzeSentiment', () => {
    it('should call the GraphQL API with the correct parameters', async () => {
      const text = 'This is a test text';
      await analyzeSentiment(text);

      expect(graphqlClient.request).toHaveBeenCalledWith(expect.anything(), { input: { content: text } });
    });

    it('should return the sentiment analysis result', async () => {
      const result = await analyzeSentiment('This is a test text');

      expect(result).toEqual(mockGraphqlResponse.analyzeSentiment);
    });

    it('should throw an error if the request fails', async () => {
      const errorMessage = 'Network error';
      (graphqlClient.request as Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(analyzeSentiment('This is a test text')).rejects.toThrow(errorMessage);
    });
  });
});

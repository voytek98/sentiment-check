import { useMutation } from '@tanstack/react-query';
import { analyzeSentiment } from '../api/sentiment.service';
import { AnalyzeSentimentMutation } from '../gql/graphql';

export const useSentiment = () =>
  useMutation<AnalyzeSentimentMutation['analyzeSentiment'], Error, string>({
    mutationKey: ['sentiment-analysis'],
    mutationFn: async (text: string) => {
      return await analyzeSentiment(text);
    },
    gcTime: 5 * 60 * 1000, // Keep cache for 5 minutes
    onMutate: (variables) => {
      return { text: variables };
    },
  });

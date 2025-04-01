import { graphqlClient } from './client';
import { gql } from 'graphql-request';
import { AnalyzeSentimentMutationVariables, AnalyzeSentimentMutation } from '../gql/graphql';

const ANALYZE_SENTIMENT = gql`
  mutation AnalyzeSentiment($input: TextInput!) {
    analyzeSentiment(input: $input) {
      label
      score
    }
  }
`;

export async function analyzeSentiment(text: string): Promise<AnalyzeSentimentMutation['analyzeSentiment']> {
  const response = await graphqlClient.request<AnalyzeSentimentMutation, AnalyzeSentimentMutationVariables>(
    ANALYZE_SENTIMENT,
    { input: { content: text } },
  );

  return response.analyzeSentiment;
}

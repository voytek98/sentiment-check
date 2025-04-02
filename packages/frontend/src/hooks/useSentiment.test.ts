import React from 'react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useSentiment } from './useSentiment';
import { analyzeSentiment } from '../api/sentiment.service';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SentimentLabel } from '@shared/types';

vi.mock('../api/sentiment.service', () => ({
  analyzeSentiment: vi.fn(),
}));

describe('useSentiment', () => {
  const mockSentimentResult = {
    label: SentimentLabel.POSITIVE,
    score: 0.85,
  };

  let queryClient: QueryClient;

  const createWrapper = () => {
    return function Wrapper({ children }: { children: React.ReactNode }) {
      return React.createElement(QueryClientProvider, { client: queryClient }, children);
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
    (analyzeSentiment as Mock).mockResolvedValue(mockSentimentResult);
  });

  it('should call analyzeSentiment when mutate is called', async () => {
    const { result } = renderHook(() => useSentiment(), { wrapper: createWrapper() });
    const testText = 'This is a test text';

    result.current.mutate(testText);

    await waitFor(() => {
      expect(analyzeSentiment).toHaveBeenCalledWith(testText);
    });
  });

  it('should update data with the sentiment result when successful', async () => {
    const { result } = renderHook(() => useSentiment(), { wrapper: createWrapper() });

    result.current.mutate('This is a test text');

    await waitFor(() => {
      expect(result.current.data).toEqual(mockSentimentResult);
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it('should update error state when the API call fails', async () => {
    const errorMessage = 'API error';
    (analyzeSentiment as Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useSentiment(), { wrapper: createWrapper() });

    result.current.mutate('This is a test text');

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(errorMessage);
    });
  });
});

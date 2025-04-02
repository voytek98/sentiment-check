import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../test/test-utils';
import { SentimentAnalyzer } from './sentimentAnalyzer.component';
import { useSentiment } from '../../hooks/useSentiment';
import { SentimentLabel } from '@shared/types';

vi.mock('../../hooks/useSentiment', () => ({
  useSentiment: vi.fn(),
}));

describe('SentimentAnalyzer', () => {
  const mockAnalyzeSentiment = vi.fn();
  const mockReset = vi.fn();

  const mockSuccessResponse = {
    label: SentimentLabel.POSITIVE,
    score: 0.85,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useSentiment as Mock).mockReturnValue({ mutate: mockAnalyzeSentiment, reset: mockReset });
  });

  it('should render the sentiment analyzer form in default state', () => {
    render(<SentimentAnalyzer />);
    const button = screen.getByRole('button', { name: /analyze sentiment/i });

    expect(screen.getByText(/sentiment analyzer/i)).toBeInTheDocument();
    expect(screen.getByText(/enter text to analyze sentiment/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type your text here/i)).toBeInTheDocument();
    expect(screen.getByText(/0 \/ \d+ characters/)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('should show character count', () => {
    render(<SentimentAnalyzer />);
    const textarea = screen.getByPlaceholderText(/type your text here/i);

    fireEvent.change(textarea, { target: { value: 'Hello world' } });

    expect(screen.getByText(/11 \/ \d+ characters/)).toBeInTheDocument();
  });

  it('should enable the analyze button when text is entered', () => {
    render(<SentimentAnalyzer />);
    const textarea = screen.getByPlaceholderText(/type your text here/i);
    const button = screen.getByRole('button', { name: /analyze sentiment/i });

    expect(button).toBeDisabled();

    fireEvent.change(textarea, { target: { value: 'Hello world' } });

    expect(button).not.toBeDisabled();
  });

  it('should call analyzeSentiment when the form is submitted with valid input', () => {
    render(<SentimentAnalyzer />);
    const textarea = screen.getByPlaceholderText(/type your text here/i);
    const button = screen.getByRole('button', { name: /analyze sentiment/i });

    fireEvent.change(textarea, { target: { value: 'This is a test input for sentiment analysis.' } });
    fireEvent.click(button);

    expect(mockAnalyzeSentiment).toHaveBeenCalledWith('This is a test input for sentiment analysis.');
  });

  it('should show validation error for input that is too long', () => {
    render(<SentimentAnalyzer />);
    const tooLongText = 'x'.repeat(501);
    const textarea = screen.getByPlaceholderText(/type your text here/i);
    const button = screen.getByRole('button', { name: /analyze sentiment/i });

    fireEvent.change(textarea, { target: { value: tooLongText } });
    fireEvent.click(button);

    expect(screen.getByText('Input cannot exceed 500 characters')).toBeInTheDocument();
  });

  it('should show loading state during analysis', () => {
    (useSentiment as Mock).mockReturnValue({ isPending: true });

    render(<SentimentAnalyzer />);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent(/analyzing/i);
    expect(button).toBeDisabled();
  });

  it('should display the result modal when analysis is successful', async () => {
    (useSentiment as Mock).mockReturnValue({ data: mockSuccessResponse, isSuccess: true });

    render(<SentimentAnalyzer />);

    await waitFor(() => {
      expect(screen.getByText(/sentiment:/i)).toBeInTheDocument();
    });
  });

  it('should display error modal when analysis fails', async () => {
    const mockError = new Error('Analysis failed');

    (useSentiment as Mock).mockReturnValue({ isError: true, error: mockError });

    render(<SentimentAnalyzer />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /analysis failed/i })).toBeInTheDocument();
      expect(screen.getByText(mockError.message)).toBeInTheDocument();
    });
  });

  it('should reset state when "Analyze Another" is clicked', async () => {
    (useSentiment as Mock).mockReturnValue({ data: mockSuccessResponse, isSuccess: true, reset: mockReset });

    render(<SentimentAnalyzer />);

    const analyzeAnotherButton = await screen.findByText(/analyze another text/i);
    fireEvent.click(analyzeAnotherButton);

    expect(mockReset).toHaveBeenCalled();
  });
});

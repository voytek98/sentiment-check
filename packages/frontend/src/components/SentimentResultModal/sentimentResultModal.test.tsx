import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import { SentimentResultModal } from './sentimentResultModal.component';
import { SentimentLabel } from '@shared/types';

interface RenderModalProps {
  isVisible?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  sentimentResult?: {
    label: SentimentLabel;
    score: number;
  };
  error?: Error | null;
}

describe('SentimentResultModal', () => {
  const mockOnClose = vi.fn();
  const mockOnTryAgain = vi.fn();
  const mockOnAnalyzeAnother = vi.fn();

  const mockPositiveResult = {
    label: SentimentLabel.POSITIVE,
    score: 0.95,
  };

  const mockNegativeResult = {
    label: SentimentLabel.NEGATIVE,
    score: 0.87,
  };

  const mockError = new Error('Test error message');

  const renderModal = ({ isVisible, isError, isSuccess, sentimentResult, error }: RenderModalProps) => {
    render(
      <SentimentResultModal
        isVisible={isVisible ?? true}
        isError={isError ?? false}
        isSuccess={isSuccess ?? true}
        sentimentResult={sentimentResult}
        error={error ?? null}
        onClose={mockOnClose}
        onTryAgain={mockOnTryAgain}
        onAnalyzeAnother={mockOnAnalyzeAnother}
      />,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when not visible', () => {
    renderModal({ isVisible: false, isError: false, isSuccess: true });

    expect(screen.queryByText(/sentiment:/i)).not.toBeInTheDocument();
  });

  it('should render success state with positive result', () => {
    renderModal({ sentimentResult: mockPositiveResult });

    expect(screen.getByText(/sentiment: positive/i)).toBeInTheDocument();
    expect(screen.getByText(/score: 0.95/i)).toBeInTheDocument();
    expect(screen.getByText(/what this means:/i)).toBeInTheDocument();
    expect(screen.getByText(/pro tip:/i)).toBeInTheDocument();
    expect(screen.getByText(/analyze another text/i)).toBeInTheDocument();
  });

  it('should render success state with negative result', () => {
    renderModal({ sentimentResult: mockNegativeResult });

    expect(screen.getByText(/sentiment: negative/i)).toBeInTheDocument();
    expect(screen.getByText(/score: 0.87/i)).toBeInTheDocument();
  });

  it('should render error state', () => {
    renderModal({ isSuccess: false, isError: true, error: mockError });

    expect(screen.getByText(/analysis failed/i)).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByText(/try again/i)).toBeInTheDocument();
  });

  it('should render fallback error message when error has no message', () => {
    renderModal({ isSuccess: false, isError: true });

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('should call onTryAgain when try again button is clicked', () => {
    renderModal({ isSuccess: false, isError: true, error: mockError });

    fireEvent.click(screen.getByText(/try again/i));
    expect(mockOnTryAgain).toHaveBeenCalledTimes(1);
  });

  it('should call onAnalyzeAnother when analyze another text button is clicked', () => {
    renderModal({ sentimentResult: mockPositiveResult });

    fireEvent.click(screen.getByText(/analyze another text/i));
    expect(mockOnAnalyzeAnother).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when modal is closed', () => {
    renderModal({});

    const closeButton = screen.getByRole('button', { name: /close/i });

    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

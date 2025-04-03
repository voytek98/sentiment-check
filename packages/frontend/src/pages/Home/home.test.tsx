import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import Home from './home.page';
import { SentimentAnalyzer } from '../../components';

// Mock the SentimentAnalyzer component to simplify the test
vi.mock('../../components', () => ({
  SentimentAnalyzer: vi.fn(() => <div data-testid="mock-sentiment-analyzer" />),
}));

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the layout correctly', () => {
    render(<Home />);

    const contentElement = screen.getByTestId('mock-sentiment-analyzer').parentElement;
    expect(contentElement).toBeInTheDocument();
  });

  it('should render the SentimentAnalyzer component', () => {
    render(<Home />);

    expect(screen.getByTestId('mock-sentiment-analyzer')).toBeInTheDocument();
    expect(SentimentAnalyzer).toHaveBeenCalled();
  });
});

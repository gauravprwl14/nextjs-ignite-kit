import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from '../SearchBar';

describe('SearchBar component', () => {
  const mockOnSearch = vi.fn();

  it('should call onSearch when typing after debounce', () => {
    vi.useFakeTimers();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'nextjs' } });
    
    // Should not be called immediately
    expect(mockOnSearch).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(300);
    expect(mockOnSearch).toHaveBeenCalledWith('nextjs');
    vi.useRealTimers();
  });

  it('should clear the search when the clear button is clicked', () => {
    render(<SearchBar onSearch={mockOnSearch} initialValue="search term" />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('search term');

    const clearButton = screen.getByLabelText(/clear search/i);
    fireEvent.click(clearButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('');
    expect(input).toHaveValue('');
  });

  it('should handle initial value correctly', () => {
    render(<SearchBar onSearch={mockOnSearch} initialValue="initial" />);
    expect(screen.getByPlaceholderText(/search/i)).toHaveValue('initial');
  });

  describe('negative and edge cases', () => {
    it('should handle empty input gracefully', () => {
      vi.useFakeTimers();
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText(/search/i);
      fireEvent.change(input, { target: { value: '' } });
      vi.advanceTimersByTime(300);
      expect(mockOnSearch).toHaveBeenCalledWith('');
      vi.useRealTimers();
    });

    it('should not show clear button when query is empty', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument();
    });

    it('should handle very long search queries', () => {
      vi.useFakeTimers();
      const longQuery = 'a'.repeat(1000);
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText(/search/i);
      fireEvent.change(input, { target: { value: longQuery } });
      vi.advanceTimersByTime(300);
      expect(mockOnSearch).toHaveBeenCalledWith(longQuery);
      vi.useRealTimers();
    });

    it('should handle special characters', () => {
      vi.useFakeTimers();
      const specialQuery = '!@#$%^&*()_+';
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText(/search/i);
      fireEvent.change(input, { target: { value: specialQuery } });
      vi.advanceTimersByTime(300);
      expect(mockOnSearch).toHaveBeenCalledWith(specialQuery);
      vi.useRealTimers();
    });
  });
});

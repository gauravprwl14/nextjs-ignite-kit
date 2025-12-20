import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CategoryNav } from '../CategoryNav';

describe('CategoryNav component', () => {
  const mockCategories = [
    { id: 'all', name: 'All', slug: 'all' },
    { id: 'tech', name: 'Technology', slug: 'tech' },
    { id: 'design', name: 'Design', slug: 'design' },
  ];
  const mockOnChange = vi.fn();

  it('should render categories', () => {
    render(<CategoryNav categories={mockCategories} onCategoryChange={mockOnChange} activeCategory="all" />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('should call onCategoryChange when a category is clicked', () => {
    render(<CategoryNav categories={mockCategories} onCategoryChange={mockOnChange} activeCategory="all" />);
    fireEvent.click(screen.getByText('Technology'));
    expect(mockOnChange).toHaveBeenCalledWith('tech');
  });

  it('should highlight the active category', () => {
    render(<CategoryNav categories={mockCategories} onCategoryChange={mockOnChange} activeCategory="tech" />);
    // Active style is bg-foreground text-background
    expect(screen.getByText('Technology')).toHaveClass('bg-foreground');
    expect(screen.getByText('All')).not.toHaveClass('bg-foreground');
  });
});

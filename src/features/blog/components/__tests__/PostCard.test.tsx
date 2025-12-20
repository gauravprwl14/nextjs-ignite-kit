import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PostCard } from '../PostCard';

import type { ImageProps } from 'next/image';

// Mock next/image as it needs special handling in tests
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, ...props }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src as string} alt={alt} data-fill={fill ? 'true' : 'false'} {...props} />
  ),
}));

describe('PostCard component', () => {
  const mockPost = {
    slug: 'test-post',
    title: 'Test Post Title',
    excerpt: 'Test excerpt',
    category: 'tech',
    featured: false,
    date: '2023-10-01',
    author: { name: 'John Doe' },
    coverImage: '/test-image.jpg',
    readingTime: '5 min',
  };

  it('should render post information', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/Oct 1, 2023/)).toBeInTheDocument();
  });

  it('should show cover image when provided', () => {
    render(<PostCard post={mockPost} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/test-image.jpg');
    expect(img).toHaveAttribute('alt', 'Test Post Title');
  });

  it('should highlight search query in title', () => {
    render(<PostCard post={mockPost} searchQuery="Post" />);
    const highlight = screen.getByText('Post');
    expect(highlight.tagName).toBe('MARK');
    expect(highlight).toHaveClass('search-highlight');
  });

  it('should render correct layout classes', () => {
    const { rerender } = render(<PostCard post={mockPost} layout="vertical" />);
    expect(screen.getByRole('link')).not.toHaveClass('flex');

    rerender(<PostCard post={mockPost} layout="horizontal" />);
    expect(screen.getByRole('link')).toHaveClass('flex');
  });

  it('should render reading time in vertical layout', () => {
    render(<PostCard post={mockPost} layout="vertical" />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('should NOT render reading time in horizontal layout', () => {
     render(<PostCard post={mockPost} layout="horizontal" />);
     expect(screen.queryByText('5 min read')).not.toBeInTheDocument();
  });
});

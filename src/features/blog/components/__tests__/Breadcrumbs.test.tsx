import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Breadcrumbs } from '../Breadcrumbs';

describe('Breadcrumbs component', () => {
  const mockItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Post Title', href: '/blog/post-title' },
  ];

  it('should render breadcrumb items', () => {
    render(<Breadcrumbs items={mockItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Post Title')).toBeInTheDocument();
  });

  it('should have correct links', () => {
    render(<Breadcrumbs items={mockItems} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
  });

  it('should mark current item correctly', () => {
    render(<Breadcrumbs items={mockItems} />);
    const currentItem = screen.getByText('Post Title');
    expect(currentItem).toHaveAttribute('aria-current', 'page');
  });

  it('should handle empty items gracefully', () => {
    render(<Breadcrumbs items={[]} />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});

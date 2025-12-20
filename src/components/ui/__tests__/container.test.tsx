import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Container } from '../container';

describe('Container component', () => {
  it('should render children', () => {
    render(<Container>Content</Container>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should have default container classes', () => {
    render(<Container data-testid="container">Content</Container>);
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('max-w-7xl');
    expect(container).toHaveClass('mx-auto');
  });

  it('should accept custom className', () => {
    render(<Container className="custom-class" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('custom-class');
  });
});

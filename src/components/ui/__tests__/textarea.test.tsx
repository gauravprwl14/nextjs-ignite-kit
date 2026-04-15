import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from '../textarea';

describe('Textarea component', () => {
  it('should render the textarea', () => {
    render(<Textarea placeholder="Test area" />);
    expect(screen.getByPlaceholderText('Test area')).toBeInTheDocument();
  });

  it('should handle value changes', () => {
    const handleChange = vi.fn();
    render(<Textarea placeholder="Test" onChange={handleChange} />);
    const textarea = screen.getByPlaceholderText('Test');
    fireEvent.change(textarea, { target: { value: 'long text' } });
    expect(handleChange).toHaveBeenCalled();
    expect((textarea as HTMLTextAreaElement).value).toBe('long text');
  });

  it('should be disabled when the disabled prop is true', () => {
    render(<Textarea disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  it('should allow custom className', () => {
    render(<Textarea className="custom-textarea" placeholder="Custom" />);
    expect(screen.getByPlaceholderText('Custom')).toHaveClass('custom-textarea');
  });
});

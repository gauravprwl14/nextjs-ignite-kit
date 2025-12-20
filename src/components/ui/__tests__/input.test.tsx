import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '../input';

describe('Input component', () => {
  it('should render the input', () => {
    render(<Input placeholder="Test input" />);
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  it('should handle value changes', () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Test" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Test');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalled();
    expect((input as HTMLInputElement).value).toBe('new value');
  });

  it('should be disabled when the disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  it('should allow custom className', () => {
    render(<Input className="custom-input" placeholder="Custom" />);
    expect(screen.getByPlaceholderText('Custom')).toHaveClass('custom-input');
  });

  it('should apply focus styles of the parent if any or itself', () => {
     render(<Input placeholder="Focus" />);
     const input = screen.getByPlaceholderText('Focus');
     fireEvent.focus(input);
     // This test might be fragile depending on how focus-visible is handled, 
     // but usually we check for ring or border classes.
     expect(input).toHaveClass('focus-visible:ring-2');
  });
});

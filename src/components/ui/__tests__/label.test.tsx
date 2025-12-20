import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from '../label';

describe('Label component', () => {
  it('should render the label with text', () => {
    render(<Label>Username</Label>);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<Label className="custom-label">Label</Label>);
    expect(screen.getByText('Label')).toHaveClass('custom-label');
  });

  it('should have correct default styling classes', () => {
    render(<Label>Styled Label</Label>);
    expect(screen.getByText('Styled Label')).toHaveClass('text-sm');
    expect(screen.getByText('Styled Label')).toHaveClass('font-medium');
  });

  it('should handle htmlFor association (implicitly via accessibility)', () => {
     render(
       <div>
         <Label htmlFor="test-input">Label Text</Label>
         <input id="test-input" />
       </div>
     );
     // If the label is correctly associated, getByLabelText should find the input
     expect(screen.getByLabelText('Label Text')).toBeInTheDocument();
  });
});

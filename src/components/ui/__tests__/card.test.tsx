import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';

describe('Card component', () => {
  it('should render all card parts correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  it('should apply custom classNames to all parts', () => {
    render(
      <Card className="card-custom">
        <CardHeader className="header-custom">
           <CardTitle className="title-custom">Title</CardTitle>
        </CardHeader>
        <CardContent className="content-custom">Content</CardContent>
        <CardFooter className="footer-custom">Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Title').closest('.card-custom')).toBeInTheDocument();
    // CardHeader is parent of CardTitle
    expect(screen.getByText('Title').parentElement).toHaveClass('header-custom');
    expect(screen.getByText('Content')).toHaveClass('content-custom');
    expect(screen.getByText('Footer')).toHaveClass('footer-custom');
  });
});

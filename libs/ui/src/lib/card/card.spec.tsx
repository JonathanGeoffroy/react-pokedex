import { render, screen } from '@testing-library/react';

import Card from './card';

describe('Card', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Card />);
    expect(baseElement).toBeTruthy();
  });

  it('should render children', () => {
    const { baseElement } = render(
      <Card>
        <div>First</div>
        <div>Second</div>
      </Card>
    );
    expect(baseElement).toBeTruthy();
    screen.getByText(/First/g);
    screen.getByText(/Second/g);
  });
});

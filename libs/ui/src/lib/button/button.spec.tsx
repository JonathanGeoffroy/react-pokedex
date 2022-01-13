import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './button';

describe('Button', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<Button>Click me</Button>);
    expect(baseElement).toBeEnabled();
    expect(baseElement).toHaveTextContent('Click me');
  });
});

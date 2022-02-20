import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Button from './button';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button>Click me</Button>);
    expect(baseElement).toBeEnabled();
    expect(baseElement).toHaveTextContent('Click me');
  });

  it('should be clickable', async () => {
    const clickFn = jest.fn();
    render(<Button onPress={clickFn}>Click me</Button>);
    userEvent.click(screen.getByText(/Click me/g));

    expect(clickFn).toBeCalledTimes(1);
  });
});

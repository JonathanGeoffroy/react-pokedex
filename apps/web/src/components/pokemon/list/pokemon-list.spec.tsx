import { render } from '@testing-library/react';

import List from './pokemon-list';

describe('List', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<List />);
    expect(baseElement).toBeTruthy();
  });
});

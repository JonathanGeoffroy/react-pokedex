import { render } from '@testing-library/react';

import Searchbar from './searchbar';

describe('Searchbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Searchbar />);
    expect(baseElement).toBeTruthy();
  });
});

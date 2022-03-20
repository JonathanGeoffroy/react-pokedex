import { render } from '@testing-library/react';
import { Item } from '@react-stately/collections';
import Select from './select';

describe('Select', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Select label="Favorite Color">
        <Item >Red</Item>
        <Item>Orange</Item>
        <Item>Yellow</Item>
        <Item>Green</Item>
        <Item>Blue</Item>
        <Item>Purple</Item>
        <Item>Black</Item>
        <Item>White</Item>
        <Item>Lime</Item>
        <Item>Fushsia</Item>
      </Select>
    );
    expect(baseElement).toBeTruthy();
  });
});

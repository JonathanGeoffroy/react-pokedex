import { Story, Meta } from '@storybook/react';
import { Item } from '@react-stately/collections';
import Select, { SelectProps } from './select';

export default {
  component: Select,
  title: 'Select',
} as Meta;

const Template: Story<SelectProps<any>> = (args) => (
  <Select {...args}>
    <Item>Red</Item>
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

export const Primary = Template.bind({});
Primary.args = {
  name: 'My Select',
  label: 'My Select',
};

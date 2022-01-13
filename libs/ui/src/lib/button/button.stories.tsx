import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from './button';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonProps> = ({ children, ...args }) => (
  <Button {...args}>{children}</Button>
);

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  children: 'Click me',
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  children: 'Click me',
  kind: 'primary',
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  children: 'Click me',
  kind: 'secondary',
};

export const ExtraSmallButton = Template.bind({});
ExtraSmallButton.args = {
  children: 'Click me',
  size: 'xs',
};

export const SmallButton = Template.bind({});
SmallButton.args = {
  children: 'Click me',
  size: 'sm',
};

export const LargeButton = Template.bind({});
LargeButton.args = {
  children: 'Click me',
  size: 'xl',
};

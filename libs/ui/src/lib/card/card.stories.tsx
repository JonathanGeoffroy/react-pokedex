import { Story, Meta } from '@storybook/react';
import { Card } from './card';

export default {
  component: Card,
  title: 'Card',
} as Meta;

const Template: Story = (args) => <Card {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  className: 'bg-gray-500 w-32 h-32',
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  className: 'w-32 h-32',
  children: (
    <>
      <div>First</div>
      <div>Second</div>
      <div>Third</div>
    </>
  ),
};

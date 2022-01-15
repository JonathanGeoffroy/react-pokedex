import { Story, Meta } from '@storybook/react';
import { TopBar, TopBarProps } from './top-bar';

export default {
  component: TopBar,
  title: 'TopBar',
} as Meta;

const Template: Story<TopBarProps> = (args) => <TopBar {...args} />;

export const Empty = Template.bind({});
Empty.args = {};

export const WithChildren = Template.bind({});
WithChildren.args = {
  children: 'Some content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Some content',
  kind: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: (
    <>
      <div>One </div>
      <div>Two</div>
      <div>Three</div>
    </>
  ),
  kind: 'secondary',
};

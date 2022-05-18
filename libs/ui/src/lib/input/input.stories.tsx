import { Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { Input, InputProps } from './input';

export default {
  component: Input,
  title: 'Input',
} as Meta;

export const Primary = (props: InputProps) => {
  const [{ value }, setArgs] = useArgs();

  return (
    <Input
      {...props}
      value={value}
      onValueChange={(value) => setArgs({ value })}
    />
  );
};

Primary.args = {
  value: "",
  label: 'Email',
  description: 'Email description',
};

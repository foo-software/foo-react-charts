import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AreaChart, { AreaChartProps } from '../components/AreaChart/AreaChart';

export default {
  title: 'Example/AreaChart',
  component: AreaChart,
} as Meta;

const Template: Story<AreaChartProps> = (args) => <AreaChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  height: 100,
};

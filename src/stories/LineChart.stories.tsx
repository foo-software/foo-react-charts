import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { LineChart, LineChartProps } from '../LineChart/LineChart';

export default {
  title: 'Example/LineChart',
  component: LineChart,
} as Meta;

const Template: Story<LineChartProps> = (args) => <LineChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Line Chart',
};

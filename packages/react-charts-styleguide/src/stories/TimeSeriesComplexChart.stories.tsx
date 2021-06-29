import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import TimeSeriesComplexChart from '@foo-software/react-charts-time-series-complex';
import '@foo-software/react-charts-time-series-complex/dist/TimeSeriesComplexChart.css';
import { getMockMonthData } from './helpers/lighthouse';

export default {
  title: 'Example/TimeSeriesComplexChart',
  component: TimeSeriesComplexChart,
} as Meta;

const mockData = [
  ...getMockMonthData({ days: 31, month: 3 }),
  ...getMockMonthData({ days: 30, month: 4 }),
  ...getMockMonthData({ days: 31, month: 5 }),
  ...getMockMonthData({ days: 30, month: 6 }),
];
console.log('mockData', mockData);

const Template: Story = (args: any) => (
  <TimeSeriesComplexChart {...args} data={mockData} />
);

export const Default = Template.bind({});
Default.args = {};

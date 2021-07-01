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
  ...getMockMonthData({ days: 31, month: 3, max: 85, min: 40 }),
  ...getMockMonthData({ days: 30, month: 4, max: 85, min: 40 }),
  ...getMockMonthData({ days: 31, month: 5, max: 94, min: 40 }),
  ...getMockMonthData({ days: 30, month: 6, max: 99, min: 88 }),
];

const Template: Story = (args: any) => (
  <TimeSeriesComplexChart {...args} data={mockData} />
);

export const Default = Template.bind({});
Default.args = {
  field: 'performance',
  fillOpacity: 0.1,
  hasGrid: false,
  max: 100,
  min: 0,
  name: 'Performance',
  ranges: [
    {
      max: 49,
      min: 0,
      color: '#ff1744',
    },
    {
      max: 89,
      min: 50,
      color: '#f9a115',
    },
    {
      max: 100,
      min: 90,
      color: '#31D3A5',
    },
  ],
  strokeWidth: 3,
};

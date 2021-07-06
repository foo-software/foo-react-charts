import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TimeSeriesComplexPlaceholderChart } from '@foo-software/react-charts-time-series-complex';
import '@foo-software/react-charts-time-series-complex/dist/TimeSeriesComplexChart.css';
import './TimeSeriesComplexChart.css';

export default {
  title: 'Example/TimeSeriesComplexPlaceholderChart',
  component: TimeSeriesComplexPlaceholderChart,
} as Meta;

const Template: Story = (args: any) => (
  <TimeSeriesComplexPlaceholderChart {...args} className="chart" />
);

export const Default = Template.bind({});
Default.args = {
  chartId: 'myChart',
  color: '#757575',
  height: '200px',
  padding: 8,
  strokeWidth: 3,
};

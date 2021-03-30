import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import genDateValue from '@visx/mock-data/lib/generators/genDateValue';
import TimeSeriesChart from '@foo-software/react-charts-time-series';

const mockData = genDateValue(100).reverse();

export default {
  title: 'Example/TimeSeriesChart',
  component: TimeSeriesChart,
} as Meta;

const Template: Story = (args: any) => (
  <TimeSeriesChart {...args} data={mockData} />
);

export const Default = Template.bind({});
Default.args = {
  height: 100,
  valuePrefix: '$',
};
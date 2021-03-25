import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import genDateValue from '@visx/mock-data/lib/generators/genDateValue';
import TimeSeriesChart, {
  TimeSeriesChartProps,
} from '../components/TimeSeriesChart/TimeSeriesChart';

const mockData = genDateValue(100).reverse();

export default {
  title: 'Example/TimeSeriesChart',
  component: TimeSeriesChart,
} as Meta;

const Template: Story<TimeSeriesChartProps> = (args) => (
  <TimeSeriesChart {...args} data={mockData} />
);

export const Default = Template.bind({});
Default.args = {
  height: 100,
  valuePrefix: '$',
};

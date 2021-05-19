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
  backgroundColor: 'transparent',
  borderRadius: '0',
  gutter: { top: 0, right: 0, bottom: 0, left: 0 },
  hasCurve: true,
  height: 100,
  lineColor: '#103ebf',
  markerLineColor: '#58e3Be',
  markerDotColor: '#ffffff',
  markerDotBorderColor: '#58e3Be',
  tooltipPrimaryBackgroundColor: '#103ebf',
  tooltipPrimaryTextColor: '#ffffff',
  tooltipSecondaryBackgroundColor: '#ffffff',
  tooltipSecondaryTextColor: '#103ebf',
  valuePrefix: '$',
};

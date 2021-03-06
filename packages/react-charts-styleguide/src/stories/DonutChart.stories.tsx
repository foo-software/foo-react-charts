import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import DonutChart from '@foo-software/react-charts-donut';
import '@foo-software/react-charts-donut/dist/DonutChart.css';

export default {
  title: 'Example/DonutChart',
  component: DonutChart,
} as Meta;

const Template: Story = (args: any) => <DonutChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  percent: 33,
  size: 'large',
  title: 'Donut',
};

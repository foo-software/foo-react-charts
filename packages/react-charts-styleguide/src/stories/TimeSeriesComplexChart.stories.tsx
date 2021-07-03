import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import TimeSeriesComplexChart, {
  getMockMonthData,
} from '@foo-software/react-charts-time-series-complex';
import '@foo-software/react-charts-time-series-complex/dist/TimeSeriesComplexChart.css';
import './TimeSeriesComplexChart.css';

export default {
  title: 'Example/TimeSeriesComplexChart',
  component: TimeSeriesComplexChart,
} as Meta;

const mockData = [
  ...getMockMonthData({
    customFields: {
      id: 'abcd',
    },
    days: 31,
    field: 'performance',
    max: 85,
    min: 40,
    month: 3,
    year: '2021',
  }),
  ...getMockMonthData({
    customFields: {
      id: 'abcd',
    },
    days: 30,
    field: 'performance',
    max: 85,
    min: 40,
    month: 4,
    year: '2021',
  }),
  ...getMockMonthData({
    customFields: {
      id: 'abcd',
    },
    days: 31,
    field: 'performance',
    max: 94,
    min: 40,
    month: 5,
    year: '2021',
  }),
  ...getMockMonthData({
    customFields: {
      id: 'abcd',
    },
    days: 30,
    field: 'performance',
    max: 99,
    min: 88,
    month: 6,
    year: '2021',
  }),
];

const Template: Story = (args: any) => (
  <TimeSeriesComplexChart {...args} className="chart" data={mockData} />
);

export const Default = Template.bind({});
Default.args = {
  annotationBulletRadius: 4,
  annotationBulletStrokeWidth: 3,
  chartId: 'myChart',
  dateMinGridDistance: 50,
  field: 'performance',
  fillOpacity: 0.1,
  hasAnnotations: true,
  hasBaseGrid: false,
  hasGrid: false,
  hasOnlyLastRange: false,
  hasXAxis: true,
  hasYAxis: true,
  height: '200px',
  onClick: (data: any) => alert(`Performance: ${data.performance}`),
  max: 100,
  min: 0,
  name: 'Performance',
  padding: 8,
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
  refreshId: 'myIdToTriggerRerenderWhenChangedOtherwiseNoNeedForIt',
  strokeWidth: 3,
  tooltipClassName: 'timeSeriesComplexChartRoot__tooltip',
  tooltipValueClassName: 'timeSeriesComplexChartRoot__tooltipValue',
  tooltipAnnotationClassName: 'timeSeriesComplexChartRoot__tooltipAnnotation',
};

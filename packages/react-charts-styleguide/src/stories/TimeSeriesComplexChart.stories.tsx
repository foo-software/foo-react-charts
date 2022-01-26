import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import TimeSeriesComplexChart, {
  getMockMonthData,
} from '@foo-software/react-charts-time-series-complex';
import '@foo-software/react-charts-time-series-complex/dist/TimeSeriesComplexChart.css';
import mockCryptoData from '../mocks/mockCryptoData';
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
  dateAxisExtraMax: 0,
  dateAxisExtraMin: 0,
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
      max: 49.99999999999,
      min: 0,
      color: '#ff1744',
    },
    {
      max: 89.99999999999,
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
  valueAxisExtraMax: 0,
  valueAxisExtraMin: 0,
  valueMinGridDistance: 40,
};

const field = 'value';

const TemplateWithStockData: Story = (args: any) => (
  <TimeSeriesComplexChart {...args} className="chart" data={mockCryptoData} />
);

export const DollarsAndDecimals = TemplateWithStockData.bind({});
DollarsAndDecimals.args = {
  chartId: 'myChart2',
  dateAxisExtraMax: 0.01,
  dateAxisExtraMin: 0.01,
  field,
  hasAnnotations: false,
  hasOnlyLastRange: true,
  hasXAxis: false,
  hasYAxis: false,
  height: 200,
  name: 'BAT',
  onClick: (data: any) => console.log(data),
  padding: 0,
  ranges: [
    {
      max: mockCryptoData[0].value,
      min: 0,
      color: '#ff1744',
    },
    {
      max: Infinity,
      min: mockCryptoData[0].value,
      color: '#31D3A5',
    },
  ],
  refreshId: 'myIdToTriggerRerenderWhenChangedOtherwiseNoNeedForIt',
  strokeWidth: 2,
  tooltipClassName: 'timeSeriesComplexChartRoot__tooltip',
  tooltipValueClassName: 'timeSeriesComplexChartRoot__tooltipValue',
  valueAxisExtraMax: 0.01,
  valueAxisExtraMin: 0.01,
  valueMinGridDistance: 1,
};

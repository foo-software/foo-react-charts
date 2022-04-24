import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import CandleDetailChart from '@foo-software/react-charts-candle-detail';
import '@foo-software/react-charts-candle-detail/dist/CandleDetailChart.css';
import './CandleDetailChart.css';

export default {
  title: 'Example/CandleDetailChart',
  component: CandleDetailChart,
} as Meta;

const Template: Story = (args: any) => (
  <CandleDetailChart {...args} className="candleChartStory" />
);

export const Default = Template.bind({});
Default.args = {
  assetSymbol: 'NIO',
  candles: [
    {
      time: '2022-03-16T13:30:00Z',
      open: 17.56,
      high: 17.88,
      low: 17.46,
      close: 17.71,
      volume: 353238,
    },
    {
      time: '2022-03-16T13:31:00Z',
      open: 17.695,
      high: 17.99,
      low: 17.46,
      close: 17.8837,
      volume: 4797659,
    },
    {
      time: '2022-03-16T13:32:00Z',
      open: 17.88,
      high: 18.02,
      low: 17.71,
      close: 17.735,
      volume: 1830169,
    },
  ],
  colorGreen: '#26a699',
  colorRed: '#f23645',
  heightChart: '300px',
  link: 'https://www.laservision.app/stocks/NIO?start=2022-03-16T13:30:00.000Z&end=2022-03-16T14:29:00Z&timeframe=1Min',
  widthPercentBody: 20,
  widthWick: 2,
};

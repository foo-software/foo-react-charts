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
  assetSymbol: 'TSLA',
  candles: [
    {
      close: 1018,
      high: 1019,
      low: 1011.92,
      open: 1015.21,
      time: '2022-04-22T13:30:00.874Z',
      volume: 290450,
    },
    {
      close: 1012.3,
      high: 1019.08,
      low: 1009.25,
      open: 1018,
      time: '2022-04-22T13:31:00.874Z',
      volume: 166041,
    },
    {
      close: 1003.32,
      high: 1012.97,
      low: 1003.32,
      open: 1012.97,
      time: '2022-04-22T13:32:00.874Z',
      volume: 158989,
    },
  ],
  colorGreen: '#26a699',
  colorRed: '#f23645',
  heightChart: '300px',
  link: 'https://www.laservision.app/stocks/tsla?start=2022-04-22T13:29:00.874Z&end=2022-04-22T20:00:00.874Z',
  widthPercentBody: 20,
  widthWick: 2,
};

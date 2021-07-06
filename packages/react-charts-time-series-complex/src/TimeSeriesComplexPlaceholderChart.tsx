import React from 'react';
import TimeSeriesComplexChart from './TimeSeriesComplexChart';
import { TimeSeriesComplexPlaceholderChartPropsInterface } from './interfaces';

const TimeSeriesComplexPlaceholderChart = ({
  chartId,
  className,
  color = '#757575',
  data = [
    {
      date: new Date('1/1/2021'),
      field: 50,
    },
    {
      date: new Date('8/15/2021'),
      field: 50,
    },
    {
      date: new Date('9/1/2021'),
      field: 70,
    },
    {
      date: new Date('9/15/2021'),
      field: 50,
    },
    {
      date: new Date('10/1/2021'),
      field: 80,
    },
    {
      date: new Date('10/15/2021'),
      field: 50,
    },
    {
      date: new Date('11/1/2021'),
      field: 85,
    },
    {
      date: new Date('11/15/2021'),
      field: 50,
    },
    {
      date: new Date('12/31/2021'),
      field: 50,
    },
  ],
  dateMinGridDistance,
  fillOpacity,
  hasGrid,
  hasBaseGrid,
  hasXAxis = false,
  hasYAxis = false,
  height = '200px',
  max,
  min,
  padding = 0,
  strokeWidth,
}: TimeSeriesComplexPlaceholderChartPropsInterface) => {
  return (
    <TimeSeriesComplexChart
      chartId={chartId}
      className={className}
      color={color}
      data={data}
      dateMinGridDistance={dateMinGridDistance}
      field="field"
      fillOpacity={fillOpacity}
      hasGrid={hasGrid}
      hasBaseGrid={hasBaseGrid}
      hasXAxis={hasXAxis}
      hasYAxis={hasYAxis}
      height={height}
      isTooltipDisabled
      max={max}
      min={min}
      name="name"
      padding={padding}
      strokeWidth={strokeWidth}
    />
  );
};

export default TimeSeriesComplexPlaceholderChart;

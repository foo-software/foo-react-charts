import React, { useState } from 'react';
import classnames from 'classnames';
import useScores, { Range } from './useScores';

const TimeSeriesComplexChart = ({
  className,
  data,
  field,
  fillOpacity,
  hasGrid,
  height = '200px',
  max,
  min,
  name,
  ranges,
  strokeWidth,
}: {
  color?: string;
  className?: string;
  data: any;
  field: string;
  fillOpacity?: number;
  hasGrid?: boolean;
  height?: string;
  max?: number;
  min?: number;
  name: string;
  ranges?: Range[];
  strokeWidth?: number;
}) => {
  const [shouldRedraw, setShouldRedraw] = useState(false);

  useScores({
    data,
    field,
    fillOpacity,
    hasGrid,
    max,
    min,
    name,
    ranges,
    setShouldRedraw,
    shouldRedraw,
    strokeWidth,
  });

  return (
    <div
      id="chartdiv"
      className={classnames('timeSeriesComplexChartRoot', className)}
      style={{ height }}
    />
  );
};

export default TimeSeriesComplexChart;

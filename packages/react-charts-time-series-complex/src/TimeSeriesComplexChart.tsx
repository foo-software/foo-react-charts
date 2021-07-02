import React from 'react';
import classnames from 'classnames';
import useScores, { Range } from './useScores';

const TimeSeriesComplexChart = ({
  className,
  data,
  dateMinGridDistance,
  field,
  fillOpacity,
  hasGrid,
  hasAnnotations,
  hasOnlyLastRange,
  height = '200px',
  max,
  min,
  name,
  ranges,
  strokeWidth,
  tooltipClassName = 'time-series-complex-chart__tooltip',
  tooltipValueClassName = 'time-series-complex-chart__tooltip-value',
  tooltipAnnotationClassName = 'time-series-complex-chart__tooltip-annotation',
}: {
  color?: string;
  className?: string;
  data: any;
  dateMinGridDistance?: number;
  field: string;
  fillOpacity?: number;
  hasAnnotations?: boolean;
  hasGrid?: boolean;
  hasOnlyLastRange?: boolean;
  height?: string;
  max?: number;
  min?: number;
  name: string;
  ranges?: Range[];
  strokeWidth?: number;
  tooltipClassName?: string;
  tooltipValueClassName?: string;
  tooltipAnnotationClassName?: string;
}) => {
  useScores({
    data,
    dateMinGridDistance,
    field,
    fillOpacity,
    hasAnnotations,
    hasGrid,
    hasOnlyLastRange,
    max,
    min,
    name,
    ranges,
    strokeWidth,
    tooltipClassName,
    tooltipValueClassName,
    tooltipAnnotationClassName,
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

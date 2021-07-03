import React from 'react';
import classnames from 'classnames';
import useAmChart from './useAmChart';
import { TimeSeriesComplexChartPropsInterface } from './interfaces';

const TimeSeriesComplexChart = ({
  annotationBulletRadius,
  annotationBulletStrokeWidth,
  className,
  chartId,
  data,
  dateMinGridDistance,
  field,
  fillOpacity,
  hasGrid,
  hasAnnotations,
  hasBaseGrid,
  hasOnlyLastRange,
  hasXAxis,
  hasYAxis,
  height = '200px',
  max,
  min,
  name,
  onClick,
  padding,
  ranges,
  refreshId,
  strokeWidth,
  tooltipClassName,
  tooltipValueClassName,
  tooltipAnnotationClassName,
}: TimeSeriesComplexChartPropsInterface) => {
  useAmChart({
    annotationBulletRadius,
    annotationBulletStrokeWidth,
    chartId,
    data,
    dateMinGridDistance,
    field,
    fillOpacity,
    hasAnnotations,
    hasBaseGrid,
    hasGrid,
    hasOnlyLastRange,
    hasXAxis,
    hasYAxis,
    max,
    min,
    name,
    onClick,
    padding,
    ranges,
    refreshId,
    strokeWidth,
    tooltipClassName,
    tooltipValueClassName,
    tooltipAnnotationClassName,
  });

  return (
    <div
      id={chartId}
      className={classnames('timeSeriesComplexChartRoot', className)}
      style={{ height }}
    />
  );
};

export default TimeSeriesComplexChart;

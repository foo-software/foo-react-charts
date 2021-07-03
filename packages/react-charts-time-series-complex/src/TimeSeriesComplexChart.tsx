import React from 'react';
import classnames from 'classnames';
import useAmChart from './useAmChart';
import { TimeSeriesComplexChartPropsInterface } from './interfaces';

const TimeSeriesComplexChart = ({
  annotationBulletRadius,
  annotationBulletStrokeWidth,
  className,
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
  id,
  max,
  min,
  name,
  onClick,
  ranges,
  strokeWidth,
  tooltipClassName,
  tooltipValueClassName,
  tooltipAnnotationClassName,
}: TimeSeriesComplexChartPropsInterface) => {
  useAmChart({
    annotationBulletRadius,
    annotationBulletStrokeWidth,
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
    id,
    max,
    min,
    name,
    onClick,
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

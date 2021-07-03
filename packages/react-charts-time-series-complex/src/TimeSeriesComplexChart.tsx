import React from 'react';
import classnames from 'classnames';
import useAmChart, { Range } from './useAmChart';

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
}: {
  annotationBulletRadius?: number;
  annotationBulletStrokeWidth?: number;
  color?: string;
  className?: string;
  data: any;
  dateMinGridDistance?: number;
  field: string;
  fillOpacity?: number;
  hasAnnotations?: boolean;
  hasBaseGrid?: boolean;
  hasGrid?: boolean;
  hasOnlyLastRange?: boolean;
  hasXAxis?: boolean;
  hasYAxis?: boolean;
  height?: string;
  id?: string;
  max?: number;
  min?: number;
  name: string;
  onClick?: (data: any) => any;
  ranges?: Range[];
  strokeWidth?: number;
  tooltipClassName?: string;
  tooltipValueClassName?: string;
  tooltipAnnotationClassName?: string;
}) => {
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

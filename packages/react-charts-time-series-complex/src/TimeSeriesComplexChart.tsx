import React from 'react';
import classnames from 'classnames';
import useAmChart from './useAmChart';
import { TimeSeriesComplexChartPropsInterface } from './interfaces';

const TimeSeriesComplexChart = ({
  annotationBulletRadius,
  annotationBulletStrokeWidth,
  className,
  color,
  chartId,
  data,
  dateAxisExtraMax,
  dateAxisExtraMin,
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
  isTooltipDisabled,
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
  valueAxisExtraMax,
  valueAxisExtraMin,
  valueMinGridDistance,
  valuePrefix,
  valueSuffix,
  valueAxisPrefix,
  valueAxisSuffix,
}: TimeSeriesComplexChartPropsInterface) => {
  useAmChart({
    annotationBulletRadius,
    annotationBulletStrokeWidth,
    chartId,
    color,
    data,
    dateAxisExtraMax,
    dateAxisExtraMin,
    dateMinGridDistance,
    field,
    fillOpacity,
    hasAnnotations,
    hasBaseGrid,
    hasGrid,
    hasOnlyLastRange,
    hasXAxis,
    hasYAxis,
    isTooltipDisabled,
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
    valueAxisExtraMax,
    valueAxisExtraMin,
    valueMinGridDistance,
    valuePrefix,
    valueSuffix,
    valueAxisPrefix,
    valueAxisSuffix,
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

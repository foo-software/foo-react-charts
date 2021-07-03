// https://www.amcharts.com/docs/v4/getting-started/integrations/using-react/
// https://www.amcharts.com/docs/v4/reference
// disclaimer: most of this code was copied from the below. i take no credit.
// https://www.amcharts.com/demos/multiple-value-axes/
// https://www.amcharts.com/demos/date-based-line-chart/
import { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { RangeInterface } from './interfaces';

am4core.useTheme(am4themesAnimated);

const getValidRanges = ({
  data,
  field,
  ranges,
}: {
  data: any;
  field: string;
  ranges?: RangeInterface[];
}) => {
  if (!ranges || !Array.isArray(ranges) || !ranges.length) {
    return [];
  }

  const invalidRanges = [...ranges];

  for (const item of data) {
    for (const [index, range] of invalidRanges.entries()) {
      if (item[field] <= range.max && item[field] >= range.min) {
        invalidRanges.splice(index, 1);
        break;
      }
    }
    if (!invalidRanges.length) {
      return ranges;
    }
  }

  const invalidColors = invalidRanges.map((range) => range.color);
  return ranges.filter((range) => !invalidColors.includes(range.color));
};

const getColor = ({
  chartColors,
  colors,
  ranges,
  value,
}: {
  chartColors: any;
  colors: any;
  ranges: any[];
  value: number;
}) => {
  const reverseSortedRanges = [...ranges].reverse();
  for (const range of reverseSortedRanges) {
    if (value <= range.max && value >= range.min) {
      return colors[range.color];
    }
  }
  return chartColors.getIndex(0);
};

export default ({
  annotationBulletRadius = 4,
  annotationBulletStrokeWidth = 3,
  color,
  data,
  dateMinGridDistance = 50,
  field,
  fillOpacity = 0.1,
  hasAnnotations = false,
  hasBaseGrid = false,
  hasGrid = false,
  hasOnlyLastRange = false,
  hasXAxis = true,
  hasYAxis = true,
  id,
  onClick,
  ranges,
  name,
  max = 100,
  min = 0,
  strokeWidth = 3,
  tooltipClassName = 'timeSeriesComplexChartRoot__tooltip',
  tooltipValueClassName = 'timeSeriesComplexChartRoot__tooltipValue',
  tooltipAnnotationClassName = 'timeSeriesComplexChartRoot__tooltipAnnotation',
}: {
  annotationBulletRadius?: number;
  annotationBulletStrokeWidth?: number;
  color?: string;
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
  id?: string;
  max?: number;
  min?: number;
  name: string;
  onClick?: (data: any) => any;
  ranges?: RangeInterface[];
  strokeWidth?: number;
  tooltipClassName?: string;
  tooltipValueClassName?: string;
  tooltipAnnotationClassName?: string;
}) => {
  useEffect(() => {
    // https://www.amcharts.com/docs/v4/reference/xychart/
    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.data = data;
    chart.maskBullets = false;

    const validRanges = getValidRanges({
      data: chart.data,
      field,
      ranges,
    });

    // sort ranges by `min`
    const sortedRanges = validRanges.sort((a, b) => a.min - b.min);

    // create a dictoonary of colors for quick lookup
    const colors: any = {};
    if (sortedRanges.length) {
      chart.colors.list = sortedRanges.map((range) => {
        colors[range.color] = am4core.color(range.color);
        return colors[range.color];
      });
    } else if (color) {
      colors[color] = am4core.color(color);
      chart.colors.list = [colors[color]];
    }

    // if we only use the latest core color
    const lastRangeColor = !hasOnlyLastRange
      ? undefined
      : getColor({
          chartColors: chart.colors,
          colors,
          ranges: sortedRanges,
          value: chart.data[chart.data.length - 1][field],
        });

    // date axis
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.disabled = !hasXAxis;
    dateAxis.renderer.minGridDistance = dateMinGridDistance;
    dateAxis.renderer.grid.template.disabled = !hasGrid;
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;

    // https://www.amcharts.com/docs/v4/reference/dateaxis/#tooltipDateFormat_property
    dateAxis.tooltipDateFormat = 'M/d/yy h:mm a';

    dateAxis.dateFormats.setKey('minute', 'h:mm a');
    dateAxis.periodChangeDateFormats.setKey('minute', 'h:mm a');
    dateAxis.dateFormats.setKey('hour', 'h:mm a');
    dateAxis.periodChangeDateFormats.setKey('hour', 'h:mm a');
    dateAxis.dateFormats.setKey('day', 'M/d');
    dateAxis.periodChangeDateFormats.setKey('day', 'M/d');
    dateAxis.dateFormats.setKey('week', 'M/d');
    dateAxis.periodChangeDateFormats.setKey('week', 'M/d');
    dateAxis.dateFormats.setKey('month', 'M/d');
    dateAxis.periodChangeDateFormats.setKey('month', 'M/d');

    // cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;

    // value axis
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.disabled = !hasYAxis;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.baseGrid.disabled = !hasBaseGrid;
    valueAxis.min = min;
    valueAxis.max = max;
    valueAxis.renderer.grid.template.disabled = !hasGrid;

    // series
    const series: any = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = 'date';
    series.yAxis = valueAxis;
    series.name = name;
    series.strokeWidth = strokeWidth;
    series.fillOpacity = fillOpacity;

    // tooltip
    const openingTooltipTag = `<div class="${tooltipClassName}">`;
    const closingTooltipTag = '</div>';
    const openingTooltipValueTag = `<div class="${tooltipValueClassName}">`;
    const closingTooltipValueTag = '</div>';
    series.tooltipHTML =
      `${openingTooltipTag}${openingTooltipValueTag}` +
      `{valueY}${closingTooltipValueTag}${closingTooltipTag}`;

    if (hasAnnotations) {
      series.adapter.add('tooltipHTML', (html: string, target: any) => {
        const annotation = target?.tooltipDataItem?.dataContext?.annotation;

        if (!annotation) {
          return html;
        }

        const openingTooltipAnnotationTag = `<div class="${tooltipAnnotationClassName}">`;
        const closingTooltipAnnotationTag = '</div>';

        return (
          `${openingTooltipTag}` +
          `${openingTooltipValueTag}{valueY}${closingTooltipValueTag}` +
          `${openingTooltipAnnotationTag}{annotation}${closingTooltipAnnotationTag}` +
          `${closingTooltipTag}`
        );
      });
    }

    // bullets
    if (hasAnnotations) {
      const annotationBullet = series.bullets.push(
        new am4charts.CircleBullet(),
      );
      annotationBullet.circle.fill = am4core.color('#fff');
      annotationBullet.circle.strokeWidth = annotationBulletStrokeWidth;
      annotationBullet.circle.radius = annotationBulletRadius;

      const annotationState = annotationBullet.states.create('hover');
      annotationState.properties.scale = 1.2;

      annotationBullet.adapter.add(
        'disabled',
        (disabled: boolean, target: any) => {
          const annotation = target?.tooltipDataItem?.dataContext?.annotation;
          return !annotation;
        },
      );

      annotationBullet.adapter.add(
        'stroke',
        function (color: string, target: any) {
          return (
            lastRangeColor ||
            getColor({
              chartColors: chart.colors,
              colors,
              ranges: sortedRanges,
              value: target?.tooltipDataItem?.valueY,
            })
          );
        },
      );
    }

    // ranges
    sortedRanges.forEach((rangeData, index) => {
      const range = valueAxis.createSeriesRange(series);
      range.value = rangeData.max + Math.floor(strokeWidth / 2);
      range.endValue = rangeData.min;
      range.contents.stroke = lastRangeColor || chart.colors.getIndex(index);
      range.contents.fill = range.contents.stroke;
      range.contents.fillOpacity = fillOpacity;
    });

    if (sortedRanges.length) {
      series.tooltip.getFillFromObject = false;
      series.tooltip.adapter.add('x', (x: any) => {
        series.tooltip.background.fill =
          lastRangeColor ||
          getColor({
            chartColors: chart.colors,
            colors,
            ranges: sortedRanges,
            value: series.tooltip.tooltipDataItem.valueY,
          });
        return x;
      });
    } else {
      series.tooltip.background.fill = chart.colors.getIndex(0);
    }

    // events
    if (typeof onClick === 'function') {
      chart.events.on('hit', () => {
        onClick(series.tooltipDataItem.dataContext);
      });
    }

    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, [
    annotationBulletRadius,
    annotationBulletStrokeWidth,
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
  ]);
};

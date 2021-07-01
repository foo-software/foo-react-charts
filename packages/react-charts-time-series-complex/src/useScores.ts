// https://www.amcharts.com/docs/v4/getting-started/integrations/using-react/
// https://www.amcharts.com/docs/v4/reference
// disclaimer: most of this code was copied from the below. i take no credit.
// https://www.amcharts.com/demos/multiple-value-axes/
// https://www.amcharts.com/demos/date-based-line-chart/
import { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

export interface Range {
  max: number;
  min: number;
  color: string;
}

const getValidRanges = ({
  data,
  field,
  ranges,
}: {
  data: any;
  field: string;
  ranges?: Range[];
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

export default ({
  color,
  data,
  field,
  fillOpacity = 0.1,
  hasGrid = false,
  ranges,
  name,
  max = 100,
  min = 0,
  setShouldRedraw,
  shouldRedraw,
  strokeWidth = 3,
}: {
  color?: string;
  data: any;
  field: string;
  fillOpacity?: number;
  hasGrid?: boolean;
  max?: number;
  min?: number;
  name: string;
  ranges?: Range[];
  setShouldRedraw: (shouldRedraw: boolean) => void;
  shouldRedraw: boolean;
  strokeWidth?: number;
}) => {
  useEffect(() => {
    // https://www.amcharts.com/docs/v4/reference/xychart/
    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.data = data;

    const validRanges = getValidRanges({
      data: chart.data,
      field,
      ranges,
    });

    const sortedRanges = validRanges.sort((a, b) => a.min - b.min);
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

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

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

    dateAxis.renderer.grid.template.disabled = !hasGrid;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = min;
    valueAxis.max = max;
    valueAxis.renderer.disabled = false;
    valueAxis.renderer.grid.template.disabled = !hasGrid;

    const series: any = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = 'date';
    series.yAxis = valueAxis;
    series.name = name;
    series.tooltipText = '{valueY}';
    series.strokeWidth = strokeWidth;
    series.fillOpacity = fillOpacity;

    // range
    sortedRanges.forEach((rangeData, index) => {
      const range = valueAxis.createSeriesRange(series);
      range.value = rangeData.max + Math.floor(strokeWidth / 2);
      range.endValue = rangeData.min;
      range.contents.stroke = chart.colors.getIndex(index);
      range.contents.fill = range.contents.stroke;
      range.contents.fillOpacity = fillOpacity;
    });

    // cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;

    if (sortedRanges.length) {
      series.tooltip.getFillFromObject = false;
      series.tooltip.adapter.add('x', (x: any) => {
        const reverseSortedRanges = [...sortedRanges].reverse();
        for (const range of reverseSortedRanges) {
          if (
            series.tooltip.tooltipDataItem.valueY <= range.max &&
            series.tooltip.tooltipDataItem.valueY >= range.min
          ) {
            series.tooltip.background.fill = colors[range.color];
            return x;
          }
        }
        series.tooltip.background.fill = chart.colors.getIndex(0);
        return x;
      });
    } else {
      series.tooltip.background.fill = chart.colors.getIndex(0);
    }

    // if we received a signal to redraw
    if (shouldRedraw) {
      chart.invalidateData();
      setShouldRedraw(false);
    }

    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, [shouldRedraw]);
};

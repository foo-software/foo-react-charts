// https://www.amcharts.com/docs/v4/getting-started/integrations/using-react/
// https://www.amcharts.com/docs/v4/reference
import { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import am4themesMaterial from '@amcharts/amcharts4/themes/material';
import { auditNameMapCapitalized } from './helpers/lighthouse';

am4core.useTheme(am4themesAnimated);
am4core.useTheme(am4themesMaterial);

const createAxisAndSeries = ({
  chart,
  field,
  name,
  hideAxis = true,
}: {
  chart: any;
  field: any;
  name: string;
  hideAxis?: boolean;
}) => {
  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;
  valueAxis.max = 100;
  valueAxis.renderer.disabled = hideAxis;
  valueAxis.renderer.grid.template.disabled = true;

  const series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = field;
  series.dataFields.dateX = 'date';
  series.strokeWidth = 2;
  series.yAxis = valueAxis;
  series.name = name;
  series.tooltipText = '{name}: [bold]{valueY}[/]';
  series.showOnInit = true;
};

const customizeGrip = (grip: any) => {
  grip.icon.disabled = true;
};

// disclaimer: most of this code was copied from the below. i take no credit.
// https://www.amcharts.com/demos/multiple-value-axes/
export default ({
  data,
  setShouldRedraw,
  shouldRedraw,
}: {
  data: any;
  setShouldRedraw: (shouldRedraw: boolean) => void;
  shouldRedraw: boolean;
}) => {
  useEffect(() => {
    // https://www.amcharts.com/docs/v4/reference/xychart/
    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.colors.step = 2;
    chart.data = data;
    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();

    chart.colors.list = [
      am4core.color('#FD74A0'),
      am4core.color('#103EBF'),
      am4core.color('#FFD13E'),
      am4core.color('#58E3BE'),
      am4core.color('#ffa400'),
    ];

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 80;

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
    dateAxis.renderer.grid.template.disabled = true;

    const scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX = scrollbarX;

    customizeGrip(chart.scrollbarX.startGrip);
    customizeGrip(chart.scrollbarX.endGrip);

    createAxisAndSeries({
      chart,
      field: 'performance',
      hideAxis: false,
      name: auditNameMapCapitalized.performance,
    });
    createAxisAndSeries({
      chart,
      field: 'accessibility',
      name: auditNameMapCapitalized.accessibility,
    });
    createAxisAndSeries({
      chart,
      field: 'bestPractices',
      name: auditNameMapCapitalized.bestPractices,
    });
    createAxisAndSeries({
      chart,
      field: 'seo',
      name: auditNameMapCapitalized.seo,
    });
    createAxisAndSeries({
      chart,
      field: 'progressiveWebApp',
      name: auditNameMapCapitalized.progressiveWebApp,
    });

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

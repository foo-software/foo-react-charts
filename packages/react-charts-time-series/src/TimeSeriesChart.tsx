// inspired by:
// https://airbnb.io/visx/areas
import React, { useMemo, useCallback, useRef } from 'react';
import { Area, Line, Bar } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { scaleTime, scaleLinear } from '@visx/scale';
import {
  withTooltip,
  Tooltip,
  TooltipWithBounds,
  defaultStyles as defaultTooltipStyles,
} from '@visx/tooltip';
import { DateValue } from '@visx/mock-data/lib/generators/genDateValue';
import { localPoint } from '@visx/event';
import { max, extent, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import {
  numberWithCommas,
  useRefWidth,
} from '@foo-software/react-charts-utils';

// util
const formatDate = timeFormat('%x %X');

// accessors
const getDate = (d: any) => new Date(d.date);
const getValue = (d: any) => d.value;
const bisectDate = bisector<any, Date>((d) => new Date(d.date)).left;

type DataType = {
  date: string;
  value: number;
};

export type TimeSeriesChartProps = {
  backgroundColor?: string;
  borderRadius?: string;
  data: Array<DataType | DateValue>;
  gutter?: { top: number; right: number; bottom: number; left: number };
  height: number;
  hideTooltip?: any;
  lineColor?: string;
  markerLineColor?: string;
  markerDotColor?: string;
  markerDotBorderColor?: string;
  showTooltip?: any;
  tooltipData?: any;
  tooltipPrimaryBackgroundColor?: string;
  tooltipPrimaryTextColor?: string;
  tooltipSecondaryBackgroundColor?: string;
  tooltipSecondaryTextColor?: string;
  tooltipTop?: number;
  tooltipLeft?: number;
  valuePrefix?: string;
};

export default withTooltip(
  ({
    backgroundColor = 'transparent',
    borderRadius = '0',
    data,
    gutter = { top: 0, right: 0, bottom: 0, left: 0 },
    height,
    hideTooltip,
    lineColor = '#103ebf',
    markerLineColor = '#58e3Be',
    markerDotColor = '#ffffff',
    markerDotBorderColor = '#58e3Be',
    showTooltip,
    tooltipData,
    tooltipPrimaryBackgroundColor = '#103ebf',
    tooltipPrimaryTextColor = '#ffffff',
    tooltipSecondaryBackgroundColor = '#ffffff',
    tooltipSecondaryTextColor = '#103ebf',
    tooltipTop = 0,
    tooltipLeft = 0,
    valuePrefix = '',
  }: TimeSeriesChartProps) => {
    const containerRef = useRef(null);
    const width = useRefWidth(containerRef);

    // bounds
    const innerWidth = width - gutter.left - gutter.right;
    const innerHeight = height - gutter.top - gutter.bottom;

    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [gutter.left, innerWidth + gutter.left],
          domain: extent(data, getDate) as [Date, Date],
        }),
      [innerWidth, gutter.left],
    );
    const valueScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + gutter.top, gutter.top],
          domain: [0, (max(data, getValue) || 0) + innerHeight / 3],
          nice: true,
        }),
      [gutter.top, innerHeight],
    );

    // tooltip handler
    // pretty much a copy from: https://airbnb.io/visx/areas
    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>,
      ) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = dateScale.invert(x);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && getDate(d1)) {
          d =
            x0.valueOf() - getDate(d0).valueOf() >
            getDate(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: valueScale(getValue(d)),
        });
      },
      [showTooltip, valueScale, dateScale],
    );

    return (
      <div
        ref={containerRef}
        style={{
          background: backgroundColor,
          boxSizing: 'border-box',
          borderRadius,
          width: '100%',
          fontFamily: 'arial',
        }}
      >
        <svg width={width} height={height}>
          <rect fill="transparent" x={0} y={0} width={width} height={height} />
          <Area
            data={data}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => valueScale(getValue(d)) ?? 0}
            fill="transparent"
            strokeWidth={2}
            stroke={lineColor}
            curve={curveMonotoneX}
          />
          <Bar
            data-testid="time-series-chart-bar"
            x={gutter.left}
            y={gutter.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: gutter.top }}
                to={{ x: tooltipLeft, y: innerHeight + gutter.top }}
                stroke={markerLineColor}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={markerDotColor}
                stroke={markerDotBorderColor}
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={{
                ...defaultTooltipStyles,
                background: tooltipPrimaryBackgroundColor,
                color: tooltipPrimaryTextColor,
              }}
            >
              {`${valuePrefix}${numberWithCommas(getValue(tooltipData))}`}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + gutter.top - 14}
              left={tooltipLeft}
              style={{
                ...defaultTooltipStyles,
                background: tooltipSecondaryBackgroundColor,
                color: tooltipSecondaryTextColor,
                minWidth: 150,
                textAlign: 'center',
                transform: 'translateX(-50%) translateY(105%)',
              }}
            >
              {formatDate(getDate(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    );
  },
);

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
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { localPoint } from '@visx/event';
import { max, extent, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import useRefWidth from '../../hooks/useRefWidth';

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

type TimeSeriesChartPropsDefault = {
  data: Array<DataType | DateValue>;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  primaryColor?: string;
  secondaryColor?: string;
};

export type TimeSeriesChartProps = TimeSeriesChartPropsDefault &
  WithTooltipProvidedProps<any>;

export default withTooltip(
  ({
    data,
    height,
    hideTooltip,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    primaryColor = '#103EBF',
    secondaryColor = '#58E3BE',
    showTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: TimeSeriesChartProps) => {
    const containerRef = useRef(null);
    const width = useRefWidth(containerRef);

    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, innerWidth + margin.left],
          domain: extent(data, getDate) as [Date, Date],
        }),
      [innerWidth, margin.left]
    );
    const valueScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, (max(data, getValue) || 0) + innerHeight / 3],
          nice: true,
        }),
      [margin.top, innerHeight]
    );

    // tooltip handler
    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
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
      [showTooltip, valueScale, dateScale]
    );

    return (
      <div ref={containerRef} style={{ width: '100%', fontFamily: 'arial' }}>
        <svg width={width} height={height}>
          <rect fill="transparent" x={0} y={0} width={width} height={height} />
          <Area
            data={data}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => valueScale(getValue(d)) ?? 0}
            fill="transparent"
            strokeWidth={2}
            stroke={primaryColor}
            curve={curveMonotoneX}
          />
          <Bar
            x={margin.left}
            y={margin.top}
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
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={secondaryColor}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill="#ffffff"
                stroke={secondaryColor}
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
                background: primaryColor,
                color: '#ffffff',
              }}
            >
              {`$${getValue(tooltipData)}`}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + margin.top - 14}
              left={tooltipLeft}
              style={{
                ...defaultTooltipStyles,
                color: primaryColor,
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
  }
);

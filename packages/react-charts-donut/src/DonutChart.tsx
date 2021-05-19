import React from 'react';
import classnames from 'classnames';
import { getPercentColor } from './helpers/number';

// not sure where this number comes from. i stole
// it from Lighthouse
const NUMBER_STROKE_DASH_ARRAY = 352;

const ChartDonut = ({
  className,
  percent,
  size = 'large',
  title,
  titleClassName,
}: {
  className?: string;
  percent: number;
  size?: 'fluid' | 'small' | 'medium' | 'large';
  title?: string;
  titleClassName?: string;
}) => {
  const color = getPercentColor(percent);
  return (
    <div
      className={classnames(
        'donutChartRoot',
        `donutChart--${size}`,
        `donutChart--${color}`,
        className,
      )}
    >
      <div className="donutChartContainer">
        <svg viewBox="0 0 120 120" className="donutChartGauge">
          <circle className="donutChartGaugeBase" r="56" cx="60" cy="60" />
          <circle
            className="donutChartGaugeArc"
            transform={`rotate(-90 60 60)`}
            r="56"
            cx="60"
            cy="60"
            style={{
              strokeDasharray: `${
                (percent / 100) * NUMBER_STROKE_DASH_ARRAY
              }, ${NUMBER_STROKE_DASH_ARRAY}`,
            }}
          />
        </svg>
      </div>
      <div className="donutChartPercentage">{percent}</div>
      {title && (
        <div className={classnames('donutChartLabel', titleClassName)}>
          {title}
        </div>
      )}
    </div>
  );
};

export default ChartDonut;

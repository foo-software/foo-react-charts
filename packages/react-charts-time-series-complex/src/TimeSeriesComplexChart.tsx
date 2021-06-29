import React, { useState } from 'react';
import classnames from 'classnames';
import useScores from './useScores';

const TimeSeriesComplexChart = ({
  className,
  data,
}: {
  className?: string;
  data: any;
}) => {
  const [shouldRedraw, setShouldRedraw] = useState(false);

  useScores({
    data,
    setShouldRedraw,
    shouldRedraw,
  });

  return (
    <div
      id="chartdiv"
      className={classnames('timeSeriesComplexChartRoot', className)}
    />
  );
};

export default TimeSeriesComplexChart;

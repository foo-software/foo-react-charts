import React from 'react';

export interface LineChartProps {
  label: string;
}

export const LineChart: React.FC<LineChartProps> = ({ label }) => (
  <div>{label}</div>
);

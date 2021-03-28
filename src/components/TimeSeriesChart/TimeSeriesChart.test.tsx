import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimeSeriesChart from './TimeSeriesChart';
import '@testing-library/jest-dom/extend-expect';

const mockData = [
  {
    date: '2021-03-23T14:00:11.340Z',
    value: 1000,
  },
  {
    date: '2021-03-24T14:00:11.340Z',
    value: 1500,
  },
  {
    date: '2021-03-25T14:00:11.340Z',
    value: 2000,
  },
];

describe('TimeSeriesChart', () => {
  test('renders component with tooltip', () => {
    render(
      <TimeSeriesChart
        data={mockData}
        height={100}
      />
    );

    const timeSeriesChartBarElement = screen.getByTestId('foo-time-series-chart-bar');
    userEvent.hover(timeSeriesChartBarElement);

    const tooltipElement = screen.getByText(/1,000|1,500|2,000/i);
    expect(tooltipElement).toBeInTheDocument();
  });

  test('renders component with tooltip using dollar prefix', () => {
    render(
      <TimeSeriesChart
        data={mockData}
        height={100}
        valuePrefix="$"
      />
    );

    const timeSeriesChartBarElement = screen.getByTestId('foo-time-series-chart-bar');
    userEvent.hover(timeSeriesChartBarElement);

    const tooltipElement = screen.getByText(/\$1,000|\$1,500|\$2,000/i);
    expect(tooltipElement).toBeInTheDocument();
  });
});
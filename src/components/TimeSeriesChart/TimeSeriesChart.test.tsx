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
  describe('tooltip', () => {
    test('displays value', () => {
      render(<TimeSeriesChart data={mockData} height={100} />);

      userEvent.hover(screen.getByTestId('time-series-chart-bar'));
      expect(screen.getByText(/1,000|1,500|2,000/i)).toBeInTheDocument();
    });

    test('displays value with prefix', () => {
      render(<TimeSeriesChart data={mockData} height={100} valuePrefix="$" />);

      userEvent.hover(screen.getByTestId('time-series-chart-bar'));
      expect(screen.getByText(/\$1,000|\$1,500|\$2,000/i)).toBeInTheDocument();
    });
  });
});

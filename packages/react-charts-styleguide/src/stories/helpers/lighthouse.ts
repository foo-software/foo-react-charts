import { getRandomNumber } from './number';

export const getMockMonthData = ({
  days,
  max,
  min,
  month,
}: {
  max: number;
  min: number;
  month: number;
  days: number;
}) => {
  const mockMonthData = [];
  for (let index = 1; index <= days; index++) {
    mockMonthData.push({
      date: new Date(`${month}/${index}/2021`),
      performance: getRandomNumber({ min, max }),
    });
  }
  return mockMonthData;
};

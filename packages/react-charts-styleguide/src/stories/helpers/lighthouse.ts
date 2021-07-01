import { getRandomNumber } from './number';

export const getMockMonthData = ({
  days,
  month,
}: {
  month: number;
  days: number;
}) => {
  const mockMonthData = [];
  for (let index = 1; index <= days; index++) {
    mockMonthData.push({
      accessibility: getRandomNumber({ min: 85, max: 90 }),
      bestPractices: getRandomNumber({ min: 90, max: 95 }),
      date: new Date(`${month}/${index}/2021`),
      performance: getRandomNumber({ min: 30, max: 99 }),
      progressiveWebApp: 50,
      seo: getRandomNumber({ min: 70, max: 80 }),
    });
  }
  return mockMonthData;
};

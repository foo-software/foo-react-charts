import { coinFlip, getRandomNumber } from './number';

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
    const shouldHaveAnnotation = coinFlip(10);
    mockMonthData.push({
      ...(shouldHaveAnnotation && {
        annotation:
          'hello world, this is some note about this particular Lighthouse run.',
      }),
      date: new Date(`${month}/${index}/2021`),
      id: 'abcd',
      performance: getRandomNumber({ min, max }),
    });
  }
  return mockMonthData;
};

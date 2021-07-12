import { coinFlip, getRandomNumber } from './number';

export const getMockMonthData = ({
  annotations = ['Hello world. This is an annotation'],
  customFields = {},
  days,
  field,
  max,
  min,
  month,
  shouldRound,
  toFixedNumber,
  year,
}: {
  annotations?: string[];
  customFields?: {
    [key: string]: any;
  };
  days: number;
  field: string;
  max: number;
  min: number;
  month: number;
  shouldRound?: boolean;
  toFixedNumber?: number;
  year: string;
}) => {
  const mockMonthData = [];
  for (let index = 1; index <= days; index++) {
    const shouldHaveAnnotation = coinFlip(10);
    mockMonthData.push({
      date: new Date(`${month}/${index}/${year}`),
      [field]: getRandomNumber({ min, max, shouldRound, toFixedNumber }),
      ...(shouldHaveAnnotation &&
        annotations.length && {
          annotation:
            annotations.length === 1
              ? annotations[0]
              : annotations[
                  getRandomNumber({ min: 0, max: annotations.length - 1 })
                ],
        }),
      ...customFields,
    });
  }
  return mockMonthData;
};

export const coinFlip = (percent: number) => Math.random() < percent / 100;

export const getRandomNumber = ({
  min = 1,
  max,
  shouldRound = true,
  toFixedNumber,
}: {
  min?: number;
  max: number;
  shouldRound?: boolean;
  toFixedNumber?: number;
}) => {
  const randomNumber = Math.random() * (max - min) + min;
  const formattedNumber = !shouldRound
    ? randomNumber
    : Math.round(randomNumber);
  return typeof toFixedNumber !== 'number'
    ? formattedNumber
    : parseFloat(formattedNumber.toFixed(toFixedNumber));
};

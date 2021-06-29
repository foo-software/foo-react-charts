// between 1 and the `max` argument
export const getRandomNumber = ({
  min = 1,
  max,
}: {
  min?: number;
  max: number;
}): number => Math.floor(Math.random() * (max - min) + min);

// https://developers.google.com/web/tools/lighthouse/v3/scoring
export const getPercentColor = (score: number) => {
  if (typeof score !== 'number') {
    return 'grey';
  }

  let scoreColor = 'green';

  // medium range
  if (score < 90) {
    scoreColor = 'orange';
  }

  // bad
  if (score < 50) {
    scoreColor = 'red';
  }

  return scoreColor;
};

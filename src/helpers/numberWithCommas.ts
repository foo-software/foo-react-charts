// https://stackoverflow.com/a/2901298
const numberWithCommas = (x: number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default numberWithCommas;

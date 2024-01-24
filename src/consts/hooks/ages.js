export const useAges = (bdate) => {
  const userBday = new Date(bdate).getTime();
  const currentDate = new Date().getTime();
  const diffInMilliseconds = currentDate - userBday;
  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const diffInYears = Math.floor(diffInMilliseconds / millisecondsPerYear);
  
  return diffInYears;
};

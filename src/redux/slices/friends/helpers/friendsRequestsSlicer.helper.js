export const friendsRequestsSlicer = (comms) => {
  const max = comms.length;
  const result = [];
  const chunkSize = 24;
  const interval = 5000;
  let i = 0;
  while (i < max) {
    result.push(comms.slice(i, i + chunkSize));
    i += chunkSize || max % chunkSize;
  }
  return result;
};

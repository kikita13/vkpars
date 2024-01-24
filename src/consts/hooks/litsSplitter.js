export const useListSplit = (text) => {
  const result = text
    ?.toLowerCase()
    .split(",")
    .map((word) => word.trim());
    
  return result;
};

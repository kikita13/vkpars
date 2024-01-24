export const friendsMapper = (array) => {
  const items = [];
  
  array
    .flat()
    .flat()
    .map((item) => items.push(...item.items));

  return items;
};

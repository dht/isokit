export const toObject = (arr: any[]) => {
  return arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
};

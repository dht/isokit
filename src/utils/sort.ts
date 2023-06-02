export const sortBy = (fields: string[]) => (a: any, b: any) => {
  return fields.reduce((acc, field) => {
    if (acc === 0) {
      if (a[field] > b[field]) {
        return 1;
      } else if (a[field] < b[field]) {
        return -1;
      }
    }

    return acc;
  }, 0);
};

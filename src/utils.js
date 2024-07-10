export const getCategoryNameById = (id, categories = []) => {
  const category = categories.find((category) => category.id === id);
  return category ? category.name : id;
};

export const isNewWithoutData = (row) => {
  const keys = Object.keys(row);
  return keys.length === 2 && keys.includes('isNew') && keys.includes('id');
};

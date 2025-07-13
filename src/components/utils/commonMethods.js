export const deepClone = (data) => JSON.parse(JSON.stringify(data));

export const findAndUpdate = (data, id, updateFn) => {
  return data.map((item) => {
    if (item.id === id) {
      return updateFn(item);
    }
    if (item.children) {
      return {
        ...item,
        children: findAndUpdate(item.children, id, updateFn),
      };
    }
    return item;
  });
};

export const calculateDifference = (original, current) => {
  if (!original || original.value === 0) return "0%";
  const diff = ((current.value - original.value) / original.value) * 100;
  return `${diff.toFixed(2)}%`;
};

export const updateParentValues = (node) => {
  if (!node.children) return node;
  const children = node.children.map(updateParentValues);
  const value = children.reduce((sum, c) => sum + c.value, 0);
  return { ...node, value, children };
};

export const rebalanceValues = (node, newTotal) => {
  if (!node.children) return { ...node, value: newTotal };

  const originalTotal = node.children.reduce((sum, c) => sum + c.value, 0);

  const children = node.children.map((child) => {
    const percentage = child.value / originalTotal;
    const newValue = parseFloat(newTotal * percentage);
    return rebalanceValues(child, newValue);
  });

  const newParentValue = children.reduce((sum, c) => sum + c.value, 0);
  return { ...node, value: newParentValue, children };
};

export const calculateTotalPrice = (tree) => {
  return tree.reduce((sum, item) => sum + item.value, 0);
};

export const deepClone = (data) => {
  if (typeof data !== "object" || data === null) return data;
  try {
    return JSON.parse(JSON.stringify(data));
  } catch {
    return data;
  }
};

export const findAndUpdate = (data, id, updateFn) => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => {
    if (!item || typeof item !== "object") return item;

    if (item.id === id) {
      return updateFn({ ...item });
    }

    if (Array.isArray(item.children)) {
      return {
        ...item,
        children: findAndUpdate(item.children, id, updateFn),
      };
    }

    return item;
  });
};

export const calculateDifference = (original, current) => {
  if (
    !original ||
    !current ||
    typeof original.value !== "number" ||
    typeof current.value !== "number" ||
    original.value === 0
  ) {
    return "0.00%";
  }

  const diff = ((current.value - original.value) / original.value) * 100;
  return `${diff.toFixed(2)}%`;
};

export const updateParentValues = (node) => {
  if (!node || typeof node !== "object") return node;

  if (!Array.isArray(node.children) || node.children.length === 0) {
    return { ...node, value: typeof node.value === "number" ? node.value : 0 };
  }

  const children = node.children.map(updateParentValues);
  const value = children.reduce(
    (sum, c) => sum + (typeof c.value === "number" ? c.value : 0),
    0
  );

  return { ...node, value, children };
};

export const rebalanceValues = (node, newTotal) => {
  if (!node || typeof node !== "object") return node;

  if (!Array.isArray(node.children) || node.children.length === 0) {
    return { ...node, value: typeof newTotal === "number" ? newTotal : 0 };
  }

  const originalTotal = node.children.reduce(
    (sum, c) => sum + (typeof c.value === "number" ? c.value : 0),
    0
  );

  const base = originalTotal === 0 ? 1 : originalTotal;

  const children = node.children.map((child) => {
    const percentage =
      (typeof child.value === "number" ? child.value : 0) / base;
    const newValue = parseFloat((newTotal * percentage).toFixed(2));
    return rebalanceValues(child, newValue);
  });

  const newParentValue = children.reduce(
    (sum, c) => sum + (typeof c.value === "number" ? c.value : 0),
    0
  );

  return { ...node, value: newParentValue, children };
};

export const calculateTotalPrice = (tree) => {
  if (!Array.isArray(tree)) return 0;

  return tree.reduce(
    (sum, item) => sum + (typeof item.value === "number" ? item.value : 0),
    0
  );
};

// Parses GET /estimate/get-all-design-options response.
// Shape: { "Flooring": [{ items: [{ _id, label, category, ... }], category }], ... }
export const parseDesignOptionsResponse = (data) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { categories: [], optionsByCategory: {} };
  }

  const categories = Object.keys(data);
  const optionsByCategory = {};

  for (const key of categories) {
    const entry = data[key];

    if (Array.isArray(entry)) {
      if (entry[0] && Array.isArray(entry[0].items)) {
        optionsByCategory[key] = entry[0].items;
      } else {
        optionsByCategory[key] = entry;
      }
    } else if (entry && Array.isArray(entry.items)) {
      optionsByCategory[key] = entry.items;
    } else {
      optionsByCategory[key] = [];
    }
  }

  return { categories, optionsByCategory };
};

export const getSelectedDesignOptionIds = (designAns) =>
  designAns
    .map((answer) => {
      const selected = Object.values(answer)[0];
      return selected?._id ?? selected?.id;
    })
    .filter(Boolean);

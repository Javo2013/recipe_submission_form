export function validateField(name, value) {
  const trimmed = typeof value === "string" ? value.trim() : value;

  if (name === "title") {
    if (!trimmed) return "Title is required.";
    if (trimmed.length < 3) return "Title must be at least 3 characters.";
    if (trimmed.length > 50) return "Title must be under 50 characters.";
  }

  if (name === "description") {
    if (!trimmed) return "Description is required.";
    if (trimmed.length < 10) return "Description must be at least 10 characters.";
    if (trimmed.length > 500) return "Description must be under 500 characters.";
  }

  if (name === "servings") {
    if (!trimmed) return "Servings is required.";
    const num = Number(trimmed);
    if (Number.isNaN(num)) return "Servings must be a number.";
    if (num < 1 || num > 20) return "Servings must be between 1 and 20.";
  }

  if (["difficulty", "category", "cuisine"].includes(name)) {
    if (!trimmed) return "This field is required.";
  }

  return "";
}

export function validateRecipeForm(data) {
  const errors = {};

  errors.title = validateField("title", data.title);
  errors.description = validateField("description", data.description);
  errors.servings = validateField("servings", data.servings);
  errors.difficulty = validateField("difficulty", data.difficulty);
  errors.category = validateField("category", data.category);
  errors.cuisine = validateField("cuisine", data.cuisine);

  // remove empty errors
  Object.keys(errors).forEach((key) => {
    if (!errors[key]) delete errors[key];
  });

  return errors;
}
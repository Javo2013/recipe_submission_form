// Validates a single field (used for live validation)
export function validateField(name, value) {
  const trimmed = typeof value === "string" ? value.trim() : value;

  // Title validation
  if (name === "title") {
    if (!trimmed) return "Title is required.";
    if (trimmed.length < 3) return "Title must be at least 3 characters.";
    if (trimmed.length > 50) return "Title must be 50 characters or less.";
  }

  // Description validation
  if (name === "description") {
    if (!trimmed) return "Description is required.";
    if (trimmed.length < 10) return "Description must be at least 10 characters.";
    if (trimmed.length > 500) return "Description must be 500 characters or less.";
  }

  // Servings validation
  if (name === "servings") {
    if (!trimmed) return "Servings is required.";
    const num = Number(trimmed);
    if (Number.isNaN(num)) return "Servings must be a number.";
    if (num < 1 || num > 20) return "Servings must be between 1 and 20.";
  }

  // Required dropdowns
  if (["difficulty", "category", "cuisine"].includes(name)) {
    if (!trimmed) return "This field is required.";
  }

  return "";
}

//Validates the entire form (used on submit)
export function validateRecipeForm(data) {
  const errors = {};

  // required base fields
  errors.title = validateField("title", data.title);
  errors.description = validateField("description", data.description);
  errors.servings = validateField("servings", data.servings);
  errors.difficulty = validateField("difficulty", data.difficulty);
  errors.category = validateField("category", data.category);
  errors.cuisine = validateField("cuisine", data.cuisine);

  //Ingredients validation (must have at least 1 ingredient)
  if (!data.ingredients || data.ingredients.length === 0) {
    errors.ingredients = "At least one ingredient is required.";
  } else {
    const ingredientErrors = data.ingredients.map((ing) => {
      const ingErr = {};

      if (!ing.name.trim()) ingErr.name = "Ingredient name is required.";
      if (ing.name.trim().length > 50) ingErr.name = "Name must be under 50 characters.";
      if (ing.name.trim().length > 0 && ing.name.trim().length < 2)
        ingErr.name = "Name must be at least 2 characters.";

      if (!ing.quantity) ingErr.quantity = "Quantity is required.";
      const qty = Number(ing.quantity);
      if (Number.isNaN(qty)) ingErr.quantity = "Quantity must be a number.";
      if (!Number.isNaN(qty) && (qty < 0.1 || qty > 1000))
        ingErr.quantity = "Quantity must be between 0.1 and 1000.";

      if (!ing.unit.trim()) ingErr.unit = "Unit is required.";

      return ingErr;
    });

    // only keep if there's at least 1 error inside
    const hasIngredientErrors = ingredientErrors.some((obj) => Object.keys(obj).length > 0);
    if (hasIngredientErrors) errors.ingredients = ingredientErrors;
  }

  // Instructions validation (must have at least 1 step)
  if (!data.instructions || data.instructions.length === 0) {
    errors.instructions = "At least one instruction step is required.";
  } else {
    const stepErrors = data.instructions.map((step) => {
      if (!step.trim()) return "Step cannot be empty.";
      if (step.trim().length < 3) return "Step must be at least 3 characters.";
      return "";
    });

    const hasStepErrors = stepErrors.some((msg) => msg !== "");
    if (hasStepErrors) errors.instructions = stepErrors;
  }

  // Image URL validation (optional but must be valid-ish if filled)
  if (data.imageUrl.trim() !== "") {
    const looksLikeUrl =
      data.imageUrl.startsWith("http://") || data.imageUrl.startsWith("https://");
    if (!looksLikeUrl) {
      errors.imageUrl = "Image URL must start with http:// or https://";
    }
  }

  // cleanup: remove empty string errors
  Object.keys(errors).forEach((key) => {
    if (errors[key] === "") delete errors[key];
  });

  return errors;
}
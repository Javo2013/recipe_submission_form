import { useState } from "react";
import { validateField, validateRecipeForm } from "../utils/validation";

function RecipeSubmissionForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    servings: "",
    difficulty: "",
    category: "",
    cuisine: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    instructions: [""],
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const message = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // ✅ Ingredients
  const handleIngredientChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.ingredients];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, ingredients: updated };
    });
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "", unit: "" }],
    }));
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  // ✅ Instructions
  const handleInstructionChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.instructions];
      updated[index] = value;
      return { ...prev, instructions: updated };
    });
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const removeInstruction = (index) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateRecipeForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    console.log("Submitted:", formData);
  };

  return (
    <div>
      <h2>Recipe Submission Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter recipe title..."
          />
          {touched.title && errors.title && <p>{errors.title}</p>}
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter description..."
            rows="4"
          />
          {touched.description && errors.description && <p>{errors.description}</p>}
        </div>

        <div>
          <label>Servings</label>
          <input
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="1-20"
          />
          {touched.servings && errors.servings && <p>{errors.servings}</p>}
        </div>

        <div>
          <label>Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select difficulty...</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          {touched.difficulty && errors.difficulty && <p>{errors.difficulty}</p>}
        </div>

        <div>
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select category...</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Side Dish">Side Dish</option>
            <option value="Beverage">Beverage</option>
          </select>
          {touched.category && errors.category && <p>{errors.category}</p>}
        </div>

        <div>
          <label>Cuisine Type</label>
          <select
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select cuisine...</option>
            <option value="American">American</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Asian">Asian</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Other">Other</option>
          </select>
          {touched.cuisine && errors.cuisine && <p>{errors.cuisine}</p>}
        </div>

        {/* ✅ Ingredients */}
        <div>
          <h3>Ingredients</h3>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Ingredient name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
              />
              <input
                type="number"
                placeholder="Qty"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
              />
              <select
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
              >
                <option value="">Unit</option>
                <option value="cups">cups</option>
                <option value="tablespoons">tablespoons</option>
                <option value="teaspoons">teaspoons</option>
                <option value="ounces">ounces</option>
                <option value="pounds">pounds</option>
                <option value="grams">grams</option>
                <option value="pieces">pieces</option>
              </select>

              {formData.ingredients.length > 1 && (
                <button type="button" onClick={() => removeIngredient(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            + Add Ingredient
          </button>
        </div>

        {/* ✅ Instructions */}
        <div style={{ marginTop: "20px" }}>
          <h3>Instructions</h3>

          {formData.instructions.map((step, index) => (
            <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <input
                type="text"
                placeholder={`Step ${index + 1}`}
                value={step}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
              />

              {formData.instructions.length > 1 && (
                <button type="button" onClick={() => removeInstruction(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addInstruction}>
            + Add Step
          </button>
        </div>

        <button type="submit" style={{ marginTop: "20px" }}>
          Submit Recipe
        </button>
      </form>
    </div>
  );
}

export default RecipeSubmissionForm;
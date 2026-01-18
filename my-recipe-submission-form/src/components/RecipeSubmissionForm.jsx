import { useState } from "react";
import { validateField, validateRecipeForm } from "../utils/validation";
import "./RecipeSubmissionForm.css";

function RecipeSubmissionForm() {
  // ✅ Default form structure (used for reset)
  const defaultForm = {
    title: "",
    description: "",
    servings: "",
    difficulty: "",
    category: "",
    cuisine: "",
    imageUrl: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    instructions: [""],
  };

  // ✅ Main state for controlled form
  const [formData, setFormData] = useState(defaultForm);

  // ✅ Real-time error messages
  const [errors, setErrors] = useState({});

  // ✅ Tracks what fields user touched (for showing errors only after interacting)
  const [touched, setTouched] = useState({});

  // ✅ Stores the last submitted recipe (for success card)
  const [submittedRecipe, setSubmittedRecipe] = useState(null);

  // ✅ Handles changes for normal inputs/selects/textarea
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ✅ Live validate this single field
    const message = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  // ✅ Marks field as touched when user leaves input
  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // ✅ INGREDIENTS: update one ingredient field
  const handleIngredientChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedIngredients = [...prev.ingredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [field]: value,
      };
      return { ...prev, ingredients: updatedIngredients };
    });
  };

  // ✅ INGREDIENTS: add new ingredient row
  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "", unit: "" }],
    }));
  };

  // ✅ INGREDIENTS: remove ingredient row
  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  // ✅ INSTRUCTIONS: update one instruction step
  const handleInstructionChange = (index, value) => {
    setFormData((prev) => {
      const updatedSteps = [...prev.instructions];
      updatedSteps[index] = value;
      return { ...prev, instructions: updatedSteps };
    });
  };

  // ✅ INSTRUCTIONS: add a step
  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  // ✅ INSTRUCTIONS: remove a step
  const removeInstruction = (index) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }));
  };

  // ✅ Submit handler with full validation
  const handleSubmit = (event) => {
    event.preventDefault();

    // ✅ validate entire form on submit
    const validationErrors = validateRecipeForm(formData);
    setErrors(validationErrors);

    // ✅ touch all required fields so errors show if missing
    setTouched({
      title: true,
      description: true,
      servings: true,
      difficulty: true,
      category: true,
      cuisine: true,
    });

    // ✅ stop submit if errors exist
    if (Object.keys(validationErrors).length > 0) return;

    // ✅ show success card
    setSubmittedRecipe(formData);

    // ✅ reset form after successful submission
    setFormData(defaultForm);
    setErrors({});
    setTouched({});
  };

  return (
    <div className="formWrapper">
      <h2 className="formTitle">Recipe Submission Form</h2>

      {/* ✅ Success Card */}
      {submittedRecipe && (
        <div className="successCard">
          <h3>✅ Recipe Submitted!</h3>
          <h4>{submittedRecipe.title}</h4>
          <p>{submittedRecipe.description}</p>

          <p>
            <strong>Servings:</strong> {submittedRecipe.servings}
          </p>
          <p>
            <strong>Difficulty:</strong> {submittedRecipe.difficulty}
          </p>
          <p>
            <strong>Category:</strong> {submittedRecipe.category}
          </p>
          <p>
            <strong>Cuisine:</strong> {submittedRecipe.cuisine}
          </p>

          {submittedRecipe.imageUrl.trim() !== "" && (
            <img
              src={submittedRecipe.imageUrl}
              alt="Recipe"
              className="previewImg"
            />
          )}

          <h4 className="sectionTitle">Ingredients</h4>
          <ul>
            {submittedRecipe.ingredients.map((ing, i) => (
              <li key={i}>
                {ing.quantity} {ing.unit} - {ing.name}
              </li>
            ))}
          </ul>

          <h4 className="sectionTitle">Instructions</h4>
          <ol>
            {submittedRecipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {/* ✅ Form */}
      <form onSubmit={handleSubmit} className="formGrid">
        {/* Title */}
        <div className="field">
          <label>Recipe Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter recipe title..."
          />
          {touched.title && errors.title && (
            <p className="errorText">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="field">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter description..."
            rows="4"
          />
          {touched.description && errors.description && (
            <p className="errorText">{errors.description}</p>
          )}
        </div>

        {/* Servings */}
        <div className="field">
          <label>Servings</label>
          <input
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="1-20"
          />
          {touched.servings && errors.servings && (
            <p className="errorText">{errors.servings}</p>
          )}
        </div>

        {/* Difficulty */}
        <div className="field">
          <label>Difficulty Level</label>
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
          {touched.difficulty && errors.difficulty && (
            <p className="errorText">{errors.difficulty}</p>
          )}
        </div>

        {/* Category */}
        <div className="field">
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
          {touched.category && errors.category && (
            <p className="errorText">{errors.category}</p>
          )}
        </div>

        {/* Cuisine */}
        <div className="field">
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
          {touched.cuisine && errors.cuisine && (
            <p className="errorText">{errors.cuisine}</p>
          )}
        </div>

        {/* Image URL */}
        <div className="field">
          <label>Recipe Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Image Preview */}
        {formData.imageUrl.trim() !== "" && (
          <img
            src={formData.imageUrl}
            alt="Recipe Preview"
            className="previewImg"
          />
        )}

        {/* Ingredients */}
        <h3 className="sectionTitle">Ingredients</h3>

        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="row">
            <input
              type="text"
              placeholder="Ingredient name"
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Qty"
              value={ingredient.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
            />

            <select
              value={ingredient.unit}
              onChange={(e) =>
                handleIngredientChange(index, "unit", e.target.value)
              }
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

            {formData.ingredients.length > 1 ? (
              <button
                type="button"
                className="btn btnDanger"
                onClick={() => removeIngredient(index)}
              >
                Remove
              </button>
            ) : (
              <div />
            )}
          </div>
        ))}

        <button type="button" className="btn" onClick={addIngredient}>
          + Add Ingredient
        </button>

        {/* Instructions */}
        <h3 className="sectionTitle">Instructions</h3>

        {formData.instructions.map((step, index) => (
          <div key={index} style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder={`Step ${index + 1}`}
              value={step}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
            />

            {formData.instructions.length > 1 && (
              <button
                type="button"
                className="btn btnDanger"
                onClick={() => removeInstruction(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" className="btn" onClick={addInstruction}>
          + Add Step
        </button>

        {/* Submit */}
        <button className="btn" type="submit">
          Submit Recipe
        </button>
      </form>
    </div>
  );
}

export default RecipeSubmissionForm;
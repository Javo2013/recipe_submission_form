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
  });

  // errors for each input
  const [errors, setErrors] = useState({});

  // marks fields as touched so errors appear while typing
  const [touched, setTouched] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // live validation for this field
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateRecipeForm(formData);
    setErrors(validationErrors);

    // if any errors exist, stop
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

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
}

export default RecipeSubmissionForm;
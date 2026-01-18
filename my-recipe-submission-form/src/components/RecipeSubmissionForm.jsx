import { useState } from "react";

function RecipeSubmissionForm() {
  // formData object state (controlled form)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    servings: "",
    difficulty: "",
    category: "",
    cuisine: "",
  });

  // updates formData when user types/selects
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
            placeholder="Enter recipe title..."
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description..."
            rows="4"
          />
        </div>

        <div>
          <label>Servings</label>
          <input
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            placeholder="1-20"
          />
        </div>

        <div>
          <label>Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="">Select difficulty...</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category...</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Side Dish">Side Dish</option>
            <option value="Beverage">Beverage</option>
          </select>
        </div>

        <div>
          <label>Cuisine Type</label>
          <select
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
          >
            <option value="">Select cuisine...</option>
            <option value="American">American</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Asian">Asian</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
}

export default RecipeSubmissionForm;
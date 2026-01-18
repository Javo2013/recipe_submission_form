function RecipeSubmissionForm() {
  return (
    <div>
      <h2>Recipe Submission Form</h2>

      <form>
        <div>
          <label>Recipe Title</label>
          <input type="text" placeholder="Enter recipe title..." />
        </div>

        <div>
          <label>Description</label>
          <textarea placeholder="Enter description..." rows="4"></textarea>
        </div>

        <div>
          <label>Servings</label>
          <input type="number" placeholder="1-20" />
        </div>

        <div>
          <label>Difficulty</label>
          <select>
            <option value="">Select difficulty...</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label>Category</label>
          <select>
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
          <select>
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
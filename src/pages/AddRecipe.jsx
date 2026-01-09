import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipe=()=>{
  const [form, setForm] = useState({
    strMeal: "",
    strCategory: "",
    strMealThumb: "",
    strIngredients: "",
    strInstructions: "",
  });

  const navigate = useNavigate();
  const handleChange = e => {
    setForm({ ...form, [e.target.name]:e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    const recipes = JSON.parse(localStorage.getItem("myRecipes")) || [];
    recipes.push({ ...form, id: Date.now()});
    localStorage.setItem("myRecipes", JSON.stringify(recipes));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} 
      className="p-6 max-w-xl mx-auto space-y-3">

      <input name="strMeal" placeholder="Name" 
      onChange={handleChange} 
      className="border p-3 w-full" />
      <input name="strCategory" placeholder="Category" 
      onChange={handleChange} 
      className="border p-3 w-full" />
      <input name="strMealThumb" placeholder="Image URL" 
      onChange={handleChange} 
      className="border p-3 w-full" />
      <textarea name="strIngredients" placeholder="Ingredients" 
      onChange={handleChange} 
      className="border p-3 w-full" />
      <textarea name="strInstructions" placeholder="Instructions" 
      onChange={handleChange} 
      className="border p-3 w-full" />
      
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>

    </form>
  );
}

export default AddRecipe;
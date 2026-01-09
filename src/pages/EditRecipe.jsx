import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem("myRecipes")) || [];
    const found = recipes.find(r => r.id === Number(id));
    setForm(found);
  },[id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const recipes = JSON.parse(localStorage.getItem("myRecipes")) || [];
    const updated = recipes.map(r =>
      r.id === Number(id) ? form : r
    );
    localStorage.setItem("myRecipes", JSON.stringify(updated));
    navigate("/");
  };

  if(!form) return null;

  return (
    <form onSubmit={handleSubmit} 
     className="p-6 max-w-xl mx-auto space-y-3">
      <input name="strMeal" value={form.strMeal} 
      onChange={handleChange} className="border p-2 w-full" />
      <input name="strCategory" value={form.strCategory} 
      onChange={handleChange} className="border p-2 w-full" />
      <input name="strMealThumb" value={form.strMealThumb} 
      onChange={handleChange} className="border p-2 w-full" />
      <textarea name="strIngredients" value={form.strIngredients} 
      onChange={handleChange} className="border p-2 w-full" />
      <textarea name="strInstructions" value={form.strInstructions} 
      onChange={handleChange} className="border p-2 w-full" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
}

export default EditRecipe;
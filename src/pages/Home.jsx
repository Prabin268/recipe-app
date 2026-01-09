import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [customRecipes, setCustomRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const init = async () => {
      const stored = JSON.parse(localStorage.getItem("myRecipes")) || [];
      setCustomRecipes(stored);

      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    };

    init();
  }, []);

  const fetchRecipes = async (query) => {
    if (!query.trim()) return;

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await res.json();
    setRecipes(data.meals || []);
  };

  const deleteRecipe = (id) => {
    const updated = customRecipes.filter(r => r.id !== id);
    setCustomRecipes(updated);
    localStorage.setItem("myRecipes", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen p-6 bg-blue-200">
      <form onSubmit={(e) => {
        e.preventDefault();
        fetchRecipes(search);
      }}
        className="flex gap-2 mb-4">
        <input className="border p-2 w-full" placeholder="Search recipe" value={search}
          onChange={(e) => setSearch(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white px-4">
          Search
        </button>
      </form>
      <Link to="/add" className="inline-block bg-green-600 text-white px-4 py-2 rounded mb-4">
        + Add Recipe
      </Link>

      <h2 className="text-xl font-bold mt-6">TheMealDB Recipes</h2>
      {recipes.length === 0 && search && (
        <p className="text-gray-500">
          No recipes found.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-4 mt-3">
        {recipes.map(r => (<RecipeCard key={r.idMeal} recipe={r} />))}
      </div>
      <h2 className="text-xl font-bold mt-6">Original Recipes</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-3">
        {customRecipes.map(r => (
          <RecipeCard key={r.id} recipe={r}
            isLocal onDelete={() => deleteRecipe(r.id)} />
        ))}
      </div>
    </div>
  );
};

export default Home;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("myRecipes")) || [];
    const found = local.find(r => r.id === Number(id));

    if (found) {
      setRecipe(found);
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => setRecipe(data.meals?.[0]));
    }
  }, [id]);

  if (!recipe) 
  return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={recipe.strMealThumb} className="w-full rounded" />
      <h1 className="text-2xl font-bold mt-4">{recipe.strMeal}</h1>
      <p className="italic">{recipe.strCategory}</p>
      <h2 className="font-bold mt-4">Ingredients</h2>
      <ul className="list-disc ml-6">
        {recipe.strIngredients?recipe.strIngredients.split(",").map((ing, i) => (
            <li key={i}>{ing}</li>
          ))
          : Array.from({ length: 20 }).map((_, i) => {
            const ingredient = recipe[`strIngredient${i + 1}`];
            return ingredient ? <li key={i}>{ingredient}</li> : null;
          })}
      </ul>
      <h2 className="font-bold mt-4">Instructions</h2>
      <p>{recipe.strInstructions}</p>
    </div>
  );
}

export default RecipeDetail;
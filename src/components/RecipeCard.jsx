import { Link } from "react-router-dom";

const RecipeCard=({ recipe, isLocal, onDelete })=>{
  const id = isLocal ? recipe.id : recipe.idMeal;

  return (
    <div className="border p-3 rounded">
      <img src={recipe.strMealThumb || "https://via.placeholder.com/300"} className="w-full h-40 object-cover rounded"/>
      <h3 className="font-bold mt-2">{recipe.strMeal}</h3>
      <p className="text-sm">{recipe.strCategory}</p>
      <Link to={`/recipe/${id}`} className="text-blue-500 text-sm">View</Link>
      {isLocal && (
        <div className="flex gap-3 mt-2 text-sm">
          <Link to={`/edit/${id}`} className="text-green-600">Edit</Link>
          <button onClick={onDelete} className="text-red-500">Delete</button>
        </div>
      )}
    </div>
  );
}

export default RecipeCard;
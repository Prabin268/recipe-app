import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';

const App = () =>  {
  return (
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/recipe/:id" element={<RecipeDetail/>} />
          <Route path="/add" element={<AddRecipe/>} />
          <Route path="/edit/:id" element={<EditRecipe/>}/>
        </Routes>
  );
}

export default App;
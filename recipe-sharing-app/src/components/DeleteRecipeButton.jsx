// src/components/DeleteRecipeButton.js
import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate('/'); // Redirect to the main recipe list after deletion
  };

  return (
    <button onClick={handleDelete}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch the recipe data from the JSON file
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        const selectedRecipe = data.find((recipe) => recipe.id === parseInt(id));
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error('Error fetching recipe:', error));
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg  shadow-lg mb-6" />
      <p className="text-gray-700 mb-6">{recipe.summary}</p>
      
      {/* Ingredients Section */}
      <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
      <ul className="list-disc list-inside mb-6">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-600">{ingredient}</li>
        ))}
      </ul>

      {/* Instructions Section */}
      <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
      <ol className="list-decimal list-inside">
        {recipe.instructions.map((step, index) => (
          <li key={index} className="text-gray-600 mb-2">{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;

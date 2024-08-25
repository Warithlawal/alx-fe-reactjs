// src/recipeStore.js
import create from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  
  setSearchTerm: (term) => set((state) => {
    const lowerCaseTerm = term.toLowerCase();
    return {
      searchTerm: lowerCaseTerm,
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(lowerCaseTerm) ||
        (recipe.ingredients && recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(lowerCaseTerm)
        )) ||
        (recipe.prepTime && recipe.prepTime <= Number(lowerCaseTerm))
      ),
    };
  }),

  addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, newRecipe],
    filteredRecipes: [...state.recipes, newRecipe].filter((recipe) =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    ),
  })),

  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter((recipe) => recipe.id !== id),
    filteredRecipes: state.filteredRecipes.filter((recipe) => recipe.id !== id),
  })),

  updateRecipe: (updatedRecipe) => set((state) => {
    const updatedRecipes = state.recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    };
  }),

  setRecipes: (recipes) => set({ recipes, filteredRecipes: recipes }),
}));

export { useRecipeStore };

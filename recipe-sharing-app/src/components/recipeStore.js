// src/recipeStore.js
import create from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [],
  searchTerm: '',
  filteredRecipes: [],
  recommendations: [],

  // Action to add a new recipe to the store
  addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, newRecipe],
  })),

  // Action to remove a recipe from the favorites
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter((id) => id !== recipeId),
  })),

  // Action to add a recipe to the favorites
  addFavorite: (recipeId) => set((state) => ({
    favorites: [...state.favorites, recipeId],
  })),

  // Action to update the search term and filter the recipes
  setSearchTerm: (term) => set({ searchTerm: term }),
  filterRecipes: () => set((state) => ({
    filteredRecipes: state.recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    ),
  })),

  // Action to generate recommendations based on favorites
  generateRecommendations: () => set((state) => {
    const recommended = state.recipes.filter(
      (recipe) =>
        state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    return { recommendations: recommended };
  }),

  // Action to set the initial list of recipes
  setRecipes: (recipes) => set({ recipes }),
}));

export { useRecipeStore };

// src/recipeStore.js
import create from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [],
  
  addFavorite: (recipeId) => set((state) => ({
    favorites: [...state.favorites, recipeId],
  })),
  
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter((id) => id !== recipeId),
  })),
  
  recommendations: [],
  
  generateRecommendations: () => set((state) => {
    // Simple mock recommendation logic based on favorite recipes
    const recommended = state.recipes.filter((recipe) =>
      state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    return { recommendations: recommended };
  }),
  
  setRecipes: (recipes) => set({ recipes }),
}));

export { useRecipeStore };

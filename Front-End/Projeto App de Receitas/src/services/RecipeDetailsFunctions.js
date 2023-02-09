import { toast } from 'react-toastify';

const copy = require('clipboard-copy');

export const copyToClipBoard = (pathname) => {
  copy(`http://localhost:3000${pathname}`);
  toast.success('Link copied!');
};

export const saveFavoriteRecipe = (
  pathname, recipe, favoriteRecipes, setFavoriteRecipes,
) => {
  const favObject = {
    id: (pathname.includes('/foods') ? recipe.idMeal : recipe.idDrink),
    type: (pathname.includes('/foods') ? 'food' : 'drink'),
    nationality: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: (pathname.includes('/foods') ? '' : recipe.strAlcoholic),
    name: (pathname.includes('/foods') ? recipe.strMeal : recipe.strDrink),
    image: (pathname.includes('/foods') ? recipe.strMealThumb : recipe.strDrinkThumb),
  };
  let newFavoriteRecipes = [];
  if (favoriteRecipes.some((item) => pathname.includes(item.id))) {
    newFavoriteRecipes = favoriteRecipes.filter(
      (item) => (item.id !== favObject.id),
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setFavoriteRecipes(newFavoriteRecipes);
    toast.warning('Unfavorited recipe!', { style: { backgroundColor: '#e74c3c' } });
  } else {
    newFavoriteRecipes = [
      ...favoriteRecipes,
      favObject,
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setFavoriteRecipes(newFavoriteRecipes);
    toast.success('Added to favorites!');
  }
};

export const returnPage = (history) => {
  const { location: { pathname } } = history;
  if (pathname.includes('/foods')) {
    history.push('/foods');
  } else {
    history.push('/drinks');
  }
};

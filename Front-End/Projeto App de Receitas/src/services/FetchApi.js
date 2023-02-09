export const fetchDrinks = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  return (resultFetch.drinks.filter((item, index) => index < +'12'));
};

export const fetchFoods = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const resultFetch = await fetch(endpoint)
    .then((result) => result.json()).then((json) => json);
  const filteredFilter = resultFetch.meals.slice(0, +'12');
  return (filteredFilter);
};

export const fetchDrinksByName = async (name) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  if (resultFetch.drinks === null) {
    return [resultFetch.drinks];
  }
  return (resultFetch.drinks.filter((item, index) => index < +'12'));
};

export const fetchFoodsByName = async (name) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  if (resultFetch.meals === null) {
    return [resultFetch.meals];
  }
  return (resultFetch.meals.filter((item, index) => index < +'12'));
};

export const fetchDrinksByFirstLetter = async (letter) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  if (resultFetch.drinks === null) {
    return [resultFetch.drinks];
  }
  return (resultFetch.drinks.filter((item, index) => index < +'12'));
};

export const fetchFoodsByFirstLetter = async (letter) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  if (resultFetch.meals === null) {
    return [resultFetch.meals];
  }
  return (resultFetch.meals.filter((item, index) => index < +'12'));
};

export const fetchDrinksByIngredient = async (ingredient) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  if (resultFetch.drinks === null) {
    return [resultFetch.drinks];
  }
  return (resultFetch.drinks.filter((item, index) => index < +'12'));
};

export const fetchFoodsByIngredient = async (ingredient) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  if (resultFetch.meals === null) {
    return [resultFetch.meals];
  }
  return (resultFetch.meals.filter((item, index) => index < +'12'));
};

export const fetchDrinkById = async (id) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  return (resultFetch.drinks);
};

export const fetchFoodById = async (id) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  return (resultFetch.meals);
};

export const fetchCategoryDrinks = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  return (resultFetch.drinks.filter((item, index) => index < +'5'));
};

export const fetchCategoryFoods = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  return (resultFetch.meals.filter((item, index) => index < +'5'));
};

export const fetchDrinksByCategory = async (category) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  return resultFetch.drinks.filter((item, index) => index < +'12');
};

export const fetchFoodsByCategory = async (category) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  return resultFetch.meals.filter((item, index) => index < +'12');
};

export const fetchDrinkRecomendations = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  return (resultFetch.drinks.filter((item, index) => index < +'6'));
};

export const fetchFoodRecomendations = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const resultFetch = await fetch(endpoint).then((result) => result.json());
  return (resultFetch.meals.filter((item, index) => index < +'6'));
};

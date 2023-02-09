import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  fetchCategoryDrinks,
  fetchCategoryFoods,
  fetchDrinks,
  fetchDrinksByCategory,
  fetchDrinksByFirstLetter,
  fetchDrinksByIngredient,
  fetchDrinksByName,
  fetchFoods,
  fetchFoodsByCategory,
  fetchFoodsByFirstLetter, fetchFoodsByIngredient, fetchFoodsByName,
} from '../services/FetchApi';

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
  const history = useHistory();
  const [data, setData] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  // const [inProgressRecipes, setInProgressRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categories, setCategories] = useState({
    foodCategories: [],
    drinkCategories: [],
    currentCategory: { category: 'All', pathname: '' },
  });

  useEffect(() => {
    const storageDoneRecipes = localStorage.getItem('doneRecipes')
    || JSON.stringify([]);
    setDoneRecipes(JSON.parse(storageDoneRecipes));
    const storageFavoriteRecipes = localStorage.getItem('favoriteRecipes')
    || JSON.stringify([]);
    setFavoriteRecipes(JSON.parse(storageFavoriteRecipes));
  }, []);

  useEffect(() => {
    const getCaregories = async () => {
      const foodCategories = await fetchCategoryFoods();
      const drinkCategories = await fetchCategoryDrinks();
      setCategories((oldState) => ({
        ...oldState,
        foodCategories,
        drinkCategories,
      }));
    };
    getCaregories();
  }, []);

  useEffect(() => {
    const fetchCategoryFilter = async () => {
      let newData = [];
      if (categories.currentCategory.pathname === '/foods') {
        switch (categories.currentCategory.category) {
        case 'All': {
          newData = await fetchFoods();
          setData(newData);
          break;
        }
        default: {
          newData = await fetchFoodsByCategory(categories.currentCategory.category);
          setData(newData);
        }
        }
      }
      if (categories.currentCategory.pathname === '/drinks') {
        switch (categories.currentCategory.category) {
        case 'All': {
          newData = await fetchDrinks();
          setData(newData);
          break;
        }
        default: {
          newData = await fetchDrinksByCategory(categories.currentCategory.category);
          setData(newData);
        }
        }
      }
    };
    fetchCategoryFilter();
  }, [categories.currentCategory]);

  const newSearch = async ({ option, value }, pathname) => {
    let newData = [];
    if (pathname === '/foods') {
      switch (option) {
      case 'ingredient': {
        newData = await fetchFoodsByIngredient(value);
        break;
      }
      case 'name': {
        newData = await fetchFoodsByName(value);
        break;
      }
      default: {
        newData = await fetchFoodsByFirstLetter(value);
      }
      }
      if (newData.length > 1) {
        setData(newData);
      } else if (newData[0] !== null) {
        history.push(`/foods/${newData[0].idMeal}`);
      }
    } else {
      switch (option) {
      case 'ingredient': {
        newData = await fetchDrinksByIngredient(value);
        break;
      }
      case 'name': {
        newData = await fetchDrinksByName(value);
        break;
      }
      default: {
        newData = await fetchDrinksByFirstLetter(value);
      }
      }
      if (newData.length > 1) {
        setData(newData);
      } else if (newData[0] !== null) {
        history.push(`/drinks/${newData[0].idDrink}`);
      }
    }
    if (newData[0] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const updateCategoryFilter = (category, pathname) => {
    setCategories((oldState) => ({
      ...oldState,
      currentCategory: category === oldState.currentCategory.category
        ? { category: 'All', pathname } : { category, pathname },
    }));
  };

  const contextValue = {
    data,
    setData,
    doneRecipes,
    setDoneRecipes,
    favoriteRecipes,
    setFavoriteRecipes,
    newSearch,
    categories,
    updateCategoryFilter,
    filteredRecipes,
    setFilteredRecipes,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

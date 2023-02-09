import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import CheckboxIngredients from './CheckboxIngredients';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipeContext from '../context/RecipeContext';
import { fetchDrinkById, fetchFoodById } from '../services/FetchApi';
import SectionLine from './SectionLine';

const copy = require('clipboard-copy');

function DrinkInProgress(props) {
  const { recipe, path, id, history } = props;
  const ingredients = [];

  const [recipes, setRecipes] = useState({});
  const [favoriteIcon, setFavoriteIcon] = useState('');

  const { setFavoriteRecipes, favoriteRecipes } = useContext(RecipeContext);

  useEffect(() => {
    const getRecipe = async () => {
      if (path.includes('/foods')) {
        const newRecipe = await fetchFoodById(id);
        setRecipes(newRecipe[0]);
      } else {
        const newRecipe = await fetchDrinkById(id);
        setRecipes(newRecipe[0]);
      }
    };
    getRecipe();
  }, [id, path]);

  useEffect(() => {
    if (path.includes('/foods')) {
      setFavoriteIcon(() => (favoriteRecipes.some((item) => item.id === recipes.idMeal)
        ? blackHeartIcon : whiteHeartIcon));
    } else {
      setFavoriteIcon(() => (favoriteRecipes.some((item) => item.id === recipes.idDrink)
        ? blackHeartIcon : whiteHeartIcon));
    }
  }, [favoriteIcon, favoriteRecipes, recipes, path]);

  const copyToClipBoard = () => {
    copy(`http://localhost:3000${path}`);
    toast.success('Link copied!');
  };

  const saveFavoriteRecipe = () => {
    const favObject = {
      id: (path.includes('/foods') ? recipes.idMeal : recipes.idDrink),
      type: (path.includes('/foods') ? 'food' : 'drink'),
      nationality: recipes.strArea || '',
      category: recipes.strCategory,
      alcoholicOrNot: (path.includes('/foods') ? '' : recipes.strAlcoholic),
      name: (path.includes('/foods') ? recipes.strMeal : recipes.strDrink),
      image: (path.includes('/foods') ? recipes.strMealThumb : recipes.strDrinkThumb),
    };
    let newFavoriteRecipes = [];
    if (favoriteRecipes.some((item) => item.id === id)) {
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

  const getIngredients = () => {
    recipe.forEach((rec) => {
      for (let i = 0; i <= +'20'; i += 1) {
        const ingredient = `strIngredient${i}`;
        if (rec[ingredient] && rec[ingredient].length > 0) {
          ingredients.push(rec[ingredient]);
        }
      }
    });

    return ingredients;
  };

  const returnPage = () => {
    history.push(`/drinks/${id}`);
  };

  return (
    recipe.map((rec) => {
      const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = rec;
      return (
        <Container
          className="p-0 m-0"
          style={ { backgroundColor: '#e9ecef' } }
          key={ strDrink }
        >
          <button
            type="button"
            className="text-black m-2 return-button"
            onClick={ returnPage }
          >
            {'<'}
          </button>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            className="recipe-image"
            data-testid="recipe-photo"
          />
          <header className="d-flex justify-content-between align-item-center">
            <div className="mt-1">
              <h2
                data-testid="recipe-title"
                className=" ml-3 mt-3 d-inline mb-0 pb-0 recipe-title"
              >
                { strDrink }
              </h2>
              <h3
                data-testid="recipe-category"
                className="ml-3 mt-0 fs-4 pt-0 normal-text"
              >
                { strAlcoholic }
              </h3>
            </div>
            <div className="mt-2">
              <input
                className="border-0 mr-2"
                type="image"
                alt={ `Compartilhar receita de ${path.includes('/foods')
                  ? recipe.strMeal : recipe.strDrink}` }
                src={ shareIcon }
                onClick={ copyToClipBoard }
                data-testid="share-btn"
              />
              <input
                width="26"
                className="border-0 mr-2"
                type="image"
                alt={ `Desfavoritar receita de ${path.includes('/foods')
                  ? recipe.strMeal : recipe.strDrink}` }
                src={ favoriteIcon }
                onClick={ saveFavoriteRecipe }
                data-testid="favorite-btn"
              />
            </div>
          </header>
          <SectionLine />
          <Container className="mb-1">
            <span
              className="fs-5 section-title"
            >
              INGREDIENTS
            </span>
            <CheckboxIngredients
              ingredients={ getIngredients() }
              history={ history }
              recipe={ rec }
              path={ path }
              id={ id }
            />
          </Container>
          <SectionLine />
          <Container>
            <span
              className="fs-5 section-title"
            >
              INSTRUCTIONS
              <p
                data-testid="instructions"
                className="ml-1 mr-1 fs-5 normal-text"
              >
                { strInstructions }
              </p>
            </span>
          </Container>
        </Container>
      );
    })
  );
}

export default DrinkInProgress;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchDrinkById, fetchFoodById } from '../services/FetchApi';
import FoodInProgress from '../components/FoodsInProgress';
import DrinkInProgress from '../components/DrinkInProgress';

function RecipeInProgress(props) {
  const { match, history } = props;
  const { params, path, url } = match;
  const { id } = params;

  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    const getFood = async () => {
      setRecipe(await fetchFoodById(id));
    };

    const getDrink = async () => {
      setRecipe(await fetchDrinkById(id));
    };

    if (path.includes('foods')) {
      getFood();
    } else {
      getDrink();
    }
  }, [id, path]);

  const getUrlToCopy = () => {
    if (path.includes('foods')) {
      const urlFoods = url.slice(0, +'7');
      const urlToCopy = `${urlFoods}${id}`;

      return urlToCopy;
    }

    const urlDrinks = url.slice(0, +'8');
    const urlToCopy = `${urlDrinks}${id}`;

    return urlToCopy;
  };

  return (
    <div>
      <div>
        {
          path.includes('foods')
            ? (
              <FoodInProgress
                recipe={ recipe }
                path={ getUrlToCopy() }
                id={ id }
                history={ history }
              />
            )
            : (
              <DrinkInProgress
                recipe={ recipe }
                path={ getUrlToCopy() }
                id={ id }
                history={ history }
              />
            )
        }
      </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default RecipeInProgress;

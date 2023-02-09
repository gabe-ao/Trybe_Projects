import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CheckboxIngredient.css';
import { Button } from 'react-bootstrap';
import { saveIngredients } from '../services/localStorage';
import RecipeContext from '../context/RecipeContext';

function CheckboxIngredient(props) {
  const { ingredients, history, recipe, path, id } = props;

  const [isDisabled, setIsDisabled] = useState(true);
  const [ingredientsMarked, setIngredientesMarked] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({
    meals: {},
    cocktails: {},
  });

  const { doneRecipes, setDoneRecipes } = useContext(RecipeContext);

  useEffect(() => {
    const inProgressRecipesStr = localStorage.getItem('inProgressRecipes')
    || JSON.stringify({
      meals: {},
      cocktails: {},
    });
    console.log(inProgressRecipesStr);
    setInProgressRecipes(JSON.parse(inProgressRecipesStr));
  }, []);

  useEffect(() => {
    if (path.includes('/foods') && Object.keys(inProgressRecipes.meals).includes(id)) {
      setIngredientesMarked(inProgressRecipes.meals[id]);
    } if (path.includes('/drinks') && Object.keys(inProgressRecipes
      .cocktails).includes(id)) {
      setIngredientesMarked(inProgressRecipes.cocktails[id]);
    }
  }, [id, path, inProgressRecipes]);

  useEffect(() => {
    const enabledButton = () => {
      if (ingredientsMarked.length === ingredients.length) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    enabledButton();
  }, [ingredientsMarked, ingredients]);

  const handleChange = ({ target }) => {
    const { checked, value } = target;

    let selectdIngredients = [];
    // setIsChecked(checked);

    if (checked === true) {
      selectdIngredients = [...ingredientsMarked, value];
    } else {
      selectdIngredients = ingredientsMarked
        .filter((item) => (item !== value));
    }
    let newInProgress = {};
    if (path.includes('/foods')) {
      newInProgress = { ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [id]: selectdIngredients,
        },

      };
    } else {
      newInProgress = { ...inProgressRecipes,
        cocktails: {
          ...inProgressRecipes.cocktails,
          [id]: selectdIngredients,
        },

      };
    }
    setInProgressRecipes(newInProgress);
    saveIngredients(JSON.stringify(newInProgress));
  };

  const scratchIngredient = (ingredient) => (
    ingredientsMarked.includes(ingredient) ? 'line-through' : 'normal');

  const finishRecipe = async () => {
    const doneObject = {
      id: (path.includes('/foods') ? recipe.idMeal : recipe.idDrink),
      type: (path.includes('/foods') ? 'food' : 'drink'),
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: (path.includes('/foods') ? '' : recipe.strAlcoholic),
      name: (path.includes('/foods') ? recipe.strMeal : recipe.strDrink),
      image: (path.includes('/foods') ? recipe.strMealThumb : recipe.strDrinkThumb),
      tags: (typeof recipe.strTags === 'string' ? recipe.strTags.split(', ') : []),
      doneDate: `Done in: ${new Date().toLocaleDateString()}`,
    };
    doneRecipes.push(doneObject);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    await setDoneRecipes(doneRecipes);
    history.push('/done-recipes');
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mb-4">
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        { ingredientsMarked && ingredients.map((ingredient, i) => (
          <label
            htmlFor={ ingredient }
            key={ ingredient }
            className={ scratchIngredient(ingredient) }
            data-testid={ `${i}-ingredient-step` }
          >
            { (ingredientsMarked.includes(ingredient))
              ? (

                <input
                  type="checkbox"
                  id={ ingredient }
                  value={ ingredient }
                  onChange={ handleChange }
                  defaultChecked
                />
              ) : (
                <input
                  type="checkbox"
                  id={ ingredient }
                  value={ ingredient }
                  onChange={ handleChange }
                />
              )}
            { ingredient }
          </label>
        ))}
      </div>
      <div>
        <Button
          variant={ isDisabled ? 'danger' : 'primary' }
          type="button"
          disabled={ isDisabled }
          onClick={ finishRecipe }
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </Button>
      </div>
    </div>
  );
}

CheckboxIngredient.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.shape().isRequired,
  recipe: PropTypes.shape().isRequired,
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CheckboxIngredient;

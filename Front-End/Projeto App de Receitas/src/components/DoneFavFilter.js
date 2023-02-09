import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'react-bootstrap';
import RecipeContext from '../context/RecipeContext';
import './DoneFavFilter.css';

function DoneFavFilter({ pathname }) {
  const { doneRecipes, favoriteRecipes, setFilteredRecipes } = useContext(RecipeContext);
  let recipes = doneRecipes;
  if (pathname === '/favorite-recipes') {
    recipes = favoriteRecipes;
  }

  useEffect(() => {}, [doneRecipes, favoriteRecipes]);

  const changeFilter = ({ target: { value } }) => {
    if (value === 'all') {
      setFilteredRecipes(recipes);
      return;
    }
    setFilteredRecipes(
      recipes.filter((recipe) => recipe.type === value),
    );
  };

  return (
    <ButtonGroup className="doneFilterContainer bg-white button-group mb-3">
      <Button
        type="button"
        className="btn-style"
        variant="outline-success"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ changeFilter }
      >
        All
      </Button>
      <Button
        variant="outline-success"
        className="btn-style"
        type="button"
        data-testid="filter-by-food-btn"
        value="food"
        onClick={ changeFilter }
      >
        Food
      </Button>
      <Button
        variant="outline-success"
        className="btn-style"
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ changeFilter }
      >
        Drink
      </Button>
    </ButtonGroup>
  );
}

DoneFavFilter.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default DoneFavFilter;

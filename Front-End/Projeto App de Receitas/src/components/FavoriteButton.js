import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import { toast } from 'react-toastify';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipeContext from '../context/RecipeContext';

function FavoriteButton({ recipe: { id, name }, index }) {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipeContext);

  const unfavoriteClick = ({ target: { value } }) => {
    const newFavorites = favoriteRecipes.filter(
      (recipe) => recipe.id !== value,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavoriteRecipes(newFavorites);
    const options = { style: { backgroundColor: '#e74c3c' } };
    toast.warning('Unfavorited recipe!', options);
  };

  return (
    <input
      className="ml-1"
      type="image"
      alt={ `Desfavoritar receita de ${name}` }
      src={ blackHeartIcon }
      onClick={ unfavoriteClick }
      data-testid={ `${index}-horizontal-favorite-btn` }
      value={ id }
    />
  );
}

FavoriteButton.propTypes = {
  recipe: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string,
  }),
  index: Proptypes.number,
}.isRequired;

export default FavoriteButton;

import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ recipe: { id, name, type }, index }) {
  const shareClick = ({ target: { value } }) => {
    copy(value);
    toast.success('Link copied!');
  };

  return (
    <input
      type="image"
      alt={ `Compartilhar receita de ${name}` }
      src={ shareIcon }
      onClick={ shareClick }
      data-testid={ `${index}-horizontal-share-btn` }
      value={ `http://localhost:3000/${type}s/${id}` }
    />
  );
}

ShareButton.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  index: PropTypes.number,
}.isRequired;

export default ShareButton;

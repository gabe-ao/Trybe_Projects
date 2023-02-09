import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Container, Row } from 'react-bootstrap';
import Header from '../components/Header';
import DoneFavFilter from '../components/DoneFavFilter';
import RecipeContext from '../context/RecipeContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import './FavoriteRecipes.css';

function FavoriteRecipes({ history: { location: { pathname } } }) {
  const { favoriteRecipes, filteredRecipes,
    setFilteredRecipes } = useContext(RecipeContext);

  useEffect(() => setFilteredRecipes(favoriteRecipes),
    [favoriteRecipes, setFilteredRecipes]);

  const createRecipeCards = (recipe, index) => (
    <Card className="done-card shadow-sm" key={ recipe.id }>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <Card.Img
          className="done-image"
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Card.Body>
        <Card.Header className="ml-0 pl-2">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <Card.Title
              className="card-title m-0 p-0"
              data-testid={ `${index}-horizontal-name` }
            >
              { recipe.name }
            </Card.Title>
          </Link>
          <Card.Text
            className="other-text p-0 m-0"
            data-testid={ `${index}-horizontal-top-text` }
          >
            {recipe.type === 'food'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.nationality} - ${recipe.alcoholicOrNot}`}
          </Card.Text>
          <div
            className="icons-buttons-container"
          >
            <ShareButton recipe={ recipe } index={ index } />
            <FavoriteButton recipe={ recipe } index={ index } />
          </div>
        </Card.Header>
      </Card.Body>
    </Card>
  );

  return (
    <Container
      className="p-0 m-0 d-flex flex-column
    justify-content-center align-items-center page-container"
    >
      <Header pathname={ pathname } />
      <DoneFavFilter pathname={ pathname } />
      <Row
        xs={ 1 }
        md={ 4 }
        className="g-4 p-0 m-0 mx-2 mb-5 card-container mt-3"
      >
        { filteredRecipes.map(createRecipeCards) }
      </Row>
    </Container>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default FavoriteRecipes;

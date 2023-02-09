import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Container, Row } from 'react-bootstrap';
import Header from '../components/Header';
import DoneFavFilter from '../components/DoneFavFilter';
import RecipeContext from '../context/RecipeContext';
import ShareButton from '../components/ShareButton';
import './DoneRecipes.css';

function DoneRecipes({ history: { location: { pathname } } }) {
  const { doneRecipes, filteredRecipes, setFilteredRecipes } = useContext(RecipeContext);
  console.log(filteredRecipes);
  useEffect(() => setFilteredRecipes(doneRecipes), [doneRecipes, setFilteredRecipes]);

  const createRecipeCards = (recipe, index) => (
    <Card key={ index } className="done-card shadow-sm">
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
            className="share-container"
          >
            <ShareButton recipe={ recipe } index={ index } />
          </div>
          <Card.Text
            className="other-text"
            data-testid={ `${index}-horizontal-done-date` }
          >
            {`Done in: ${recipe.doneDate}`}
          </Card.Text>
        </Card.Header>
        <Card.Text className="fs-4 ml-2">Tags</Card.Text>
        <div className="tags-container">
          {recipe.tags && recipe.tags.map(
            (tag, ind) => (
              <span
                className="tag"
                key={ ind }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ),
          )}
        </div>
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
        { filteredRecipes.length > 0 && filteredRecipes.map(createRecipeCards) }
      </Row>
    </Container>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default DoneRecipes;

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Recomendations({ recomendations, pathname }) {
  return (
    <div>
      <h2
        className="fs-5 section-title"
      >
        RECOMENDATIONS
      </h2>
      <div className="recomendations-container">
        {
          recomendations.map((item, index) => (
            <Link
              to={ pathname.includes('/foods')
                ? `/drinks/${item.idDrink}` : `/foods/${item.idMeal}` }
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <Card
                border="secondary"
                className="text-center mr-4"
                style={ { width: '10rem' } }
              >
                <Card.Img
                  src={ pathname.includes('/foods')
                    ? item.strDrinkThumb : item.strMealThumb }
                  alt={ pathname.includes('/foods') ? item.strDrink : item.strMeal }
                  width="150px"
                />
                <Card.ImgOverlay
                  className="d-flex
              flex-column justify-content-center align-items-center"
                  style={ { backgroundColor: 'rgba(33, 37, 41, 0.5)' } }
                >
                  <Card.Title
                    className="m-0 text-white fs-1 card-text"
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { pathname.includes('/foods') ? item.strDrink : item.strMeal }
                  </Card.Title>
                  <Card.Subtitle
                    className="m-0 text-white fs-5 card-text"
                  >
                    { item.strCategory }
                  </Card.Subtitle>
                </Card.ImgOverlay>
              </Card>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

Recomendations.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.object).isRequired,
  pathname: PropTypes.string.isRequired,
};

export default Recomendations;

import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Col, Container, Row } from 'react-bootstrap';
import RecipeContext from '../context/RecipeContext';
import { fetchDrinks, fetchFoods } from '../services/FetchApi';
import Header from '../components/Header';
import CategoryFilters from '../components/CategoryFilters';
import Footer from '../components/Footer';
import './Recipes.css';

function Recipes({ history: { location: { pathname } } }) {
  const { data, setData } = useContext(RecipeContext);
  useEffect(() => {
    const getInfo = async () => {
      if (pathname === '/drinks') {
        const drinks = await fetchDrinks();
        setData(drinks);
      } else {
        const foods = await fetchFoods();
        setData(foods);
      }
    };
    getInfo();
  }, [pathname, setData]);

  return (
    <Container
      fluid
      className="p-0 m-0 pb-3 main-container"
    >
      <Header pathname={ pathname } />
      <CategoryFilters pathname={ pathname } />
      <Row
        xs={ 2 }
        md={ 4 }
        className="g-4 p-0 m-0 mx-2 mb-5"
      >
        {
          data && data.map((item, index) => (
            <Col key={ index } className="p-2 m-0">
              <Link
                className="p-0 m-0"
                to={
                  pathname === '/foods'
                    ? `/foods/${item.idMeal}` : `/drinks/${item.idDrink}`
                }
              >
                <Card
                  border="secondary"
                  className="text-center card"
                  data-testid={ `${index}-recipe-card` }
                >
                  <Card.Img
                    className="img-fluid"
                    src={ pathname === '/foods'
                      ? item.strMealThumb : item.strDrinkThumb }
                    alt={ pathname === '/foods' ? item.strMeal : item.strDrink }
                    data-testid={ `${index}-card-img` }
                  />
                  <Card.ImgOverlay
                    className="d-flex
                    justify-content-center align-items-center card-image-overlay"
                  >
                    <Card.Title
                      className="m-0 text-white fs-1 card-title"
                      data-testid={ `${index}-card-name` }
                    >
                      { pathname === '/foods' ? item.strMeal : item.strDrink }
                    </Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Link>
            </Col>
          ))
        }
      </Row>
      <Footer />
    </Container>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Recipes;

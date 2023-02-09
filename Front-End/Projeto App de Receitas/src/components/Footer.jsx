import React from 'react';
import { Link } from 'react-router-dom';
import imageDrink from '../images/drinkIcon.svg';
import imageMeal from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer
      style={ { backgroundColor: '#dee2e6' } }
      className="d-flex justify-content-between fixed-bottom pt-2"
      data-testid="footer"
    >
      <Link
        className="drinks ml-3"
        to="/drinks"
        alt="drinks"
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ imageDrink }
          alt="drinkIcon"
          style={ { width: '2rem' } }
        />
      </Link>
      <Link
        className="foods mr-3"
        to="/foods"
        alt="foods"
      >
        <img
          className="mb-2"
          style={ { width: '2.2rem' } }
          data-testid="food-bottom-btn"
          src={ imageMeal }
          alt="mealIcon"
        />
      </Link>
    </footer>
  );
}

export default Footer;

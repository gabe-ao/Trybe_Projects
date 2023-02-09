import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header({ pathname }) {
  const [title, setTitle] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    switch (pathname) {
    case '/foods': setTitle('Foods'); break;
    case '/drinks': setTitle('Drinks'); break;
    case '/profile': setTitle('Profile'); break;
    case '/done-recipes': setTitle('Done Recipes'); break;
    default: setTitle('Favorite Recipes');
    }
  }, [pathname]);

  const changeSearchBar = () => {
    setShowSearchBar((oldState) => !oldState);
  };

  const searchIconElement = (
    <button
      className="mr-3 p-0 m-0"
      style={ { border: 'none', backgroundColor: 'transparent' } }
      type="button"
      onClick={ changeSearchBar }
    >
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="icone de pesquisa"
      />
    </button>
  );

  return (
    <Container className="p-0 m-0">
      <header
        className="d-flex justify-content-between align-items-center text-bg-success py-2"
      >
        <Link to="/profile">
          <img
            className="ml-4 p-0"
            src={ profileIcon }
            alt="icone de perfil"
            data-testid="profile-top-btn"
          />
        </Link>
        <span
          className={ pathname !== '/foods' || pathname !== '/drinks' ? 'mr-3' : '' }
          style={ { fontFamily: 'Titan One', fontSize: '2em' } }
          data-testid="page-title"
        >
          { title }
        </span>
        {
          (pathname === '/foods' || pathname === '/drinks') && searchIconElement
        }
      </header>
      {
        showSearchBar && <SearchBar
          showSearchBar={ showSearchBar }
          pathname={ pathname }
        />
      }

    </Container>
  );
}

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Header;

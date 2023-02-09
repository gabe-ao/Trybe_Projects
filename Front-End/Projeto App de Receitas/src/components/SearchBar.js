import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import RecipeContext from '../context/RecipeContext';

const showStyle = {
  zIndex: '1',
  width: '100%',
  position: 'absolute',
  margin: 'auto 0',
  backgroundColor: '#dee2e6',
  borderRadius: '0 0 5px 5px',
};
const FONT_FAMILY = 'Source Sans Pro';

function SearchBar({ pathname }) {
  const { newSearch } = useContext(RecipeContext);
  const [filter, setFilter] = useState({
    option: '',
    value: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setFilter((oldFilter) => ({
      ...oldFilter,
      [name]: value,
    }));
  };

  const sendFilter = () => {
    if (filter.option === 'first-letter' && filter.value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      setFilter({
        option: '',
        value: '',
      });
    } else {
      newSearch(filter, pathname);
      setFilter({
        option: '',
        value: '',
      });
    }
  };

  return (
    <Form
      style={ showStyle }
    >
      <Form.Group
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <Form.Control
          className="m-2"
          style={ { width: '80%' } }
          type="text"
          name="value"
          data-testid="search-input"
          value={ filter.value }
          onChange={ handleChange }
        />
        <Form.Group className="mx-auto d-flex justify-content-center align-items-center">
          <Form.Check
            style={ { fontFamily: FONT_FAMILY, fontWeight: '600', fontSize: '1.1em' } }
            className="text-black"
            inline
            id="ingredient"
            type="radio"
            name="option"
            data-testid="ingredient-search-radio"
            value="ingredient"
            placeholder="Search"
            onChange={ handleChange }
            label="Ingredient"
          />
          <Form.Check
            style={ { fontFamily: FONT_FAMILY, fontWeight: '600', fontSize: '1.1em' } }
            className="text-black"
            inline
            id="name"
            type="radio"
            name="option"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleChange }
            label="Name"
          />
          <Form.Check
            style={ { fontFamily: FONT_FAMILY, fontWeight: '600', fontSize: '1.1em' } }
            className="text-black"
            inline
            id="first-letter"
            type="radio"
            name="option"
            data-testid="first-letter-search-radio"
            value="first-letter"
            onChange={ handleChange }
            label="First Letter"
          />
        </Form.Group>
        <Button
          style={ { fontFamily: FONT_FAMILY, fontWeight: '600' } }
          variant="success"
          size="lg"
          className="mb-2"
          type="button"
          data-testid="exec-search-btn"
          onClick={ sendFilter }
        >
          Search
        </Button>
      </Form.Group>
    </Form>
  );
}

SearchBar.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default SearchBar;

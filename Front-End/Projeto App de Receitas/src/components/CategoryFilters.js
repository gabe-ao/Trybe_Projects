import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, ButtonToolbar, Container } from 'react-bootstrap';
import RecipeContext from '../context/RecipeContext';

const FONT_FAMILY = 'Source Sans Pro';

function CategoryFilters({ pathname }) {
  const { categories, updateCategoryFilter } = useContext(RecipeContext);
  const { foodCategories, drinkCategories } = categories;

  const buttonCreator = (item, index) => (
    <Button
      style={ {
        fontFamily: FONT_FAMILY,
        fontWeight: '600',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        width: '33vw',
      } }
      variant="outline-success"
      className="fs-6 btn-sm"
      type="button"
      key={ index }
      data-testid={ `${item.strCategory}-category-filter` }
      onClick={ () => updateCategoryFilter(item.strCategory, pathname) }
    >
      { item.strCategory }
    </Button>
  );

  return (
    <Container
      fluid
      className="p-0"
    >
      <ButtonToolbar className="m-0 bg-white" style={ { width: '100vw' } }>
        <ButtonGroup style={ { width: '100vw' } }>
          <Button
            style={ {
              fontFamily: FONT_FAMILY,
              fontWeight: '600',
              fontSize: '1.1em',
              width: '33vw',
            } }
            variant="outline-success"
            className="fs-6 btn-sm"
            type="button"
            data-testid="All-category-filter"
            onClick={ () => updateCategoryFilter('All', pathname) }
          >
            All
          </Button>

          {(pathname === '/foods') && foodCategories.slice(0, 2).map(buttonCreator)}

          {(pathname === '/drinks') && drinkCategories.slice(0, 2).map(buttonCreator)}
        </ButtonGroup>
      </ButtonToolbar>
      <ButtonToolbar className="mb-1 mt-0 bg-white" style={ { width: '100vw' } }>
        <ButtonGroup style={ { width: '100vw' } }>
          {(pathname === '/foods') && foodCategories.slice(2).map(buttonCreator)}

          {(pathname === '/drinks') && drinkCategories.slice(2).map(buttonCreator)}
        </ButtonGroup>
      </ButtonToolbar>
    </Container>
  );
}

CategoryFilters.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default CategoryFilters;

import React from 'react';
import PropTypes from 'prop-types';
import GenericInput from './GenericInput';
import GenericSelectInput2 from './GenericSelectInput2';

class SearchFilter extends React.Component {
  render() {
    const { filterName, filterRare, onFilterChange } = this.props;
    return (
      <section className="search-filter">
        <h3>Filtros de busca</h3>
        <GenericInput
          title="Nome: "
          placeholder="Busca por nome"
          type="text"
          name="filterName"
          id="filterName"
          dataTestid="name-filter"
          value={ filterName }
          handler={ onFilterChange }
        />
        <GenericSelectInput2
          title="Raridade: "
          placeholder="todas"
          name="filterRare"
          id="filterRare"
          dataTestid="rare-filter"
          options={ ['normal', 'raro', 'muito raro'] }
          value={ filterRare }
          handler={ onFilterChange }
        />
      </section>
    );
  }
}

SearchFilter.propTypes = {
  filterName: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filterRare: PropTypes.string.isRequired,
};

export default SearchFilter;

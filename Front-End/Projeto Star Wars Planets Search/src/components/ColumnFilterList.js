import React, { useContext, useEffect } from 'react';
import StarContext from '../context/StarContext';

function ColumnFilterList() {
  const { filterByColumn, setFilterByColumn } = useContext(StarContext);
  useEffect(() => {}, [filterByColumn]);

  const removeFilter = ({ target: { value } }) => {
    let newFilters = JSON.parse(JSON.stringify(filterByColumn)); // Necessario criar uma deep copy do valor salvo em contexto para evitar que ao editar newFilters, o filterByColumn seja editado tambem. Isso estava ocorrendo e alterando os valores de filterByColumn indesejadamente.
    newFilters = newFilters.filter((filter) => filter.column !== value);
    setFilterByColumn(newFilters);
  };

  const removeAllFilters = () => {
    setFilterByColumn([]);
  };

  return (
    <div className="columnFilterListContainer">
      {
        filterByColumn.map((filter, index) => (
          <label
            htmlFor="removeFilterButton"
            data-testid="filter"
            className="removeFilterLabel"
            key={ index }
          >
            {` Filtro: ${filter.column} ${filter.comparison} ${filter.value} `}
            <button
              type="button"
              value={ filter.column }
              onClick={ removeFilter }
              className="removeFilterButton"
            >
              X
            </button>
          </label>
        ))
      }
      <button
        id="removeAllFiltersButton"
        type="button"
        onClick={ removeAllFilters }
        data-testid="button-remove-filters"
      >
        Remover filtros
      </button>
    </div>
  );
}

export default ColumnFilterList;

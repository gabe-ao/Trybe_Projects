import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function ColumnSorter() {
  const { order, setOrder } = useContext(StarContext);
  const columns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const selectedOrder = { column: columns[0], sort: 'ASC' };

  if (order.column !== undefined) {
    selectedOrder.column = order.column;
    selectedOrder.sort = order.sort;
  }

  const sorterHandler = ({ target: { name, value } }) => {
    selectedOrder[name] = value;
  };

  const setOrderContext = () => {
    setOrder(selectedOrder);
  };

  return (
    <div className="columnSorterContainer">
      <h4>Ordenar</h4>
      <label htmlFor="columnSorter" className="filterLabel">
        {'Coluna: '}
        <select
          id="columnSorter"
          name="column"
          data-testid="column-sort"
          onChange={ sorterHandler }
        >
          {columns.map((column, index) => <option key={ index }>{column}</option>)}
        </select>
      </label>
      <fieldset id="sortOrder">
        <label htmlFor="sortAsc">
          {' Ascendente '}
          <input
            type="radio"
            id="sortAsc"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ sorterHandler }
          />
        </label>
        <label htmlFor="sortDesc">
          {' Descendente '}
          <input
            type="radio"
            id="sortDesc"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
            onChange={ sorterHandler }
          />
        </label>
      </fieldset>
      <button
        type="button"
        id="sorterButton"
        data-testid="column-sort-button"
        onClick={ setOrderContext }
      >
        Ordenar
      </button>
    </div>
  );
}

export default ColumnSorter;

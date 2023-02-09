import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function NameFilter() {
  const { setFilterByName } = useContext(StarContext);

  const filterHandler = ({ target: { value } }) => {
    setFilterByName(value);
  };

  return (
    <div id="nameFilterContainer">
      <h4>Filtrar</h4>
      <label htmlFor="nameFilter" className="filterLabel">
        {'Nome: '}
        <input
          id="nameFilter"
          type="text"
          className="filterInput"
          data-testid="name-filter"
          onChange={ filterHandler }
        />
      </label>
    </div>
  );
}

export default NameFilter;

import React, { useContext, useEffect } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const { data, filterByName, filterByColumn, order } = useContext(StarContext);
  let planets = data;
  const headers = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films',
    'Created', 'Edited', 'URL'];
  useEffect(() => {}, [filterByColumn, order]);

  const setNameFilter = (name) => {
    /* Filtra os planetas por nome */
    planets = planets.filter((planet) => planet.name.toLowerCase().includes(name));
  };

  if (filterByName !== '') setNameFilter(filterByName); // Aplica o filtro por nome, se ele possuir valor

  const setColumnFilter = (filter) => {
    /* Filtra os planetas pelos valores das colunas */
    planets = planets.filter((planet) => {
      if (filter.comparison === 'menor que') {
        return parseInt(planet[filter.column], 10) < parseInt(filter.value, 10);
      } if (filter.comparison === 'maior que') {
        return parseInt(planet[filter.column], 10) > parseInt(filter.value, 10);
      }
      return parseInt(planet[filter.column], 10) === parseInt(filter.value, 10);
    });
  };

  /* Setup: Aplicando os filtros */
  if (filterByColumn.length > 0) {
    filterByColumn.forEach((filter) => setColumnFilter(filter));
  }

  /* Setup: Ordenacao inicial deve ser alfabetica */
  planets = planets.sort((current, next) => {
    const nameA = current.name.toLowerCase();
    const nameB = next.name.toLowerCase();
    if (nameA > nameB) return 1;
    if (nameA < nameB) return +'-1';
    return 0;
  });

  /* Setup: Aplicando ordenacao */
  if (order.sort === 'ASC') {
    planets = planets.sort((current, next) => {
      const col = order.column;
      if (current[col] === 'unknown') return 1;
      if (next[col] === 'unknown') return +'-1';
      return current[col] - next[col];
    });
  }
  if (order.sort === 'DESC') {
    planets = planets.sort((current, next) => {
      const col = order.column;
      if (next[col] === 'unknown') return +'-1';
      if (current[col] === 'unknown') return 1;
      return next[col] - current[col];
    });
  }

  const createPlanetRow = (planet, index) => {
    /* Cria os cada linha da tabela */
    const values = Object.values(planet);
    return (
      <tr key={ index }>
        {values.map((value, ind) => {
          if (ind === 0) return <td key={ ind } data-testid="planet-name">{value}</td>;
          return <td key={ ind }>{value}</td>;
        })}
      </tr>
    );
  };

  return (
    <table>
      <thead>
        <tr>{headers.map((header, index) => <th key={ index }>{header}</th>)}</tr>
      </thead>
      <tbody>
        {planets.map(createPlanetRow)}
      </tbody>
    </table>
  );
}

export default Table;

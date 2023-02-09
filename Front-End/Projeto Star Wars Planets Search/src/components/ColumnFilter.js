import React, { useContext, useEffect } from 'react';
import StarContext from '../context/StarContext';

function ColumnFilter() {
  const { filterByColumn, setFilterByColumn } = useContext(StarContext);
  const operands = ['maior que', 'menor que', 'igual a'];

  let columns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const selectedFilter = { column: 'population', comparison: 'maior que', value: '0' };

  /* Os valores das variaveis columns e selectedFilter sao dependentes de filterByColumn, logo devem atualizar quando ele for modificado. FilterByColumn e um estado global do Context. Dessa forma, e necessario utilizar o userEffect para causar a atualizacao deste componente sempre que filterByColumn for modificado */
  useEffect(() => {}, [filterByColumn]);
  if (filterByColumn.length > 0) {
    const lastUsedFilter = filterByColumn[filterByColumn.length - 1];
    /* FixIndex foi criado para solucionar o problema de que no re-render desse compoenente: o 'columnFilter' exibe na tela a opcao seguinte a ultima utilizada ao inves da primeira opcao, assim e necessario que o filtro selecionado default inclua tal opcao. Para conseguir isso se torna necessario calcular o index correto do valor do filtro selecionado default */
    let fixIndex = columns.indexOf(lastUsedFilter.column) + 1;
    if (fixIndex >= columns.length) fixIndex = 0;
    selectedFilter.column = columns[fixIndex];
    selectedFilter.comparison = lastUsedFilter.comparison;
    selectedFilter.value = lastUsedFilter.value;

    columns = columns.filter(
      (column) => !filterByColumn.some((filter) => filter.column === column),
    );
  }

  const filterHandler = ({ target: { name, value } }) => {
    selectedFilter[name] = value;
  };

  const setFiltersContext = () => {
    /* Adiciona o novo filtro escolhido ao estado do contexto */
    if (columns.length <= 0) return; // Quando todas as opcoes de filtros estiverem uso, o columns estara vazio, ja que ele armazena elas
    const newFilters = JSON.parse(JSON.stringify(filterByColumn)); // Necessario criar uma deep copy do valor salvo em contexto para evitar que ao editar newFilters, o filterByColumn seja editado tambem. Isso estava ocorrendo e alterando os valores de filterByColumn indesejadamente.
    newFilters.push(selectedFilter);
    setFilterByColumn(newFilters);
  };

  return (
    <div id="columnFilterContainer">
      <label htmlFor="columnFilter" className="filterLabel">
        {'Coluna: '}
        <select
          id="columnFilter"
          name="column"
          data-testid="column-filter"
          onChange={ filterHandler }
        >
          {columns.map((column, index) => <option key={ index }>{column}</option>)}
        </select>
      </label>
      <label htmlFor="comparisonFilter" className="filterLabel">
        {' Operador: '}
        <select
          id="comparisonFilter"
          name="comparison"
          data-testid="comparison-filter"
          onChange={ filterHandler }
        >
          {operands.map((operand, index) => <option key={ index }>{operand}</option>)}
        </select>
      </label>
      <label htmlFor="valueFilter" className="filterLabel">
        {' Valor: '}
        <input
          id="valueFilter"
          name="value"
          type="number"
          className="filterInput"
          data-testid="value-filter"
          onChange={ filterHandler }
          defaultValue="0"
        />
      </label>
      <button
        type="button"
        id="filterButton"
        data-testid="button-filter"
        onClick={ setFiltersContext }
      >
        Filtrar
      </button>
    </div>
  );
}

export default ColumnFilter;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import { getPlanetsData } from '../services/starApi';

function StarContextProvider({ children }) {
  /* Inicializando estados */
  const [planetsData, setPlanetsData] = useState([{}]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByColumn, setFilterByColumn] = useState([]);
  /* Abaixo, o estado para a ordenacao da tabela por valores de uma coluna. A chave "sort" indica se a ordenacao e ascendete (ASC) ou descendente (DESC) */
  const [order, setOrder] = useState({});

  const setData = async () => {
    /* Funcao para requisitar os dados da API e atualizar o estado quando elas forem obtidas */
    const data = await getPlanetsData();
    setPlanetsData(data);
  };

  useEffect(() => {
    /* O useEffect e necessario para que o dados possam ser requisitados da API somente uma vez ao montar o componente */
    setData();
  }, []);

  const contextValue = {
    data: planetsData,
    filterByName,
    setFilterByName,
    filterByColumn,
    setFilterByColumn,
    order,
    setOrder,
  };

  return (
    <StarContext.Provider value={ contextValue }>
      {children}
    </StarContext.Provider>
  );
}

StarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarContextProvider;

import React from 'react';
import StarContextProvider from './context/StarContextProvider';
import './App.css';
import ColumnFilter from './components/ColumnFilter';
import ColumnSorter from './components/ColumnSorter';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import ColumnFilterList from './components/ColumnFilterList';

function App() {
  return (
    <StarContextProvider>
      <h1>Star Wars Planets</h1>
      <nav>
        <NameFilter />
        <ColumnFilter />
        <ColumnFilterList />
        <ColumnSorter />
      </nav>
      <main>
        <Table />
      </main>
    </StarContextProvider>
  );
}

export default App;

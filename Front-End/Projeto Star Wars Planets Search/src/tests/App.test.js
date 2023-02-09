import React from 'react';
import { cleanup, render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ColumnFilter from '../components/ColumnFilter';
import mockData from './mocks/mocksForTests';
import * as moduleApi from '../services/starApi'
import { getPlanetsData } from '../services/starApi';
import renderWithReactAndContext from './mocks/renderWithContext';
import Table from '../components/Table';

describe('Testing Fetch, Table and ColumnFilter: ',() => {
  afterEach(() => jest.clearAllMocks());
  it('1) Fetch and Table works?', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    jest.spyOn(moduleApi, 'getPlanetsData');
    const endpoint = ("https://swapi-trybe.herokuapp.com/api/planets/");
    render(<App/>);
    expect(fetch).toBeCalledWith(endpoint);
    expect(getPlanetsData).toBeCalled();
    cleanup();

    renderWithReactAndContext(<Table/>);
    const expectedHeaders = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
      'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films',
      'Created', 'Edited', 'URL'];
    const headers = screen.getAllByRole('columnheader');
    expect(headers.length).toBe(13);
    headers.forEach((header, index) => {
      expect(header).toHaveTextContent(expectedHeaders[index]);
    cleanup();
    
    render(<App/>);
    const sortColumn = screen.getByTestId('column-sort');
    expect(sortColumn).toBeInTheDocument();
    const radioDesc = screen.getByRole('radio', {  name: /descendente/i});
    expect(radioDesc).toBeInTheDocument();
    const radioAsc = screen.getByRole('radio', {  name: /ascendente/i});
    expect(radioAsc).toBeInTheDocument(); 
    const filterButton = screen.getByRole('button', {  name: /ordenar/i});
    expect(filterButton).toBeInTheDocument();

    userEvent.click(screen.getAllByRole('option', { name:'diameter'})[1]);
    userEvent.click(radioDesc);
    expect(radioDesc).toBeChecked();
    userEvent.click(filterButton);
    const planetNames = waitFor(() => screen.getAllByTestId('planet-name'));
    waitFor(() => expect(planetNames.length).toBe(10));
    });
  });

  it('2) Tests if ColumnFilter is rendering correctly', () => {
    renderWithReactAndContext(<ColumnFilter/>);
    const operandField = screen.getByRole('combobox', { name: /operador:/i })
    expect(operandField).toBeInTheDocument();
    const columnField = screen.getByRole('combobox', { name: /coluna:/i })
    expect(columnField).toBeInTheDocument();
    const valueField = screen.getByRole('spinbutton', { name: /valor:/i });
    expect(valueField).toBeInTheDocument();
    const filterButton = screen.getByRole('button', { name: /filtrar/i });
    expect(filterButton).toBeInTheDocument();
    userEvent.type(valueField, '456');
    expect(valueField).toHaveValue(456);
    userEvent.selectOptions(operandField, 'igual a');
    expect(screen.getByDisplayValue(/igual a/i)).toBeInTheDocument();


    expect(screen.getAllByRole('option').length).toBe(8);
    const colOption = screen.getByText(/population/i);
    expect(colOption).toBeInTheDocument();
    userEvent.click(filterButton);
    expect(screen.getAllByRole('option').length).toBe(7);
    expect(colOption).toHaveTextContent('orbital_period');
    userEvent.click(filterButton);
    userEvent.click(filterButton);
    userEvent.click(filterButton);
    expect(screen.getAllByRole('option').length).toBe(4);
    expect(colOption).toHaveTextContent('surface_water');
  });
});

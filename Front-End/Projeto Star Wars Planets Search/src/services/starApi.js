export function removeResidents(entry) {
  delete entry.residents;
  return entry;
}

export async function getPlanetsData() {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const data = await fetch(endpoint)
    .then((response) => response.json())
    .then((response) => response.results)
    .then((results) => results.map(removeResidents));

  return data;
}

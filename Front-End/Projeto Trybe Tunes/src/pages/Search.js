import React from 'react';
import AlbumCard from '../components/AlbumCard';
import GenericInput from '../components/GenericInput';
import LoadingMessage from '../components/LoadingMessage';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.lockSearchButton = this.lockSearchButton.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.searchRequest = this.searchRequest.bind(this);
    this.state = {
      artistName: '',
      isSearchButtonDisabled: true,
      isLoading: false,
      isSearchDone: false,
      searchResults: [],
    };
  }

  onInputChange({ target }) {
    /* Tratador generico de eventos para manter os dados do form salvos em estados */
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.lockSearchButton());
  }

  onSearchClick() {
    this.setState({ isLoading: true }, () => this.searchRequest());
  }

  async searchRequest() {
    const { artistName } = this.state;
    const searchResults = await searchAlbumsAPIs(artistName);
    this.setState({
      isSearchButtonDisabled: true,
      isLoading: false,
      isSearchDone: true,
      searchResults,
    });
  }

  lockSearchButton() {
    const { artistName } = this.state;
    const minNameLength = 2;

    if (artistName.length >= minNameLength) {
      this.setState({ isSearchButtonDisabled: false });
      return;
    }
    this.setState({ isSearchButtonDisabled: true });
  }

  render() {
    const {
      artistName,
      isSearchButtonDisabled, isLoading, isSearchDone, searchResults } = this.state;
    let searchMessage = null;
    let searchCards = null;
    if (isSearchDone && searchResults.length <= 0) {
      searchMessage = <p>Nenhum álbum foi encontrado</p>;
    } else if (isSearchDone && searchResults.length > 0) {
      searchMessage = <p>{`Resultado de álbuns de: ${artistName}`}</p>;
      searchCards = searchResults.map((result) => (
        <AlbumCard
          key={ result.collectionId }
          artistName={ result.artistName }
          collectionId={ result.collectionId }
          collectionName={ result.collectionName }
          collectionPrice={ result.collectionPrice }
          artworkURL={ result.artworkUrl100 }
          releaseDate={ result.releaseDate }
          trackCount={ result.trackCount }
        />
      ));
    }
    return (
      <div data-testid="page-search">
        {isLoading
          ? <LoadingMessage />
          : (
            <form>
              <GenericInput
                title="Nome do artista: "
                placeholder="Busca por artista"
                type="text"
                name="artistName"
                id="artistName"
                dataTestid="search-artist-input"
                handler={ this.onInputChange }
              />
              <button
                type="button"
                name="searchButton"
                disabled={ isSearchButtonDisabled }
                data-testid="search-artist-button"
                onClick={ this.onSearchClick }
              >
                Pesquisar
              </button>
            </form>
          )}
        { searchMessage }
        { searchCards }
      </div>
    );
  }
}

export default Search;

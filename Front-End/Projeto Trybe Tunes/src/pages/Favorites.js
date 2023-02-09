import React from 'react';
import LoadingMessage from '../components/LoadingMessage';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.favoritesSetup = this.favoritesSetup.bind(this);
    this.onCheckFavorite = this.onCheckFavorite.bind(this);

    this.state = {
      favoritesMusics: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.favoritesSetup();
  }

  onCheckFavorite({ target }) {
    /* Tratador para remover musicas dos favoritos */
    const value = JSON.parse(target.value);
    this.setState({
      isLoading: true,
    }, () => this.favoriteRemoveRequest(value));
  }

  async favoriteRemoveRequest(value) {
    let { favoritesMusics } = this.state;
    const musicToRemove = favoritesMusics.find((music) => music.trackId === value);
    musicToRemove.favorite = false;
    await removeSong(musicToRemove);
    favoritesMusics = await getFavoriteSongs();
    this.setState({
      favoritesMusics,
      isLoading: false,
    });
  }

  async favoritesSetup() {
    let { favoritesMusics } = this.state;
    favoritesMusics = await getFavoriteSongs();
    this.setState({
      favoritesMusics,
      isLoading: false,
    });
  }

  render() {
    const { favoritesMusics, isLoading } = this.state;
    const favoritesCards = favoritesMusics.map((music) => (
      <MusicCard
        key={ music.trackId }
        trackName={ music.trackName }
        previewUrl={ music.previewUrl }
        trackId={ music.trackId }
        checkedFavorite={ music.favorite }
        onCheckFavorite={ this.onCheckFavorite }
      />
    ));
    return (
      <div data-testid="page-favorites">
        {isLoading && <LoadingMessage />}
        {!isLoading && favoritesCards}
        {(!isLoading && favoritesMusics.length <= 0)
          && <p>Voce nao possui nenhuma musica favoritada.</p>}
      </div>
    );
  }
}

export default Favorites;

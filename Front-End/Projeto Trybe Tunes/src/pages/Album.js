import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import LoadingMessage from '../components/LoadingMessage';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.musicsSetup = this.musicsSetup.bind(this);
    this.onCheckFavorite = this.onCheckFavorite.bind(this);
    this.favoriteAddRequest = this.favoriteAddRequest.bind(this);
    this.favoriteRemoveRequest = this.favoriteRemoveRequest.bind(this);
    this.state = {
      albumDescription: {},
      albumMusics: [],
      isLoading: true,
      favoritesIds: [],
    };
  }

  componentDidMount() {
    this.musicsSetup();
  }

  onCheckFavorite({ target }) {
    /* Tratador para adicionar remover musicas dos favoritos */
    const { checked } = target;
    const value = JSON.parse(target.value);
    const { albumMusics, favoritesIds } = this.state;

    if (checked && !favoritesIds.includes(value)) {
      const musicToAdd = albumMusics.find((music) => music.trackId === value);
      musicToAdd.favorite = true;
      albumMusics.forEach((music) => {
        if (music.trackId === value) {
          music.favorite = true;
        }
      });
      this.setState({
        isLoading: true,
        albumMusics,
      }, () => this.favoriteAddRequest(musicToAdd));
      return;
    }

    if (!checked) {
      const musicToRemove = albumMusics.find((music) => music.trackId === value);
      musicToRemove.favorite = false;
      albumMusics.forEach((music) => {
        if (music.trackId === value) {
          music.favorite = false;
        }
      });
      this.setState({
        isLoading: true,
        albumMusics,
      }, () => this.favoriteRemoveRequest(musicToRemove));
    }
  }

  async favoriteAddRequest(musicToAdd) {
    await addSong(musicToAdd);
    let favoritesIds = await getFavoriteSongs();
    favoritesIds = favoritesIds.map((favorite) => favorite.trackId);
    this.setState({
      favoritesIds,
      isLoading: false,
    });
  }

  async favoriteRemoveRequest(musicToRemove) {
    await removeSong(musicToRemove);
    let favoritesIds = await getFavoriteSongs();
    favoritesIds = favoritesIds.map((favorite) => favorite.trackId);
    this.setState({
      favoritesIds,
      isLoading: false,
    });
  }

  async musicsSetup() {
    const { id } = this.props;
    /* Primeiro, sao requisitadas as músicas do album e o array de favoritos */
    const album = await getMusics(id);
    let favoritesIds = await getFavoriteSongs();
    /* Então, o array de favoritos e simplificado para conter somente os trackId das musicas favoritadas  */
    favoritesIds = favoritesIds.map((favorite) => favorite.trackId);
    /* As musicas recebidas do album são separadas do elemento que descreve ele */
    let albumMusics = album.filter((music) => music.kind === 'song');
    /* Em seguida, as musicas do album sao modificadas para conter a propriedade de favorito */
    albumMusics = albumMusics.map((music) => {
      if (favoritesIds.includes(music.trackId)) {
        music.favorite = true;
        return music;
      }
      music.favorite = false;
      return music;
    });

    const albumDescription = album[0];
    this.setState({
      albumDescription,
      albumMusics,
      favoritesIds,
      isLoading: false,
    });
  }

  render() {
    const { albumDescription, albumMusics, isLoading } = this.state;
    const albumCover = (
      <figure name="album-cover">
        <img
          src={ albumDescription.artworkUrl100 }
          alt={ albumDescription.collectionName }
        />
        <figcaption name={ albumDescription.collectionName }>
          <b data-testid="album-name">
            { `${albumDescription.collectionName}` }
          </b>
        </figcaption>
        <figcaption
          name={ albumDescription.artistName }
          data-testid="artist-name"
        >
          { `${albumDescription.artistName}` }
        </figcaption>
      </figure>
    );
    const musicsCards = albumMusics.map((music) => (
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
      <div data-testid="page-album">
        {isLoading && <LoadingMessage /> }
        {!isLoading && albumCover }
        {!isLoading && musicsCards }
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Album;

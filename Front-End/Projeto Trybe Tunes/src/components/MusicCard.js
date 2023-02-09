import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName,
      previewUrl, trackId, checkedFavorite, onCheckFavorite } = this.props;
    return (
      <div className="music-card">
        <p>{`${trackName}`}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            id="favorite"
            value={ trackId }
            checked={ checkedFavorite }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ onCheckFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  onCheckFavorite: PropTypes.func.isRequired,
  checkedFavorite: PropTypes.bool.isRequired,
};

export default MusicCard;

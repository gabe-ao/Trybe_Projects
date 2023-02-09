import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const {
      artistName,
      collectionName,
      collectionId,
      collectionPrice, artworkURL, releaseDate, trackCount } = this.props;
    return (
      <div className="album-card">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <figure>
            <img src={ artworkURL } alt={ collectionName } />
            <figcaption name={ collectionName }>{ collectionName }</figcaption>
            <p name={ artistName }>{ artistName }</p>
            <p name={ releaseDate }>{`Data de lançamento: ${releaseDate}`}</p>
            <p name="trackCount">{`Faixas: ${trackCount}`}</p>
            <p name="collectionPrice">{`Preço: US$ ${collectionPrice}`}</p>
          </figure>
        </Link>
      </div>
    );
  }
}

AlbumCard.defaultProps = {
  collectionPrice: 0,
};

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionPrice: PropTypes.number,
  artworkURL: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,

};

export default AlbumCard;

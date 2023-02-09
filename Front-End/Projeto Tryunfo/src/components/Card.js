import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      deleteCard,
      isPreview,
    } = this.props;
    const deleteButton = (
      <button
        type="button"
        value={ cardName }
        onClick={ deleteCard }
        data-testid="delete-button"
      >
        Excluir carta
      </button>
    );
    return (
      <section className="card">
        <figure>
          <figcaption name={ cardName } data-testid="name-card">{ cardName }</figcaption>
          <img src={ cardImage } alt={ cardName } data-testid="image-card" />
          <p name={ cardDescription } data-testid="description-card">
            { cardDescription }
          </p>
          <p><data value={ cardAttr1 } data-testid="attr1-card">{ cardAttr1 }</data></p>
          <p><data value={ cardAttr2 } data-testid="attr2-card">{ cardAttr2 }</data></p>
          <p><data value={ cardAttr3 } data-testid="attr3-card">{ cardAttr3 }</data></p>
          <p><data value={ cardRare } data-testid="rare-card">{ cardRare }</data></p>
          {cardTrunfo
            ? <p data-testid="trunfo-card">Super Trunfo</p>
            : <p /> }
        </figure>
        {JSON.parse(isPreview)
          ? null
          : deleteButton}
      </section>
    );
  }
}

Card.defaultProps = {
  isPreview: false,
};

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  deleteCard: PropTypes.func.isRequired,
  isPreview: PropTypes.bool,
};

export default Card;

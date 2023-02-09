import React from 'react';
import PropTypes from 'prop-types';

class AvaliationsCards extends React.Component {
  render() {
    const { avaliations } = this.props;
    return (
      <section className="avaliations">
        <h3>Avaliações</h3>
        { avaliations.map((avaliation, index) => (
          <div key={ index }>
            <hr />
            <p>{ avaliation.email }</p>
            <span>{ `Nota: ${avaliation.rate}` }</span>
            <p>{ avaliation.message }</p>
            <hr />
          </div>
        ))}
      </section>
    );
  }
}

AvaliationsCards.propTypes = {
  avaliations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default AvaliationsCards;

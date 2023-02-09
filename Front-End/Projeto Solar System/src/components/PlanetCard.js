import React from 'react';
import PropTypes from 'prop-types';
import defaultImg from '../images/error_404_320px.png';

class PlanetCard extends React.Component {
  render() {
    const { planetName, planetImage } = this.props;
    return (
      <div data-testid="planet-card" className="planet">
        <img src={ planetImage } alt={ `Planeta ${planetName}` } id={ planetName } />
        <label htmlFor={ planetName } data-testid="planet-name">{ planetName }</label>
      </div>
    );
  }
}

PlanetCard.defaultProps = {
  planetName: 'Error image by pngtree.com and 起舞弄清影',
  planetImage: defaultImg,
};

PlanetCard.propTypes = {
  planetName: PropTypes.string,
  planetImage: PropTypes.string,
};

export default PlanetCard;

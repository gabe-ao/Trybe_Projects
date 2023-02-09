import React from 'react';
import Title from './Title';
import PlanetCard from './PlanetCard';
import Planets from '../data/planets';

class SolarSystem extends React.Component {
  render() {
    const planetsCards = Planets.map(({ name, image }) => {
      const card = <PlanetCard planetName={ name } planetImage={ image } key={ name } />;
      return card;
    });
    return (
      <div data-testid="solar-system" className="system">
        <Title headline="Planetas" />
        <section className="planet-line">
          { planetsCards }
        </section>
      </div>
    );
  }
}

export default SolarSystem;

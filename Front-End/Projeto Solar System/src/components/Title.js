import React from 'react';
import PropTypes from 'prop-types'; // Modulo para validar as props do componente

class Title extends React.Component {
  render() {
    const { headline } = this.props; // Lint exige que as props sejam desestruturadas para facilitar a leitura do codigo
    return (<h2 className="title">{ headline }</h2>);
  }
}

Title.defaultProps = { // Lint exige que as props "nao requeridas" possuam valores default (padrão) para evitar que o componente seja renderizado incompleto
  headline: 'Titulo',
};

Title.propTypes = { // Validando as props recebidas
  headline: PropTypes.string,
};

export default Title;

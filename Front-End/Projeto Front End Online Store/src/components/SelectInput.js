import React from 'react';
import PropTypes from 'prop-types';

class SelectInput extends React.Component {
  render() {
    const { name, id, title, dataTestid, handleForm } = this.props;
    const brazilStates = [
      'Acre',
      'Alagoas',
      'Amapá',
      'Amazonas',
      'Bahia',
      'Ceará',
      'Distrito Federal',
      'Espirito Santo',
      'Goiás',
      'Maranhão',
      'Mato Grosso do Sul',
      'Mato Grosso',
      'Minas Gerais',
      'Pará',
      'Paraíba',
      'Paraná',
      'Pernambuco',
      'Piauí',
      'Rio de Janeiro',
      'Rio Grande do Norte',
      'Rio Grande do Sul',
      'Rondônia',
      'Roraima',
      'Santa Catarina',
      'São Paulo',
      'Sergipe',
      'Tocantins',
    ];

    return (
      <div>
        <label htmlFor={ id }>
          { title }
        </label>
        <select
          name={ name }
          id={ id }
          data-testid={ dataTestid }
          onChange={ handleForm }
        >
          {brazilStates.map((state) => (
            <option value={ state } key={ state }>{ state }</option>
          ))}
        </select>
      </div>
    );
  }
}

SelectInput.defaultProps = {
  title: 'Send Title as Props',
  dataTestid: '',
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  dataTestid: PropTypes.string,
  handleForm: PropTypes.func.isRequired,
};

export default SelectInput;

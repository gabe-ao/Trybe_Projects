import React from 'react';
import PropTypes from 'prop-types';

class GenericInput extends React.Component {
  render() {
    const { type, name, id, title, dataTestid, handleForm } = this.props;
    return (
      <div>
        <label htmlFor={ id }>
          { title }
          <input
            type={ type }
            name={ name }
            id={ id }
            data-testid={ dataTestid }
            onChange={ handleForm }
          />
        </label>
      </div>
    );
  }
}

GenericInput.defaultProps = {
  title: 'Send Title as Props',
  dataTestid: '',
};

GenericInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  dataTestid: PropTypes.string,
  handleForm: PropTypes.func.isRequired,
};

export default GenericInput;

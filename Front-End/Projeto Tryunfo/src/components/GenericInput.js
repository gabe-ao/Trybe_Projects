import React from 'react';
import PropTypes from 'prop-types';

class GenericInput extends React.Component {
  render() {
    const { type, value, checked, name, id, title, placeholder, dataTestid,
      handler } = this.props;
    return (
      <div>
        <label htmlFor={ id }>
          { title }
          <input
            placeholder={ placeholder }
            type={ type }
            name={ name }
            id={ id }
            value={ value }
            checked={ checked }
            data-testid={ dataTestid }
            onChange={ handler }
          />
        </label>
      </div>
    );
  }
}

GenericInput.defaultProps = {
  title: '',
  placeholder: '',
  dataTestid: '',
  value: '',
};

GenericInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  dataTestid: PropTypes.string,
  handler: PropTypes.func.isRequired,
  value: PropTypes.shape,
  checked: PropTypes.bool.isRequired,
};

export default GenericInput;

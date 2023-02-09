import React from 'react';
import PropTypes from 'prop-types';

class GenericInput extends React.Component {
  render() {
    const { value, type, checked, name, id, title, placeholder, dataTestid,
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
  title: null,
  placeholder: null,
  dataTestid: null,
  checked: false,
  value: undefined,
};

GenericInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  dataTestid: PropTypes.string,
  handler: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.string,
};

export default GenericInput;

import React from 'react';
import PropTypes from 'prop-types';

class GenericTextarea extends React.Component {
  render() {
    const { name, id, value, title, placeholder, dataTestid, handler } = this.props;
    return (
      <div>
        <label htmlFor={ id }>
          { title }
          <textarea
            placeholder={ placeholder }
            name={ name }
            id={ id }
            value={ value }
            data-testid={ dataTestid }
            onChange={ handler }
          />
        </label>
      </div>
    );
  }
}

GenericTextarea.defaultProps = {
  title: '',
  placeholder: '',
  dataTestid: '',
  value: '',
};

GenericTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  dataTestid: PropTypes.string,
  handler: PropTypes.func.isRequired,
  value: PropTypes.shape,
};

export default GenericTextarea;

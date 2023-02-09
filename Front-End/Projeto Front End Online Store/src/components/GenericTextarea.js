import React from 'react';
import PropTypes from 'prop-types';

class GenericTextarea extends React.Component {
  render() {
    const { name, id, title, handleForm } = this.props;
    return (
      <div>
        <label htmlFor={ id }>
          { title }
          <textarea
            name={ name }
            id={ id }
            data-testid="product-detail-evaluation"
            onChange={ handleForm }
          />
        </label>
      </div>
    );
  }
}

GenericTextarea.defaultProps = {
  title: 'Send Title as Props',
};

GenericTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  handleForm: PropTypes.func.isRequired,
};

export default GenericTextarea;

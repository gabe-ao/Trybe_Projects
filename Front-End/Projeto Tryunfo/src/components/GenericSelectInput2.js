import React from 'react';
import PropTypes from 'prop-types';

class GenericSelectInput2 extends React.Component {
  render() {
    const { name, id, value, title, dataTestid, placeholder, options,
      handler } = this.props;

    return (
      <div>
        <label htmlFor={ id }>
          { title }
        </label>
        <select
          name={ name }
          id={ id }
          value={ value }
          data-testid={ dataTestid }
          onChange={ handler }
        >
          {options.map((item) => (
            <option value={ item } key={ item }>{ item }</option>
          ))}
          <option value={ placeholder } selected>{ placeholder }</option>
        </select>
      </div>
    );
  }
}

GenericSelectInput2.defaultProps = {
  title: '',
  dataTestid: '',
  placeholder: 'Select your option',
  options: ['You have to send an array of strings which represents the select options!'],
  value: '',
};

GenericSelectInput2.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  dataTestid: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  handler: PropTypes.func.isRequired,
  value: PropTypes.shape,
};

export default GenericSelectInput2;

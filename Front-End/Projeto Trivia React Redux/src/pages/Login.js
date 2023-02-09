import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getToken from '../services/triviaToken';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  loginBtnEnabled = () => {
    const { name, gravatarEmail } = this.state;
    if (name.length > 0 && gravatarEmail.length > 0) return false;
    return true;
  }

  loginBtnClick = async () => {
    const { history, dispatch } = this.props;
    const token = await getToken();
    localStorage.setItem('token', token);
    dispatch(addUser(this.state));
    history.push('/game');
  }

  settingsBtnClick = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <form>
        <input
          placeholder="nome"
          type="text"
          name="name"
          data-testid="input-player-name"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          placeholder="email"
          type="text"
          name="gravatarEmail"
          data-testid="input-gravatar-email"
          value={ gravatarEmail }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.loginBtnEnabled() }
          onClick={ this.loginBtnClick }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.settingsBtnClick }
        >
          Settings
        </button>
      </form>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

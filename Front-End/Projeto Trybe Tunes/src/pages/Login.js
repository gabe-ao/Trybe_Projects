import React from 'react';
import PropTypes from 'prop-types';
import GenericInput from '../components/GenericInput';
import LoadingMessage from '../components/LoadingMessage';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.lockLoginButton = this.lockLoginButton.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);

    this.state = {
      nameInput: '',
      isLoginButtonDisabled: true,
      isLoading: false,
    };
  }

  onInputChange({ target }) {
    /* Tratador generico de eventos para manter os dados do form salvos em estados */
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.lockLoginButton());
  }

  onLoginClick() {
    this.setState({ isLoading: true }, () => this.loginRequest());
  }

  async loginRequest() {
    const { nameInput } = this.state;
    const { onLoginSuccess } = this.props;
    await createUser({ name: nameInput });
    this.setState({ isLoading: false }, () => onLoginSuccess());
  }

  lockLoginButton() {
    const { nameInput } = this.state;
    const minNameLength = 3;
    if (nameInput.length >= minNameLength) {
      this.setState({ isLoginButtonDisabled: false });
      return;
    }
    this.setState({ isLoginButtonDisabled: true });
  }

  render() {
    const { isLoginButtonDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        { isLoading ? <LoadingMessage />
          : (
            <form>
              <GenericInput
                title="Nome: "
                placeholder="Nome"
                type="text"
                name="nameInput"
                id="nameInput"
                dataTestid="login-name-input"
                handler={ this.onInputChange }
              />
              <button
                type="button"
                name="loginButton"
                disabled={ isLoginButtonDisabled }
                data-testid="login-submit-button"
                onClick={ this.onLoginClick }
              >
                Entrar
              </button>
            </form>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Login;

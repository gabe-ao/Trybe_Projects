import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form } from 'react-bootstrap';
import { cleanLocalStorage, saveLocalStorage } from '../services/localStorage';
import './Login.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    cleanLocalStorage();
  }, []);

  useEffect(() => {
    const enabledButton = () => {
      const minimumPassword = 6;
      const regExp = /\w+@[a-z]+\.com/g;

      if (email.match(regExp) && password.length > minimumPassword) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    enabledButton();
  }, [email, password]);

  const handleEmailChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handlePasswordChange = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const submitUser = () => {
    const { history } = props;
    const userEmail = {
      email,
    };

    saveLocalStorage(JSON.stringify(userEmail));

    history.push('/foods');
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center
      main-page bg-success"
    >
      <h1 className="page-title p-0 m-0 ">Recipes</h1>
      <h1 className="page-title p-0 m-0 mb-4 ml-5 pl-5">App</h1>
      <Form className="mb-5">
        <Form.Control
          className="mb-2 fs-5 other-text"
          type="email"
          placeholder="E-mail"
          value={ email }
          onChange={ handleEmailChange }
          data-testid="email-input"
        />

        <Form.Control
          className="mb-2 fs-5 other-text"
          type="password"
          placeholder="Senha"
          value={ password }
          onChange={ handlePasswordChange }
          data-testid="password-input"
        />

        <Button
          variant={ isDisabled ? 'danger' : 'primary' }
          className="button fs-3"
          type="button"
          disabled={ isDisabled }
          onClick={ submitUser }
          data-testid="login-submit-btn"
        >
          Enter
        </Button>
      </Form>
    </Container>
  );
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;

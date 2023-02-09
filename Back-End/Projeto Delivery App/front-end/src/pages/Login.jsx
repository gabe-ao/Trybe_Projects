import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { requestLogin, setToken } from '../services/requests';

const testIdInputEmail = 'common_login__input-email';
const testIdInputPassword = 'common_login__input-password';
const testIdBtnLogin = 'common_login__button-login';
const testIdBtnRegister = 'common_login__button-register';
const testIdInvalidMessage = 'common_login__element-invalid-email';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableRegisterBtn, setDisableBtn] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(true);
  const history = useHistory();

  function emailRegex(validEmailTest) {
    const regex = /^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/ig;
    return regex.test(validEmailTest);
  }

  const checkLogin = () => {
    const localget = JSON.parse(localStorage.getItem('user')) || [];
    if (localget.role === 'customer') history.push('/customer/products');
    if (localget.role === 'seller') history.push('/seller/orders');
    // if (localgetParse.role === 'customer') history.push('/administrator/');
  };

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    const fieldsValidation = () => {
      const rangePassword = 6;
      const validEmail = emailRegex(email);
      const validPassword = password.length >= rangePassword;
      return (validEmail && validPassword);
    };
    setDisableBtn(fieldsValidation());
  }, [email, password]);

  const handleChange = (target) => {
    const { id, value } = target;
    if (id === 'email') setEmail(value);
    if (id === 'senha') setPassword(value);
  };

  const makeLogin = async () => {
    try {
      const data = await requestLogin('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(
        { name: data.name, email: data.email, role: data.role, token: data.token },
      ));
      localStorage.setItem('userId', JSON.stringify({ id: data.id }));
      setToken(data.token);
      if (data.role === 'administrator') history.push('/admin/manage');
      if (data.role === 'seller') history.push('/seller/orders');
      if (data.role === 'customer') history.push('customer/products');
    } catch {
      setInvalidMessage(false);
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          Login
          <input
            data-testid={ testIdInputEmail }
            type="email"
            id="email"
            placeholder="email@etrybeer.com.br"
            value={ email }
            onChange={ (e) => handleChange(e.target) }
            required
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            data-testid={ testIdInputPassword }
            type="password"
            id="senha"
            value={ password }
            onChange={ (e) => handleChange(e.target) }
            placeholder="*******"
            required
          />
        </label>
        <button
          data-testid={ testIdBtnLogin }
          type="button"
          onClick={ () => makeLogin() }
          disabled={ !disableRegisterBtn }
        >
          Login
        </button>
        <Link to="/register">
          <button
            data-testid={ testIdBtnRegister }
            type="button"
          >
            Ainda não tenho conta
          </button>
        </Link>
      </form>
      <div
        hidden={ invalidMessage }
        data-testid={ testIdInvalidMessage }
      >
        Email ou senha invalido!

      </div>
    </div>
  );
}

export default Login;

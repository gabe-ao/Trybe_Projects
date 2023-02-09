import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin } from '../services/requests';
// import { setUserLocalStorage } from '../services/localStorage';

const testIdInputName = 'common_register__input-name';
const testIdInputEmail = 'common_register__input-email';
const testIdInputPassword = 'common_register__input-password';
const testIdBtnRegister = 'common_register__button-register';
const testIdInvalidMessage = 'common_register__element-invalid_register';
const errorMessage = 'Dados inválidos ou usuário já cadastrado!';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableRegisterBtn, setDisableBtn] = useState(true);
  const [invalidMessage, setInvalidMessage] = useState(true);
  const history = useHistory();

  function emailRegex(validEmailTest) {
    const regex = /^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/ig;
    return regex.test(validEmailTest);
  }

  const handleChange = (target) => {
    const { id, value } = target;
    if (id === 'nameId') setName(value);
    if (id === 'emailId') setEmail(value);
    if (id === 'passwordId') setPassword(value);
  };

  const userRegister = async () => {
    try {
      await requestLogin('/create', { name, email, password });
      const data = await requestLogin('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('userId', JSON.stringify({ id: data.id }));
      history.push('/customer/products');
    } catch (error) {
      setInvalidMessage(false);
    }
  };

  useEffect(() => {
    const fieldsValidation = () => {
      const rangeName = 12;
      const rangePassword = 6;
      const validEmail = emailRegex(email);
      const validName = name.length >= rangeName;
      const validPassword = password.length >= rangePassword;
      return (validEmail && validName && validPassword);
    };
    const fieldsState = fieldsValidation();
    setDisableBtn(!fieldsState);
    setInvalidMessage(fieldsState);
  }, [name, email, password]);

  return (
    <div>
      <form>
        <label htmlFor="nameId">
          Nome
          <input
            data-testid={ testIdInputName }
            type="text"
            id="nameId"
            placeholder="Seu nome"
            value={ name }
            onChange={ (e) => handleChange(e.target) }
            required
          />
        </label>
        <label htmlFor="emailId">
          Email
          <input
            data-testid={ testIdInputEmail }
            type="email"
            id="emailId"
            placeholder="seu-email@site.com.br"
            value={ email }
            onChange={ (e) => handleChange(e.target) }
            required
          />
        </label>
        <label htmlFor="passwordId">
          Senha
          <input
            data-testid={ testIdInputPassword }
            type="password"
            id="passwordId"
            placeholder="*******"
            value={ password }
            onChange={ (e) => handleChange(e.target) }
            required
          />
        </label>
        <button
          data-testid={ testIdBtnRegister }
          type="button"
          disabled={ disableRegisterBtn }
          onClick={ () => userRegister() }
        >
          Cadastrar
        </button>
      </form>
      <div hidden={ invalidMessage }>
        <p data-testid={ testIdInvalidMessage }>
          { errorMessage }
        </p>
      </div>
    </div>
  );
}

export default Register;

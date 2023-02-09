import React, { useState, useEffect } from 'react';
import { requestLogin, requestData } from '../services/requests';
import NavbarAdmin from '../components/NavbarAdmin';
import dataTestsId from '../utils/dataTests/dataTestId';
import dataTestsNoId from '../utils/dataTests/dataTestNoId';

function AdminManage() {
  const [listaUsers, setListUsers] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [userNew, setUserNew] = useState({
    name: '', email: '', password: '', role: '',
  });

  function emailRegex(validEmailTest) {
    const regex = /^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/ig;
    return regex.test(validEmailTest);
  }

  const fieldsValidation = () => {
    const rangeName = 12;
    const rangePassword = 6;
    const validEmail = emailRegex(userNew.email);
    const validName = userNew.name.length >= rangeName;
    const validPassword = userNew.password.length >= rangePassword;
    const selects = userNew.role.length > 0;
    if (validEmail && validName && validPassword && selects) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserNew({ ...userNew, [name]: value });
    fieldsValidation();
  };

  useEffect(() => {
    fieldsValidation();
  }, [userNew]);

  const getUsers = async () => {
    const data = await requestData('/users');
    setListUsers(data);
  };

  useEffect(() => {
    // getName();
    getUsers();
  }, [listaUsers]);

  const userRegisterAdmin = async (e) => {
    e.preventDefault();
    const getToken = JSON.parse(localStorage.getItem('user'));
    const { token } = getToken;
    const tokemLocal = token;
    try {
      await requestLogin('/createPanelAdmin', { userNew, tokemLocal });
    } catch (error) {
      setErrorMessage('Ops! Algo deu errado');
      setInvalidMessage(false);
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <section>
        <form>
          <label htmlFor="nameId">
            Nome
            <input
              data-testid={ dataTestsNoId().inputName }
              type="text"
              id="nameId"
              name="name"
              placeholder="Nome"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="emailId">
            Email
            <input
              data-testid={ dataTestsNoId().inputEmail }
              type="email"
              id="emailId"
              name="email"
              placeholder="Email"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="passwordId">
            Senha
            <input
              data-testid={ dataTestsNoId().inputPassword }
              type="password"
              id="passwordId"
              name="password"
              placeholder="Senha"
              onChange={ handleChange }
            />
          </label>
          <select
            name="role"
            id="roleId"
            data-testid={ dataTestsNoId().inputRole }
            onChange={ handleChange }
          >
            <option
              value="empyt"
              id="roleId"
              defaultValue="role"
              disabled
              hidden
            >
              ---Role---
            </option>
            <option
              value="seller"
              id="roleId"
            >
              Seller
            </option>
            <option
              value="administrator"
              id="roleId"
            >
              Administrator
            </option>
            <option
              value="customer"
              id="roleId"
            >
              Customer
            </option>
          </select>
          <button
            data-testid={ dataTestsId('').buttonRegister }
            type="button"
            onClick={ (e) => userRegisterAdmin(e) }
            disabled={ !disableBtn }
          >
            Cadastrar
          </button>
        </form>
        {' '}
        <div hidden={ invalidMessage }>
          <p data-testid={ dataTestsNoId().invalidButtonRegister }>
            { errorMessage }
          </p>
        </div>
        <section>
          <div>
            Lista de usuários
          </div>
          <div>
            <span>[Item]</span>
            <span>[Nome]</span>
            <span>[E-mail]</span>
            <span>[Tipo]</span>
            <span>[Excluir]</span>
          </div>
          { listaUsers.map((listaUser, index) => (
            <div key={ index + 1 }>
              <span
                data-testid={ dataTestsId(index + 1).itemList }
              >
                { index + 1 }
                { ' ' }
              </span>
              <span
                data-testid={ dataTestsId(index + 1).namelList }
              >
                { listaUser.name }
                { ' ' }
              </span>
              <span
                data-testid={ dataTestsId(index + 1).emailList }
              >
                { listaUser.email }
                { ' ' }
              </span>
              <span
                data-testid={ dataTestsId(index + 1).tipoList }
              >
                { listaUser.role }
                { ' ' }
              </span>
              <button
                type="submit"
                data-testid={ dataTestsId(index + 1).excluirList }
              >
                Excluir
              </button>
            </div>
          )) }
        </section>
      </section>
    </div>
  );
}

export default AdminManage;

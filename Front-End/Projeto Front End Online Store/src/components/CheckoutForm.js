import React from 'react';
import GenericInput from './GenericInput';
import SelectInput from './SelectInput';

class CheckoutForm extends React.Component {
  constructor() {
    super();
    this.handleForm = this.handleForm.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.state = {
      completeName: '',
      cpf: '',
      email: '',
      phone: '',
      cep: '',
      address: '',
      complement: '',
      buildingNumber: '',
      city: '',
      state: '',
      paymentMethod: '',
    };
  }

  handleForm({ target }) {
    /* Tratador generico de eventos para manter os dados do form salvos em estados */
    const { name, value } = target;
    /* const value = target.type === 'checkbox' ? target.checked : target.value; */

    this.setState({
      [name]: value,
    });
  }

  formSubmit() {
    const stateEntries = Object.entries(this.state);
    const emptyFields = stateEntries.filter((value) => value[1] === '');
    if (emptyFields.length === 0) {
      stateEntries.forEach((key) => {
        this.setState({
          [key[0]]: '',
        });
      });
    }
  }

  render() {
    return (
      <form className="checkout-form">
        <section className="user-data">
          <h2>Informações do Comprador</h2>
          <GenericInput
            title="Nome Completo: "
            type="text"
            name="completeName"
            id="completeName"
            dataTestid="checkout-fullname"
            handleForm={ this.handleForm }
          />
          <GenericInput
            title="E-mail: "
            type="text"
            name="email"
            id="email"
            dataTestid="checkout-email"
            handleForm={ this.handleForm }
          />
          <GenericInput
            title="CPF: "
            type="text"
            name="cpf"
            id="cpf"
            dataTestid="checkout-cpf"
            handleForm={ this.handleForm }
          />
          <GenericInput
            title="Telefone: "
            type="text"
            name="phone"
            id="phone"
            dataTestid="checkout-phone"
            handleForm={ this.handleForm }
          />
          <GenericInput
            title="CEP: "
            type="text"
            name="cep"
            id="cep"
            dataTestid="checkout-cep"
            handleForm={ this.handleForm }
          />
          <GenericInput
            title="Endereço: "
            type="text"
            name="address"
            id="address"
            dataTestid="checkout-address"
            handleForm={ this.handleForm }
          />
          <GenericInput
            title="Complemento: "
            type="text"
            name="complement"
            id="complement"
            handleForm={ this.handleForm }
          />
          <GenericInput
            title="Número: "
            type="text"
            name="buildingNumber"
            id="buildingNumber"
            handleForm={ this.handleForm }
          />
          <GenericInput
            title="Cidade: "
            type="text"
            name="city"
            id="city"
            dataTestid="checkout-city"
            handleForm={ this.handleForm }
          />
          <SelectInput
            title="Estado: "
            name="state"
            id="state"
            handleForm={ this.handleForm }
          />
        </section>
        <section className="checkout-payment">
          <h2>Método de Pagamento</h2>
          <div className="payment-methods">
            <label htmlFor="bill" className="payment-label">
              {'Boleto: '}
              <input
                className="radio-payment"
                type="radio"
                id="bill"
                name="paymentMethod"
                value="boleto"
                onChange={ this.handleForm }
              />
            </label>
            <div>
              <label htmlFor="credit-card" className="payment-label">
                {'Cartão de Crédito: '}
              </label>
              <input
                className="radio-payment credit-card"
                type="radio"
                name="paymentMethod"
                value="visa"
                onChange={ this.handleForm }
              />
              {' Visa '}
              <input
                className="radio-payment credit-card"
                type="radio"
                name="paymentMethod"
                value="mastercard"
                onChange={ this.handleForm }
              />
              {' MasterCard '}
              <input
                className="radio-payment credit-card"
                type="radio"
                name="paymentMethod"
                value="elo"
                onChange={ this.handleForm }
              />
              {' Elo '}
            </div>
          </div>
        </section>
        <button type="button" onClick={ this.formSubmit }>
          Comprar!
        </button>
      </form>
    );
  }
}

export default CheckoutForm;

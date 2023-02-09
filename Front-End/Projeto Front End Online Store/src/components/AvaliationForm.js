import React from 'react';
import AvaliationsCards from './AvaliationsCards';
import GenericInput from './GenericInput';
import GenericTextarea from './GenericTextarea';

class AvaliationForm extends React.Component {
  constructor() {
    super();

    this.handleForm = this.handleForm.bind(this);
    this.saveAvaliation = this.saveAvaliation.bind(this);

    this.state = {
      avaliations: [],
      email: '',
      message: '',
      rate: 0,
    };
  }

  componentDidMount() {
    /* Ao montar o componente, as avaliacoes salvas no localStorage sao recuperadas. Caso nao haja nada ainda, o estado padrao das avaliacoes e um array vazio */
    const storage = JSON.parse(window.localStorage.getItem('avaliationsState'));
    const value = storage === null ? [] : storage;
    this.setState({
      avaliations: value,
    });
  }

  componentDidUpdate() {
    /* Como o setState() e assincrono e necessario alterar o localStorage somente apos o componente atualizar. Afim de garantir que o localStorage salvara as avaliacoes somente apos o estado que guarda elas ser atualizado.  */
    const { avaliations } = this.state;
    window.localStorage.setItem('avaliationsState', JSON.stringify(avaliations));
  }

  handleForm({ target }) {
    /* Tratador generico de eventos para manter os dados do form salvos em estados */
    const { name, value } = target;
    /* const value = target.type === 'checkbox' ? target.checked : target.value; */

    this.setState({
      [name]: value,
    });
  }

  saveAvaliation() {
    /* Funcao que salva a avaliacao escrita em estado, ao apertar o botao Avaliar */
    const { email, message, rate } = this.state;
    const form = { email, message, rate };

    this.setState((previousState) => ({
      avaliations: [form, ...previousState.avaliations],
    }));
  }

  render() {
    const { avaliations } = this.state;
    return (
      <section>
        <h3>Avaliar</h3>
        <form>
          <GenericInput
            type="text"
            name="email"
            id="email"
            title="E-mail: "
            className="teste"
            dataTestid="product-detail-email"
            handleForm={ this.handleForm }
          />
          <div>
            <label id="label-rate" htmlFor="radio-rate" onChange={ this.handleForm }>
              {'Nota: '}
              <input
                className="radio-rate"
                data-testid="1-rating"
                type="radio"
                name="rate"
                value="1"
              />
              1
              <input
                className="radio-rate"
                data-testid="2-rating"
                type="radio"
                name="rate"
                value="2"
              />
              2
              <input
                className="radio-rate"
                data-testid="3-rating"
                type="radio"
                name="rate"
                value="3"
              />
              3
              <input
                className="radio-rate"
                data-testid="4-rating"
                type="radio"
                name="rate"
                value="4"
              />
              4
              <input
                className="radio-rate"
                data-testid="5-rating"
                type="radio"
                name="rate"
                value="5"
              />
              5
            </label>
          </div>
          <GenericTextarea
            name="message"
            id="message"
            title="Mensagem (opcional): "
            data-testid="product-detail-evaluation"
            handleForm={ this.handleForm }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.saveAvaliation }
          >
            Avaliar
          </button>
        </form>
        <AvaliationsCards avaliations={ avaliations } />
      </section>
    );
  }
}

export default AvaliationForm;

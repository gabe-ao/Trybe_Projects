import React from 'react';
import PropTypes from 'prop-types';
import GenericInput from './GenericInput';
import GenericTextarea from './GenericTextarea';
import GenericSelectInput from './GenericSelectInput';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo, hasTrunfo, isSaveButtonDisabled, onInputChange, onSaveButtonClick,
    } = this.props;
    const trunfoCheckbox = (
      <GenericInput
        title="Super Trunfo"
        type="checkbox"
        name="cardTrunfo"
        id="cardTrunfo"
        dataTestid="trunfo-input"
        checked={ cardTrunfo }
        handler={ onInputChange }
      />
    );
    return (
      <form>
        <h2>Adicionar nova carta</h2>
        <GenericInput
          title="Nome: "
          placeholder="Nome da Carta"
          type="text"
          name="cardName"
          id="cardName"
          dataTestid="name-input"
          value={ cardName }
          handler={ onInputChange }
        />
        <GenericTextarea
          title="Descrição: "
          placeholder="Descrição da carta..."
          name="cardDescription"
          id="cardDescription"
          dataTestid="description-input"
          value={ cardDescription }
          handler={ onInputChange }
        />
        <GenericInput
          title="Atributo 1: "
          placeholder="0"
          type="number"
          name="cardAttr1"
          id="cardAttr1"
          dataTestid="attr1-input"
          value={ cardAttr1 }
          handler={ onInputChange }
        />
        <GenericInput
          title="Atributo 2: "
          placeholder="0"
          type="number"
          name="cardAttr2"
          id="cardAttr2"
          dataTestid="attr2-input"
          value={ cardAttr2 }
          handler={ onInputChange }
        />
        <GenericInput
          title="Atributo 3: "
          placeholder="0"
          type="number"
          name="cardAttr3"
          id="cardAttr3"
          dataTestid="attr3-input"
          value={ cardAttr3 }
          handler={ onInputChange }
        />
        <GenericInput
          title="URL da Imagem: "
          placeholder="Endereço da imagem"
          type="text"
          name="cardImage"
          id="cardImage"
          dataTestid="image-input"
          value={ cardImage }
          handler={ onInputChange }
        />
        <GenericSelectInput
          title="Raridade: "
          placeholder="Escolha a raridade"
          name="cardRare"
          id="cardRare"
          dataTestid="rare-input"
          options={ ['normal', 'raro', 'muito raro'] }
          value={ cardRare }
          handler={ onInputChange }
        />
        { hasTrunfo ? (<p>Você já tem um Super Trunfo em seu baralho</p>)
          : trunfoCheckbox }
        <button
          type="button"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;

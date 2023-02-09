import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import SearchFilter from './components/SearchFilter';

class App extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.lockSaveButton = this.lockSaveButton.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.resetState = this.resetState.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      cardList: [],
      filterName: '',
      filterRare: 'todas',
      filterList: [],
      filterOn: false,
    };
  }

  onInputChange({ target }) {
    /* Tratador generico de eventos para manter os dados do form salvos em estados */
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => this.lockSaveButton());
  }

  onFilterChange({ target }) {
    const { cardList, filterName, filterRare } = this.state;
    const { name, value } = target;
    let filterList;

    if ((value === '' && filterRare === 'todas')
      || (value === 'todas' && filterName === '')) {
      this.setState({
        [name]: value,
        filterOn: false,
      });
      return;
    }
    if (name === 'filterName' && filterRare === 'todas') {
      filterList = cardList.filter((card) => card.cardName.includes(value));
    } else if (name === 'filterName') {
      filterList = cardList.filter(
        (card) => (card.cardName.includes(value) && card.cardRare === filterRare),
      );
    } else if (name === 'filterRare' && value !== 'todas') {
      filterList = cardList.filter(
        (card) => (card.cardName.includes(filterName) && card.cardRare === value),
      );
    } else if (value === 'todas') {
      filterList = cardList.filter((card) => card.cardName.includes(filterName));
    }
    this.setState({
      [name]: value,
      filterList,
      filterOn: true,
    });
  }

  onSaveButtonClick() {
    const stateArray = Object.entries(this.state);
    const card = {};
    stateArray.forEach(([key, value]) => {
      if (key !== 'hasTrunfo' && key !== 'isSaveButtonDisabled' && key !== 'cardList'
      && key !== 'filterName' && key !== 'filterList' && key !== 'filterOn') {
        card[key] = value;
      }
    });

    if (card.cardTrunfo) {
      this.setState({ hasTrunfo: true });
    }
    const { cardList } = this.state;
    this.setState({
      cardList: [...cardList, card],
    }, () => this.resetState());
  }

  deleteCard({ target }) {
    const { cardList } = this.state;
    const cardToDelete = cardList.find((card) => card.cardName === target.value);
    const newCardList = cardList.filter(
      (card) => card.cardName !== cardToDelete.cardName,
    );

    this.setState({
      cardList: newCardList,
      filterName: '',
      filterRare: 'todas',
      filterOn: false,
    });
    if (cardToDelete.cardTrunfo) {
      this.setState({ hasTrunfo: false });
    }
  }

  lockSaveButton() {
    const { cardName, cardDescription, cardImage, cardRare, cardTrunfo } = this.state;
    let { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const inputs = [cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo];
    if (inputs.filter((input) => input === '').length > 0) {
      this.setState({ isSaveButtonDisabled: true });
      return;
    }

    cardAttr1 = parseInt(cardAttr1, 10);
    cardAttr2 = parseInt(cardAttr2, 10);
    cardAttr3 = parseInt(cardAttr3, 10);
    const maxAttributeValue = 90;
    const maxAttributesSum = 210;
    if (cardAttr1 < 0 || cardAttr2 < 0 || cardAttr3 < 0
      || cardAttr1 > maxAttributeValue
      || cardAttr2 > maxAttributeValue
      || cardAttr3 > maxAttributeValue
      || cardAttr1 + cardAttr2 + cardAttr3 > maxAttributesSum) {
      this.setState({ isSaveButtonDisabled: true });
      return;
    }

    this.setState({
      isSaveButtonDisabled: false,
    });
  }

  resetState() {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled, cardList, filterName, filterRare, filterList, filterOn,
    } = this.state;
    const listToShow = filterOn ? filterList : cardList;
    return (
      <main className="app-main">
        <section className="add-card-form">
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
        </section>
        <section className="card-preview">
          <h2>Pré-visualização da carta</h2>
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            isPreview="true"
            deleteCard={ this.deleteCard }
          />
        </section>
        <section className="deck-display">
          <h2>Todas as cartas</h2>
          <SearchFilter
            filterName={ filterName }
            filterRare={ filterRare }
            onFilterChange={ this.onFilterChange }
          />
          { listToShow.map((card) => (
            <Card
              key={ card.cardName }
              cardName={ card.cardName }
              cardDescription={ card.cardDescription }
              cardAttr1={ card.cardAttr1 }
              cardAttr2={ card.cardAttr2 }
              cardAttr3={ card.cardAttr3 }
              cardImage={ card.cardImage }
              cardRare={ card.cardRare }
              cardTrunfo={ card.cardTrunfo }
              deleteCard={ this.deleteCard }
            />
          ))}
        </section>
      </main>
    );
  }
}

export default App;

import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { requestData } from '../services/requests';
import dataTestsId from '../utils/dataTests/dataTestId';
import dataTestsNoId from '../utils/dataTests/dataTestNoId';
import Context from '../context/Context';

function Products() {
  const {
    products,
    setProducts,
    quantity,
    setQuantity,
    cardValuePrinces,
    setCardValuePrinces,
  } = useContext(Context);

  const history = useHistory();

  const handleQtds = (valor, productId, title, price) => {
    if (valor >= 0) {
      setQuantity([
        ...quantity.filter((fil) => fil.id !== productId),
        {
          id: productId,
          title,
          qtds: Number(valor),
          value: Number(price),
        },
      ]);
    }
  };

  const redirecionar = () => history.push('/customer/checkout');

  const formatarMoeda = (resulteFinal) => resulteFinal.toLocaleString(
    'pt-br',
    { style: 'currency', currency: 'BRL' },
  );

  const calculatevaluesCards = () => {
    const filterValues = quantity.filter((value) => value.qtds !== 0);
    const resulte = filterValues.map((ac) => (ac.qtds * ac.value));
    const resulteFinal = resulte.reduce((ac, va) => ac + va, 0);
    setCardValuePrinces(resulteFinal.toFixed(2));
  };

  const addQuantity = (id, price, title) => {
    setQuantity([
      ...quantity.filter((fil) => fil.id !== id),
      {
        id,
        title,
        qtds: quantity.filter((fil) => fil.id === id)[0].qtds + 1,
        value: Number(price),
      },
    ]);
  };

  const rmQuantity = (id, price, title) => {
    setQuantity([
      ...quantity.filter((fil) => fil.id !== id),
      {
        id,
        title,
        qtds: quantity.filter((fil) => fil.id === id)[0].qtds === 0
          ? 0
          : quantity.filter((fil) => fil.id === id)[0].qtds - 1,
        value: Number(price),
      },
    ]);
  };

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(quantity
       || { id: 0, title: '', qtds: 0, value: 0 }));
    calculatevaluesCards();
  }, [quantity]);

  useEffect(() => {
    requestData('/customer/products')
      .then((response) => {
        setProducts(response);
        setQuantity([
          ...response.map((ma) => ({
            id: ma.id,
            title: ma.name,
            qtds: 0,
            value: Number(ma.price),
          })),
        ]);
      })
      .catch();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div
          key={ product.id }
          style={ {
            border: 'solid 1px #ccc',
            margin: '5px',
            padding: '5px',
          } }
        >
          <div
            data-testid={ dataTestsId(product.id).cardPrince }
          >
            { `R$ ${formatarMoeda(product.price).replace('.', ',')}` }
          </div>
          <div
            data-testid={ dataTestsId(product.id).cardTitle }
          >
            {product.name}
          </div>
          <img
            src={ product.urlImage }
            alt={ product.name }
            data-testid={ dataTestsId(product.id).cardBgImage }
            width="100px"
          />
          <button
            type="button"
            data-testid={ dataTestsId(product.id).cardRmItem }
            value="-"
            onClick={ () => rmQuantity(
              product.id,
              product.price,
              product.name,
            ) }
          >
            -
          </button>
          <input
            type="text"
            pattern="[0-9]+$"
            data-testid={ dataTestsId(product.id).cardQuantity }
            value={
              quantity.filter((fil) => fil.id === product.id).length > 0
                && quantity.filter((fil) => fil.id === product.id)[0].qtds
            }
            // value={ 0 }
            onChange={ (e) => handleQtds(
              e.target.value,
              product.id,
              product.name,
              product.price,
            ) }
          />
          <button
            type="button"
            data-testid={ dataTestsId(product.id).cardAddItem }
            value="+"
            onClick={ () => addQuantity(
              product.id,
              product.price,
              product.name,
            ) }
          >
            +
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid={ dataTestsNoId().buttonCart }
        onClick={ () => redirecionar() }
        disabled={ cardValuePrinces === '0.00' }
      >
        {'Ver Carrinho: R$ '}
        <span
          data-testid={ dataTestsNoId().buttonValue }
        >
          { cardValuePrinces.toString().replace('.', ',') }
        </span>
      </button>
    </div>

  );
}

export default Products;

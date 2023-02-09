import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { requestData, postSales, setToken } from '../services/requests';

function CustomerCheckout() {
  const testIdTotal = 'customer_checkout__element-order-total-price';
  const testIdSellerSelect = 'customer_checkout__select-seller';
  const testIdCustomerAdress = 'customer_checkout__input-address';
  const testIdCustomerAdressNum = 'customer_checkout__input-address-number';
  const testIdSubmitButton = 'customer_checkout__button-submit-order';
  const history = useHistory();

  const dataTests = (index) => {
    const cardOrder = `customer_checkout__element-order-table-item-number-${index}`;
    const cardDescription = `customer_checkout__element-order-table-name-${index}`;
    const cardQuantity = `customer_checkout__element-order-table-quantity-${index}`;
    const cardPrice = `customer_checkout__element-order-table-unit-price-${index}`;
    const cardSubtotal = `customer_checkout__element-order-table-sub-total-${index}`;
    const cardRmItem = `customer_checkout__element-order-table-remove-${index}`;
    return {
      cardOrder,
      cardDescription,
      cardQuantity,
      cardPrice,
      cardSubtotal,
      cardRmItem,
    };
  };

  const [userId, setUserId] = useState('');
  const [sellerId, setSellerId] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [deliveryAddress, setdeliveryAddress] = useState('');
  const [deliveryNumber, setdeliveryNumber] = useState('');
  const [carrinho, setCarrinho] = useState([]);
  const [products, setProducts] = useState([]);

  const checkoutProducts = async () => {
    const cart = carrinho.filter((product) => product.qtds !== 0);
    setProducts(cart);
  };

  useEffect(() => {
    requestData('/sellers').then((response) => setSellers(response));
    const productsCart = localStorage.getItem('carrinho');
    setCarrinho(JSON.parse(productsCart));
    const getUserId = localStorage.getItem('userId');
    setUserId(JSON.parse(getUserId));
  }, []);

  useEffect(() => {
    setTotalPrice(products.reduce((acc, curr) => acc + curr.qtds * curr.value, 0));
    setSellerId(products.map((ma) => ma.id));
  }, [products]);

  useEffect(() => {
    checkoutProducts();
  }, [carrinho]);

  const handleChange = (target) => {
    const { id, value } = target;
    if (id === 'deliveryAddress') setdeliveryAddress(value);
    if (id === 'deliveryNumber') setdeliveryNumber(value);
  };

  const formatarMoeda = (num) => {
    let moeda = String(num);
    moeda = moeda.replace('.', ',');
    return `R$ ${moeda}`;
  };

  const submitButton = async () => {
    if (sellerId > 1) {
      const endpointCheckout = '/customer/checkout';
      const getToken = localStorage.getItem('user');
      const getTokenParse = JSON.parse(getToken);
      setToken(getTokenParse.token);
      const newSale = {
        userId: userId.id,
        sellerId: sellerId[0],
        totalPrice,
        deliveryAddress,
        deliveryNumber,
      };
      const newPro = products.map((product) => ({
        productId: product.id,
        quantity: product.qtds,
      }));
      const retorno = await postSales(endpointCheckout, { newSale, newPro });
      history.push(`/customer/orders/${retorno.rec.id}`);
    }
  };

  const rmButton = (name) => {
    setProducts(products.filter((product) => product.title !== name));
  };

  return (
    <div>
      <Navbar />
      {products.map((product, index) => (
        <div
          key={ index }
          style={ {
            border: 'solid 1px #ccc',
            margin: '5px',
            padding: '5px' } }
        >
          <div
            data-testid={ dataTests(index).cardOrder }
          >
            {index + 1}
          </div>
          <div
            data-testid={ dataTests(index).cardDescription }
          >
            {product.title}
          </div>
          <div
            data-testid={ dataTests(index).cardQuantity }
          >
            {product.qtds}
          </div>
          <div
            data-testid={ dataTests(index).cardPrice }
          >
            {formatarMoeda((product.value).toFixed(2))}
          </div>
          <div
            data-testid={ dataTests(index).cardSubtotal }
          >
            {formatarMoeda((product.value * product.qtds).toFixed(2))}
          </div>
          <button
            type="button"
            data-testid={ dataTests(index).cardRmItem }
            name={ product.title }
            onClick={ (e) => rmButton(e.target.name) }
          >
            Remover
          </button>
        </div>
      ))}
      <div data-testid={ testIdTotal }>
        {formatarMoeda(totalPrice.toFixed(2))}

      </div>
      <p>P. Vendedora Responsável</p>
      <select
        data-testid={ testIdSellerSelect }
        onChange={ (e) => setSellerId(e.target.value) }
      >
        <option value={ 1 }>
          --Vendedores--
        </option>
        {sellers.map((seller, i) => (
          <option
            value={ seller.id }
            key={ i }
            id="sellerId"
          >
            {seller.name}
          </option>))}
      </select>
      <input
        type="text"
        placeholder="Digite seu endereço"
        data-testid={ testIdCustomerAdress }
        onChange={ (e) => setdeliveryAddress(e.target.value) }
      />
      <input
        type="number"
        placeholder="número"
        id="deliveryNumber"
        data-testid={ testIdCustomerAdressNum }
        onChange={ (e) => handleChange(e.target) }
      />
      <button
        type="submit"
        data-testid={ testIdSubmitButton }
        onClick={ () => submitButton() }
      >
        Finalizar Pedido

      </button>
    </div>
  );
}

export default CustomerCheckout;

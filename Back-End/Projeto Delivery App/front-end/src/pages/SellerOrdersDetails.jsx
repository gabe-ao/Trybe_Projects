import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarSeller from '../components/NavbarSeller';
import { requestData, updateSales } from '../services/requests';

function SellerOrdersDetails() {
  const { id } = useParams();
  const [productsOrder, setProductsOrder] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [preparando, setPreparando] = useState(false);
  const [transito, setTransito] = useState(false);

  const dataTestsId = (index) => {
    const orderTable = `seller_order_details__element-order-table-item-number-${index}`;
    const orderTableName = `seller_order_details__element-order-table-name-${index}`;
    const orderTableQty = `seller_order_details__element-order-table-quantity-${index}`;
    const orderTablePrice = `seller_order_details__element-order-table-quantity-${index}`;
    const orderTableSub = `seller_order_details__element-order-table-sub-total-${index}`;

    return {
      orderTable,
      orderTableName,
      orderTableQty,
      orderTablePrice,
      orderTableSub,
    };
  };
  const emTransito = 'Em Trânsito';
  const emTregue = 'Entregue';
  const emPreparando = 'Preparando';
  const emPendente = 'Pendente';

  const statusPedido = async (newStatus) => {
    if (newStatus === emPreparando) {
      setPreparando(false);
      setTransito(true);
    }
    if (newStatus === emTransito) {
      setTransito(true);
    }
    await updateSales(`/salesProducts/${id}`, { status: newStatus });
    setStatus(newStatus);
  };

  const roundValue = (value) => {
    const newValue = Math.round((value) * 100) / 100;
    return newValue.toFixed(2);
  };

  const getInfos = async () => {
    const response = await requestData(`/sale/${id}`);
    const reqSalesProducts = await requestData(`/salesProducts/${response.id}`);
    const reqProducts = await requestData('/customer/products');
    const ver = reqSalesProducts.map((ma) => ({
      name: reqProducts.filter((fil) => fil.id === ma.productId)[0].name,
      qtds: ma.quantity,
      price: reqProducts.filter((fil) => fil.id === ma.productId)[0].price,
    }));
    setProductsList(ver);
    setProductsOrder(response);
    const sum = ver.reduce((acc, ele) => {
      acc += ele.qtds * ele.price;
      return acc;
    }, 0);
    setTotalPrice(roundValue(sum));
    return sum;
  };

  useEffect(() => {
    if (productsOrder.status === emPendente) {
      setTransito(true);
      setPreparando(false);
    }
    if (productsOrder.status === emPreparando) {
      setTransito(false);
      setPreparando(true);
    }
    if (productsOrder.status === emTransito
      || productsOrder.status === emTregue) {
      setTransito(true);
      setPreparando(true);
    }
    getInfos();
  }, [productsOrder]);

  const formarData = (ma) => {
    if (ma) {
      const dia = ma.split('-')[2].split('T')[0];
      const mes = ma.split('-')[1];
      const ano = ma.split('-')[0];
      return `${dia}/${mes}/${ano}`;
    }
  };

  const formatarMoeda = (num) => {
    let moeda = String(num);
    moeda = moeda.replace('.', ',');
    return `R$ ${moeda}`;
  };

  return (
    <div>
      <NavbarSeller />
      <h2>Detalhes do Pedido</h2>
      <span
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        {` Pedido ${productsOrder.id} `}
      </span>
      <span
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        { formarData(productsOrder.saleDate) }
      </span>
      <span
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        { productsOrder.status }
      </span>
      <button
        type="button"
        data-testid="seller_order_details__button-preparing-check"
        disabled={ preparando }
        onClick={ () => statusPedido('Preparando') }
      >
        Preparar Pedido
      </button>
      <button
        type="button"
        data-testid="seller_order_details__button-dispatch-check"
        disabled={ transito }
        onClick={ () => statusPedido('Em Trânsito') }
      >
        Saiu Para Entrega
      </button>
      { productsList.map((ma, index) => (
        <div
          key={ ma.id || index }
          id={ ma.id }
        >
          <span
            data-testid={ dataTestsId(index).orderTable }
            id={ ma.id }
          >
            {index + 1}
          </span>
          <span
            data-testid={ dataTestsId(index).orderTableName }
            id={ ma.id }
          >
            { ' - ' }
            {ma.name}
          </span>
          <span
            data-testid={ dataTestsId(index).orderTableQty }
            id={ ma.id }
          >
            { ' - ' }
            {ma.qtds}
          </span>
          <span
            data-testid={ dataTestsId(index).orderTablePrice }
            id={ ma.id }
          >
            { ' - ' }
            {formatarMoeda(ma.price)}
          </span>
          <span
            data-testid={ dataTestsId(index).orderTableSub }
            id={ ma.id }
          >
            { ' - ' }
            {formatarMoeda(roundValue(ma.price * ma.qtds))}
          </span>
        </div>
      )) }
      <div>
        TOTAL R$
        { ' ' }
        <span data-testid="seller_order_details__element-order-total-price">
          {formatarMoeda(totalPrice)}
        </span>
      </div>
    </div>
  );
}

export default SellerOrdersDetails;

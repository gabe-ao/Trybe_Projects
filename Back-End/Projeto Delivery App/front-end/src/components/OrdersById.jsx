import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import { requestData, updateSales } from '../services/requests';
// import dataTestsId from '../utils/dataTests/dataTestId';
import OrdersList from './OrdersList';

function OrdersById() {
  const {
    // pageOrdersIds,
    // setPageOrdersIds,
    setOrdersList,
  } = useContext(Context);
  const [isDisabled, setisDisabled] = useState(true);
  const [listPageOrders, setListPageOrders] = useState(true);

  const prefix = 'customer_order_details__';
  const deLabelOrderId = `${prefix}element-order-details-label-order-id`;
  const deLabelsellerName = `${prefix}element-order-details-label-seller-name`;
  const deLabelOrderdate = `${prefix}element-order-details-label-order-date`;
  const deLabelDeliveryStatus = `${prefix}element-order-details-label-delivery-status`;
  const deLabelDeliveryCheck = `${prefix}button-delivery-check`;

  const history = useHistory();

  const historyLocOath = history.location.pathname;

  const formarData = (ma) => {
    const dia = ma.saleDate.split('-')[2].split('T')[0];
    const mes = ma.saleDate.split('-')[1];
    const ano = ma.saleDate.split('-')[0];
    return `${dia}/${mes}/${ano}`;
  };

  const pageOrdersIdGet = async () => {
    const sales = await requestData(historyLocOath);
    const reqSallers = await requestData('/sellers');
    const reqSalesProducts = await requestData(`/salesProducts/${sales.id}`);
    const reqSalesById = await requestData(`/sale/${sales.id}`);
    const reqProducts = await requestData('/customer/products');
    setListPageOrders({
      id: reqSalesById.id,
      seller: reqSallers.filter((fil) => fil.id === reqSalesById.sellerId)[0].name,
      saleDate: formarData(sales),
      status: sales.status,
    });
    const ver = reqSalesProducts.map((ma) => ({
      name: reqProducts.filter((fil) => fil.id === ma.productId)[0].name,
      qtds: ma.quantity,
      price: reqProducts.filter((fil) => fil.id === ma.productId)[0].price,
    }));
    setOrdersList(ver);
  };

  const submitButtonId = async (id) => {
    await updateSales(`/salesProducts/${id}`, { status: 'Entregue' });
    setisDisabled(true);
    pageOrdersIdGet();
  };

  useEffect(() => {
    pageOrdersIdGet();
  }, []);

  useEffect(() => {
    if (listPageOrders.status === 'Em Trânsito') {
      setisDisabled(false);
    }
    if (listPageOrders.status === 'Entregue') {
      setisDisabled(true);
    }
    pageOrdersIdGet();
  }, [listPageOrders]);

  return (
    <div key={ listPageOrders.id }>
      <div>
        Detalhe do Pedido
        <div>
          PEDIDO:
          <span data-testid={ deLabelOrderId }>
            { listPageOrders.id }
          </span>
        </div>
        <div>
          <span data-testid={ deLabelsellerName }>
            { listPageOrders.seller }
          </span>
        </div>
        <div>
          <span data-testid={ deLabelOrderdate }>
            { listPageOrders.saleDate }
          </span>
        </div>
        <div>
          <span data-testid={ deLabelDeliveryStatus }>
            { listPageOrders.status }
          </span>
        </div>
        <button
          type="submit"
          data-testid={ deLabelDeliveryCheck }
          onClick={ () => submitButtonId(listPageOrders.id) }
          disabled={ isDisabled }
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
      <div>
        <OrdersList />
      </div>
    </div>
  );
}

export default OrdersById;

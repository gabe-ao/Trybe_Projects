import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import { requestData } from '../services/requests';
import dataTestsId from '../utils/dataTests/dataTestId';

function Orders() {
  const {
    pageOrders,
    setPageOrders,
  } = useContext(Context);

  const history = useHistory();

  const submitButtonId = (id) => {
    history.push(`/customer/orders/${id}`);
  };

  const formarData = (ma) => {
    const dia = ma.saleDate.split('-')[2].split('T')[0];
    const mes = ma.saleDate.split('-')[1];
    const ano = ma.saleDate.split('-')[0];
    return `${dia}/${mes}/${ano}`;
  };

  useEffect(() => {
    requestData('/customer/orders')
      .then((response) => setPageOrders(response));
  }, [pageOrders]);

  return (
    pageOrders.map((ma) => (
      <div key={ ma.id }>
        <button
          type="submit"
          onClick={ () => submitButtonId(ma.id) }
        >
          <div
            data-testid={ dataTestsId(ma.id).orderId }
          >
            { ma.id }
          </div>
          <div
            data-testid={ dataTestsId(ma.id).orderStatus }
          >
            { ma.status }
          </div>
          <div>
            <div
              data-testid={ dataTestsId(ma.id).elementOrderDate }
            >
              { formarData(ma) }
            </div>
            <div
              data-testid={ dataTestsId(ma.id).orderPrice }
            >
              { ma.totalPrice.replace('.', ',') }
            </div>
          </div>
        </button>
      </div>
    ))
  );
}

export default Orders;

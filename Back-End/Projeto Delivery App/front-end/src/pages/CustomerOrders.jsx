import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Orders from '../components/Orders';
import OrdersById from '../components/OrdersById';
import Context from '../context/Context';
import { requestData } from '../services/requests';

function CustomerOrders() {
  const { setPageOrders } = useContext(Context);

  const history = useHistory();

  const endPointOrders = '/customer/orders';
  const historyLocOath = history.location.pathname;

  const pageOrdersGet = async () => {
    const requestSales = await requestData(endPointOrders);
    setPageOrders(requestSales);
  };

  useEffect(() => {
    pageOrdersGet();
  }, []);
  return (
    <div>
      <Navbar />
      {
        historyLocOath === endPointOrders
          ? <Orders />
          : <OrdersById />
      }
    </div>
  );
}

export default CustomerOrders;

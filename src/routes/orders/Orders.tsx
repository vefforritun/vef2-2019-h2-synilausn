import React from 'react';
import { Link } from 'react-router-dom';

import NoAccess from '../system-pages/NoAccess';
import useApi from '../../hooks/useApi';
import { getOrders } from '../../api';
import { IOrder } from '../../api/types';

import './Orders.scss';

export default function Orders() {
  const {items: orders, loading, error} = useApi<IOrder[]>(getOrders.bind(null), []);

  if (error && error === 'invalid token') {
    return (<NoAccess />);
  }

  return (
    <div className="orders">
      <div className="orders__row">
        <div className="orders__col">
        <h1 className="orders__heading">Þínar pantanir</h1>
        {loading && (
            <li>Hleð pöntunum...</li>
          )}
          {error && (
            <li>Villa við að sækja pantanir: {error}</li>
          )}
          {!loading && !error && (
            <div className="table-wrapper">
              <table cellSpacing="0" cellPadding="0">
                <thead>
                  <tr>
                    <th>Pöntun</th>
                    <th>Nafn</th>
                    <th>Heimilisfang</th>
                    <th>Búin til</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr key={i}>
                      <td><Link to={`/orders/${order.id}`}>Pöntun #{order.id}</Link></td>
                      <td>{order.name}</td>
                      <td>{order.address}</td>
                      <td>{order.created.toISOString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

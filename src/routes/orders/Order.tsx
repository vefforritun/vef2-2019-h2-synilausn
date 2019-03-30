import React from 'react';
import { Link } from 'react-router-dom';

import './Orders.scss';
import useApi from '../../hooks/useApi';
import NotFound from '../system-pages/NotFound';
import NoAccess from '../system-pages/NoAccess';
import { getOrder } from '../../api';
import { IOrder } from '../../api/types';

interface IOrderProps {
  // TODO rétt type
  match: any,
}

export default function Order({ match }: IOrderProps) {
  const { params: { id = null } = {}} = match;

  if (!id) {
    return (<NotFound />);
  }

  const {items: order, loading, error} = useApi<IOrder|null>(getOrder.bind(null, id), null);

  // TODO ekki gott að matcha á streng
  if (error && error === 'Order not found') {
    return (<NotFound />);
  }

  if (error && error === 'invalid token') {
    return (<NoAccess />);
  }

  return (
    <div className="orders">
      <div className="orders__row">
        <div className="orders__col">
        {loading && (
            <li>Hleð pöntun...</li>
          )}
          {error && (
            <li>Villa við að sækja pöntun: {error}</li>
          )}
          {!loading && !error && order && (
            <React.Fragment>
              <h1 className="orders__heading">Pöntun #{order.id}</h1>

              <dl className="orders__list">
                <dt className="orders__term">Nafn</dt>
                <dd className="orders__value">{order.name}</dd>
                <dt className="orders__term">Heimilisfang</dt>
                <dd className="orders__value">{order.address}</dd>
                <dt className="orders__term">Búin til</dt>
                <dd className="orders__value">{order.created.toISOString()}</dd>
              </dl>

              <table cellSpacing="0" cellPadding="0">
                <thead>
                  <tr>
                    <th>Vara</th>
                    <th>Verð</th>
                    <th>Fjöldi</th>
                    <th>Samtals</th>
                  </tr>
                </thead>
                <tbody>
                  {order.lines && order.lines.map(line => (
                    <tr>
                      <td><Link to={`/product/${line.product.id}`}>{line.product.title}</Link></td>
                      <td>{line.product.price} kr.-</td>
                      <td>{line.quantity}</td>
                      <td>{line.total}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}></td>
                    <td><strong>{order.total} kr.-</strong></td>
                  </tr>
                </tfoot>
              </table>
              <Link className="orders__link" to="/orders">Aftur í pantanir</Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

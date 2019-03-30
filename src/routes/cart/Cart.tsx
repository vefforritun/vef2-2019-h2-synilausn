import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import useApi from '../../hooks/useApi';
import { getCart } from '../../api';
import { ICart } from '../../api/types';
import { Delete } from '../../components/cart/Delete';
import { Quantity } from '../../components/cart/Quantity';
import { Submit } from '../../components/cart/Submit';

import './Cart.scss';

export default function Order() {
  const [updated, setUpdated] = useState(false);

  const {items: cart, loading, error} = useApi<ICart|null>(getCart.bind(null), null, [updated]);

  // triggerar að gögn séu sótt aftur
  function onUpdate() {
    setUpdated(!updated);
  }

  return (
    <div className="cart">
      <div className="cart__row">
        <div className="cart__col">
        {loading && (
            <p>Hleð körfu...</p>
          )}
          {error && error !== 'Cart not found' && (
            <p>Villa við að sækja körfu: {error}</p>
          )}
          {error && error === 'Cart not found' && (
            <p>Karfa tóm.</p>
          )}
          {!loading && !error && cart && cart.lines.length === 0 && (
            <p>Karfa tóm.</p>
          )}
          {!loading && !error && cart && cart.lines.length > 0 && (
            <Fragment>
              <div className="cart__content">
                {cart.lines.map((line, i) => (
                  <div className="cart__line">
                    <div className="cart__image">
                      <img className="cart__img" src={line.product.image} alt="" />
                    </div>
                    <div className="cart__titleLine">
                      <h2 className="cart__title">
                        <Link to={`/product/${line.product.id}`}>{line.product.title}</Link>
                      </h2>
                      <div className="cart__price">Verð: {line.product.price} kr.-</div>
                    </div>
                    <div className="cart__info">
                      <div className="cart__quantity">
                        <Quantity
                          id={line.id}
                          value={line.quantity.toString()}
                          onUpdate={onUpdate}
                        />
                      </div>
                      <div className="cart__lineTotal">Samtals: {line.total} kr.-</div>
                      <Delete id={line.id} onDelete={onUpdate} />
                    </div>
                  </div>
                ))}
                <div className="cart__line">
                  <div className="cart__image" />
                  <div className="cart__titleLine" />
                  <div className="cart__info">
                    <div className="cart__total">Karfa samtals: {cart.total} kr.-</div>
                  </div>
                </div>
              </div>
              <Submit />
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

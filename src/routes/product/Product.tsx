import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getProduct } from '../../api';
import { IProduct } from '../../api/types';
import { Context } from '../../UserContext';
import useApi from '../../hooks/useApi';
import NotFound from '../system-pages/NotFound';
import AddToCart from '../../components/cart/AddToCart';
import Products from '../../components/products/Products';

import './Product.scss';

interface IProductProps {
  // TODO rétt type
  match: any,
}

export default function Product({ match }: IProductProps) {
  const { params: { id = null } = {}} = match;

  if (!id) {
    return (<NotFound />);
  }

  const {items: product, loading, error} = useApi<IProduct|null>(getProduct.bind(null, id), null, [id]);

  // TODO ekki gott að matcha á streng
  if (error && error === 'Product not found') {
    return (<NotFound />);
  }

  if (loading) {
    return (
      <p>Sæki vöru...</p>
    );
  }

  if (error || !product) {
    return (
      <p>Villa við að sækja vöru: {error}</p>
    );
  }

  return (
    <Fragment>
      <div className="productDetails">
        <div className="productDetails__row">
          {product.image && (
            <div className="productDetails__image">
              <img src={product.image} alt={`Mynd af ${product.title}`} />
            </div>
          )}
          <div className="productDetails__info">
            <h2 className="productDetails__title">{product.title}</h2>
            <p className="productDetails__category">
              <span>Flokkur: </span>
              <Link to={`/categories/${product.category.id}`}>
                {product.category.title}
              </Link>
            </p>
            <p className="productDetails__price">Verð: {product.price} kr.-</p>
            <div className="productDetails__text">
              {product.description && product.description.split('\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Context.Consumer>
              {({ authenticated }) => {
                if (authenticated) {
                  return (<AddToCart productId={product.id} />);
                }
              }}
            </Context.Consumer>
          </div>
        </div>
      </div>

      <div className="productDetails__categories">

        <Products
          title={`Meira úr ${product.category.title}`}
          categoryId={product.category.id}
          limit={6}
        />
      </div>

    </Fragment>
  )
}

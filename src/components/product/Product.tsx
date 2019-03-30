import React from 'react';
import { Link } from 'react-router-dom';

import { IProduct } from '../../api/types';
import './Product.scss';

export default function Product(props: IProduct) {
  const { id, image, title, category, price } = props;

  return (
    <Link to={`/product/${id}`} className="product">
      <div className="product__image">
        {image && (
          <img className="product__img" src={image} alt={`Mynd af ${title}`} />
        )}
      </div>
      <div className="product__content">
        <div className="product__text">
          <h3 className="product__title">{title}</h3>
          <p className="product__category">{category.title}</p>
        </div>
        <p className="product__price">{price} kr.-</p>
      </div>
    </Link>
  );
}
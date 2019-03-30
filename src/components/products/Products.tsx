import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { getProducts } from '../../api';
import useApi from '../../hooks/useApi';

import Paging from '../paging/Paging';
import Search from '../search/Search';
import Product from '../product/Product';

import './Products.scss';
import { IProduct } from '../../api/types';

interface IProductProps {
  title?: string;
  categoryId?: number;
  limit?: number;
  offset?: number;
  label?: string;
  paging?: boolean;
  search?: boolean;
  location: Location;
  history: any;
}

function Products(props: IProductProps) {
  const { title, categoryId: id = undefined,  limit = 10, label, paging = false, search = false, location, history } = props;

  // Geymum state á paging og leit í querystring

  const params = new URLSearchParams(location.search);

  const page: number = Number(params.get('page')) || 1;
  const searchQuery = params.get('search') || undefined;

  const offset = (page - 1) * limit;

  const apiCall = getProducts.bind(null, { limit, offset, category: id, search: searchQuery });

  const {items, loading, error} = useApi<IProduct[]>(apiCall, [], [page, searchQuery]);

  const prev = page > 1 && items.length > 0;
  const next = items.length === limit;

  function onSearchChange(value: string) {
    history.push(`${location.pathname}?search=${value}`);
  }

  function onPagingClick(page: number, dir: string) {
    let newPage = 1;
    switch (dir) {
      case 'prev':
        newPage = Math.max(1, page - 1)
        break;
      case 'next':
        newPage = Math.max(1, page + 1)
        break;
      default:
        break;
    }
    const searchPart = searchQuery ? `&search=${searchQuery}` : '';
    history.push(`${location.pathname}?page=${newPage}${searchPart}`);
  }

  return (
    <section className="category">
      {title && (
        <h2 className="category__title">{title}</h2>
      )}
      {search && (
        <Search query={searchQuery} onChange={onSearchChange} />
      )}
      {loading && (
        <p className="category__error">Sæki vörur...</p>
      )}
      {error && (
        <p className="category__error">Villa við að sækja vörur: {error}</p>
      )}
      {!loading && !error && items.length === 0 && (
        <p className="category__error">Ekkert fannst</p>
      )}
      {!loading && !error && items.length > 0 && (
        <Fragment>
          <div className="category__row">
            {items.map((item: IProduct) => (
              <div key={item.id} className="category__col">
                <Product
                  id={item.id}
                  title={item.title}
                  category={item.category}
                  image={item.image}
                  price={item.price}
                />
              </div>
            ))}
          </div>
          {label && (
            <div className="category__cta">
              <Link className="button" to={`/categories/${id || ''}`}>
                {label}
              </Link>
            </div>
          )}
        </Fragment>
      )}
      {paging && (
        <Paging
          next={next}
          prev={prev}
          page={page}
          onClick={onPagingClick}
        />
      )}
    </section>
  );
}

export default withRouter(Products);

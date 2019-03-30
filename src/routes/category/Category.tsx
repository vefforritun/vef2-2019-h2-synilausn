import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getCategory } from '../../api';
import useApi from '../../hooks/useApi';
import NotFound from '../system-pages/NotFound';
import AddToCart from '../../components/cart/AddToCart';
import Products from '../../components/products/Products';
import { ICategory } from '../../api/types';

interface ICategoryProps {
  // TODO rétt type
  match: any,
}

export default function Category({ match }: ICategoryProps) {
  const { params: { id = null } = {}} = match;

  if (!id) {
    return (<NotFound />);
  }

  const {items: category, loading, error} = useApi<ICategory|null>(getCategory.bind(null, id), null);

  // TODO ekki gott að matcha á streng
  if (error && error === 'Category not found') {
    return (<NotFound />);
  }

  if (loading) {
    return (
      <p>Sæki flokk...</p>
    );
  }

  if (error || !category) {
    return (
      <p>Villa við að sækja flokk: {error}</p>
    );
  }

  return (
    <Fragment>
      <Products
        title={category.title}
        categoryId={category.id}
        limit={12}
        paging
        search
      />
    </Fragment>
  )
}

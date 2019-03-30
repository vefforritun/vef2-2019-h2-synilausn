import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Categories from '../../components/categories/Categories';

export default function CategoriesRoute() {
  return (
    <div className="categories">
      <h2 className="categories__title">Skoðaðu vöruflokkana okkar</h2>
      <ul className="categories__list">
        <Categories>
          {(categories, loading, error) => (
            <Fragment>
            {loading && (
              <li>Hleð flokkum...</li>
            )}
            {error && (
              <li>Villa við að sækja flokka: {error}</li>
            )}
            {!loading && !error && categories.map(cat => (
              <li
                key={cat.id}
                className="categories__item"
              >
                <Link className="categories__link" to={`/categories/${cat.id}`}>
                  <span>{cat.title}</span>
                </Link>
              </li>
            ))}
            </Fragment>
          )}
        </Categories>
      </ul>
    </div>
  );
}

import React from 'react';

import './SystemPages.scss';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="system-page">
      <div className="system-page__row">
        <div className="system-page__col">
          <h2 className="system-page__heading">Síða fannst ekki.</h2>
          <p><Link to="/">Aftur á forsíðu.</Link></p>
        </div>
      </div>
    </div>
  )
}

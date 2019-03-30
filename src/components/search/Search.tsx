import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../button/Button';
import Input from '../input/Input';

import './Search.scss';

interface ISearchProps {
  query: string;
  onChange: (value: string) => {};
}

function Search({ query, onChange }: ISearchProps) {
  const [value, setValue] = useState(query);

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onChange(value);
  }

  function onInputChange(e: any): void {
    const { target: { value = '' } = {} } = e;
    setValue(value);
  }

  return (
    <form method="get" action="" onSubmit={onFormSubmit} className="search">
      <Input
        className="search__input"
        name="search"
        value={value}
        label="Leita:"
        onChange={onInputChange}
      />
      <Button className="search__button" small>Leita</Button>
    </form>
  );
}

export default withRouter(Search);

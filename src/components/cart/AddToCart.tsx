import React, { useState } from 'react';

import Input from '../input/Input';
import Button from '../button/Button';

import './Cart.scss';

import { addProductToCart } from '../../api';

interface IProps {
  productId: number;
}

export default function AddToCart({ productId }: IProps) {
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: any) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await addProductToCart(productId, amount);

      if (!result.ok) {
        setError(result.data.errors);
      } else {
        setError(null);
        setSuccess(true);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function onChange(e: any) {
    const { target: { value = 1 } = {} } = e;

    if (Number.isInteger(Number(value))) {
      setAmount(Number(value));
    }
  }

  if (loading) {
    return (
      <p>Bæti við körfu...</p>
    );
  }

  if (error) {
    return (
      <p>Villa: {error}</p>
    );
  }

  return (
    <form className="addToCart" method="post" action="" onSubmit={onSubmit}>
      <Input
        className="addToCart__input"
        label="Fjöldi"
        name="amount"
        value={amount.toString()}
        onChange={onChange}
      />
      <Button small>Bæta við körfu</Button>
      {success && (
        <p className="addToCart__success">Bætt við körfu!</p>
      )}
    </form>
  )
}
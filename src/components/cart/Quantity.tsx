import React, { useState } from 'react';
import { updateCartLineQuantity } from '../../api';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

interface IQuantityProps {
  id: number;
  value: string;
  onUpdate: () => void;
}

export function Quantity({ id, value, onUpdate }: IQuantityProps) {
  const [quantity, setQuantity] = useState(value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  function onChangeLineQuantity(e: any) {
    const { target: { value = '' } = {} } = e;
    setQuantity(value);
  }

  async function onSubmit(e: any) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await updateCartLineQuantity(id, quantity);

      if (!result.ok) {
        setError(result.data.errors);
        setLoading(false);
      } else {
        setError(null);
        onUpdate();
      }
    } catch (e) {
      setError(e.message);
    }
  }

  if (loading) {
    return <span>Uppfæri línu...</span>;
  }

  return (
    <form className="quantity" method="post" onSubmit={onSubmit}>
      {error && <span>{error}</span>}
      <Input
        className="quantity__input"
        label="Fjöldi:"
        name="quantity"
        value={quantity}
        onChange={onChangeLineQuantity}
      />
      <Button small>Uppfæra</Button>
    </form>
  );
}

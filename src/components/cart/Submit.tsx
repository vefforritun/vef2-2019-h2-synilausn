import React, { useState } from 'react';
import { submitOrder } from '../../api';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

export function Submit() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  function onNameChange(e: any): void {
    const { target: { value = '' } = {} } = e;
    setName(value);
  }

  function onAddressChange(e: any): void {
    const { target: { value = '' } = {} } = e;
    setAddress(value);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await submitOrder(name, address);

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

  const hasError = (f: string) => Boolean(error && error.find((i: any) => i.field === f));

  return (
    <div className="submit">
      <h2 className="submit__title">Senda inn pöntun</h2>

      {loading && (
        <p>Sendi pöntun...</p>
      )}

      {success && (
        <p>Pöntun send!</p>
      )}

      {!loading && !success && (
        <form method="post" action="" onSubmit={onSubmit}>
          {error && (
            <ul className="register__error">
              {error.map((e: any, i: number) => (
                <li key={i}>
                  <label htmlFor={e.field}>{e.field}, {e.error}</label>
                </li>
              ))}
            </ul>
          )}
          <Input
            className="submit__input"
            label="Nafn:"
            name="name"
            onChange={onNameChange}
            value={name}
            invalid={hasError('name')}
          />
          <Input
            className="submit__input"
            label="Heimilisfang:"
            name="address"
            onChange={onAddressChange}
            value={address}
            invalid={hasError('address')}
          />
          <Button>Senda inn pöntun</Button>
        </form>
      )}
    </div>
  )
}
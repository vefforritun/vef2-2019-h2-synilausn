import React, { useState } from 'react';

import {  deleteCartLine } from '../../api';

import Button from '../../components/button/Button';

interface IDeleteProps {
  id: number;
  onDelete: () => void,
}

export function Delete({ id, onDelete }: IDeleteProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  async function onSubmit(e: any) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await deleteCartLine(id);

      if (!result.ok) {
        setError(result.data.errors);
        setLoading(false);
      } else {
        setError(null);
        onDelete();
        return null;
      }
    } catch (e) {
      setError(e.message);
    }
  }

  if (loading) {
    return <span>Eyði línu...</span>;
  }

  return (
    <form method="post" onSubmit={onSubmit}>
      {error && <span>{error}</span>}
      <Button small>Eyða línu</Button>
    </form>
  );
}
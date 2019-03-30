import React, { useState } from 'react';

import Input from '../../components/input/Input';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';

import { Context } from '../../UserContext';

import './Login.scss';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const onSubmit = (loginUser: any) => async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser(username, password);
  }

  function onUsernameChange(e: any): void {
    const { target: { value = '' } = {} } = e;
    setUsername(value);
  }

  function onPasswordChange(e: any): void {
    const { target: { value = '' } = {} } = e;
    setPassword(value);
  }

  const hasError = (f: string) => Boolean(error && error.find((i: any) => i.field === f));

  const usernameInvalid = hasError('username');
  const passwordInvalid = hasError('password');

  return (
    <Context.Consumer>
      {({ message, loginUser, fetching, authenticated }) => {
        console.log('message', message)
        return (
          <div className="login">
            <div className="login__row">
              <div className="login__col">
                <h1 className="login__heading">Innskráning</h1>
                {message && typeof message === 'string' && (
                  <p>{message}</p>
                )}

                {message && Array.isArray(message) && (
                  <ul className="register__error">
                    {message.map((e: any, i: number) => (
                      <li key={i}>
                        <label htmlFor={e.field}>{e.field}, {e.error}</label>
                      </li>
                    ))}
                  </ul>
                )}

                {authenticated && (
                  <p>Notandi innskráður!</p>
                )}

                {fetching && (
                  <p>Skrái inn <em>{username}</em>...</p>
                )}

                {!authenticated && !fetching && (
                  <form className="login__form" onSubmit={onSubmit(loginUser)}>
                    <Input
                      className="login__input"
                      label="Notendanafn:"
                      name="username"
                      value={username}
                      invalid={usernameInvalid}
                      onChange={onUsernameChange}
                    />

                    <Input
                      className="login__input"
                      type="password"
                      label="Lykilorð:"
                      name="password"
                      value={password}
                      invalid={passwordInvalid}
                      onChange={onPasswordChange}
                    />

                    <Button className="login__button" disabled={loading}>Skrá inn</Button>
                  </form>
                )}
                <p><Link className="login__link" to="/register">Nýskráning</Link></p>
              </div>
            </div>
          </div>
        );
      }}
    </Context.Consumer>
  );
}

import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useInput } from '../lib/hooks';
import { useAuth } from '../lib/context/auth-context';

import styles from './home.module.scss';
import MainTemplate from 'templates/main';
import { User } from 'lib/types/user';
import Link from 'next/link';

const Login: NextPage = () => {
  const auth = useAuth();
  const [user, setUser] = useState<User | undefined>(undefined);
  const email = useInput('');
  const password = useInput('');
  const name = useInput('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth?.register(email.value as string, password.value as string);
  };

  useEffect(() => {
    // Check if a user is logged in
    setUser(auth?.getUser());
  }, [auth]);

  return (
    <MainTemplate>
      <h1 className={styles.title}>Register</h1>
      {user ? (
        <p>
          You are already registered!{' '}
          <Link href="/">Click here to return to the home page</Link>.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" name="email" {...email} />
          </label>
          <label>
            Password:
            <input type="password" name="password" {...password} />
          </label>
          <label>
            Name:
            <input type="text" name="name" {...name} />
          </label>
          <button type="submit">Sign me up!</button>
        </form>
      )}
    </MainTemplate>
  );
};

export default Login;

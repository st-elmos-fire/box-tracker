import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useInput } from '../lib/hooks';
import { useAuth } from '../lib/context/auth-context';
import { useRouter } from 'next/router';

import styles from './home.module.scss';
import MainTemplate from 'templates/main';
import { User } from 'lib/types/user';
import Link from 'next/link';
import { Authentication } from 'components';

const Login: NextPage = () => {
  const auth = useAuth();

  const [user, setUser] = useState<User | undefined>(undefined);

  const router = useRouter();

  const handleSubmit = (data: { email: string; password: string }) => {
    auth?.login(data.email, data.password);
    router.push('/');
  };

  useEffect(() => {
    const getUser = auth?.getUser();
    // Check if a user is logged in
    setUser(getUser || undefined);
  }, []);

  return (
    <MainTemplate>
      <h1 className={styles.title}>Login</h1>
      {user?.email ? (
        <p>
          You are already logged in,{' '}
          <Link href="/">Click here to return to the home page</Link>.
        </p>
      ) : (
        <Authentication onLogin={handleSubmit} />
      )}
    </MainTemplate>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useAuth } from '../lib/context/auth-context';
import { useRouter } from 'next/router';

import CenterTemplate from 'templates/center';
import { User } from 'lib/types/user';
import Link from 'next/link';
import { Authentication, Card, CardBody, CardHeader, Logo } from 'components';

import styles from './home.module.scss';

const Login: NextPage = () => {
  const auth = useAuth();

  const [user, setUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const router = useRouter();

  const handleSubmit = (data: { email: string; password: string }) => {
    const login = auth?.login(data.email, data.password);
    if (login) {
      login.then((res) => {
        if (res.type === 'error') {
          setError(res.response as string);
        } else {
          router.push('/');
        }
      });
    }
  };

  useEffect(() => {
    const getUser = auth?.getUser();
    // Check if a user is logged in
    setUser(getUser || undefined);
  }, []);

  return (
    <CenterTemplate>
      {user?.email ? (
        <Card>
          <CardHeader>
            <h2 className={styles['card-header']}>
              {' '}
              🤦‍♂️ You are already logged in!
            </h2>
          </CardHeader>
          <CardBody className={styles['card-body']}>
            <p>
              <Link href="/">
                <a>Click here to return to the home page</a>
              </Link>
              .
            </p>
          </CardBody>
        </Card>
      ) : (
        <Authentication
          appName={process.env.NEXT_PUBLIC_APP_NAME || ''}
          logo={<Logo fill="#000" />}
          onLogin={handleSubmit}
          loginError={error}
        />
      )}
    </CenterTemplate>
  );
};

export default Login;

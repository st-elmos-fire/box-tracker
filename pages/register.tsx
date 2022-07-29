import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useAuth } from '../lib/context/auth-context';

import CenterTemplate from 'templates/center';
import { User } from 'lib/types/user';
import Link from 'next/link';

// Import components
import { RegisterForm, Logo, Card, CardBody, CardHeader } from 'components';

// Import styles
import styles from './home.module.scss';

// Import types
import { RegisterFormData } from 'components/users/register-form';

const Login: NextPage = () => {
  const auth = useAuth();
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [registered, setRegistered] = useState<boolean>(false);

  const handleSubmit = (data: RegisterFormData) => {
    console.log(data);
    const register = auth?.register(data);
    setError(undefined);
    if (register) {
      register.then((res) => {
        if (res.type === 'error') {
          setError(res.response as string);
        }
        if (res.type === 'success') {
          console.log(res.response);
          const { displayName } = res.response as Partial<User>;
          setUserName(displayName);
          setRegistered(true);
        }
      });
    }
  };

  useEffect(() => {
    // Check if a user is logged in
    setUser(auth?.getUser());
  }, [auth]);

  return (
    <CenterTemplate>
      {user?.email ? (
        <Card>
          <CardHeader>
            <h2 className={styles['card-header']}>
              {' '}
              🤦‍♂️ You are already registered!
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
      ) : registered ? (
        <Card>
          <CardHeader>
            <h2 className={styles['card-header']}>
              {' '}
              🎉 Welcome, {userName}, you are registered!
            </h2>
          </CardHeader>
          <CardBody className={styles['card-body']}>
            <p>
              <Link href="/login">
                <a>Click here to login</a>
              </Link>
              .
            </p>
          </CardBody>
        </Card>
      ) : (
        <RegisterForm
          appName={process.env.NEXT_PUBLIC_APP_NAME || ''}
          logo={<Logo fill="#000" />}
          onRegister={handleSubmit}
          registerError={error}
        />
      )}
    </CenterTemplate>
  );
};

export default Login;

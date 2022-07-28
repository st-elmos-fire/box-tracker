import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useAuth } from '../lib/context/auth-context';

import CenterTemplate from 'templates/center';
import { User } from 'lib/types/user';
import Link from 'next/link';

// Import components
import { RegisterForm } from 'components';

const Login: NextPage = () => {
  const auth = useAuth();
  const [user, setUser] = useState<User | undefined>(undefined);

  const handleSubmit = (data) => {
    auth?.register(data);
  };

  useEffect(() => {
    // Check if a user is logged in
    setUser(auth?.getUser());
  }, [auth]);

  return (
    <CenterTemplate>
      {user?.email ? (
        <p>
          You are already registered!{' '}
          <Link href="/">Click here to return to the home page</Link>.
        </p>
      ) : (
        <RegisterForm onRegister={handleSubmit} />
      )}
    </CenterTemplate>
  );
};

export default Login;

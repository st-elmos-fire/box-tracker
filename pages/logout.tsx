import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useAuth } from '../lib/context/auth-context';
import Router from 'next/router';

const Logout: NextPage = () => {
  const auth = useAuth();

  useEffect(() => {
    auth?.logout();
    Router.push('/');
  }, [auth?.logout]);

  return null;
};

export default Logout;

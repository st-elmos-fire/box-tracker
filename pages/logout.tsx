import type { NextPage } from 'next';
import { useAuth } from '../lib/context/auth-context';
import Router from 'next/router';
import { useEffect } from 'react';

const Logout: NextPage = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    Router.push('/');
  }, [logout]);

  return null;
};

export default Logout;

import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import styles from './home.module.scss';
import MainTemplate from 'templates/main';
import useAuth from 'lib/context/auth-context';
import { User } from 'lib/types/user';

const Home: NextPage = () => {
  const auth = useAuth();

  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    // Check if a user is logged in
    setUser(auth?.getUser());
  }, [auth]);

  return (
    <MainTemplate user={user}>
      
    </MainTemplate>
  );
};

export default Home;

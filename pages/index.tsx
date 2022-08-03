import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import styles from './home.module.scss';
import MainTemplate from 'templates/main';
import useAuth from 'lib/context/auth-context';
import { User } from 'lib/types/user';
import { Card, Grid } from 'components';

const Home: NextPage = () => {
  const auth = useAuth();

  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    // Check if a user is logged in
    setUser(auth?.getUser());
  }, [auth]);

  return (
    <MainTemplate user={user}>
      <Grid columns={1}>
        <h2>Welcome to Box Tracker</h2>
        <p>
          This is a simple app to track your boxes. You can add boxes to your
          list, and you can also see the status of your boxes.
        </p>
      </Grid>
      <Grid columns={3}>
        <Card>
          <Card.Header>
            <h3>Boxes</h3>
          </Card.Header>
          <Card.Body>
            <p>
              Boxes are a way to track your boxes. You can add boxes to your
              list, and you can also see the status of your boxes.
            </p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <h3>Status</h3>
          </Card.Header>
          <Card.Body>
            <p>
              Boxes are a way to track your boxes. You can add boxes to your
              list, and you can also see the status of your boxes.
            </p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <h3>Settings</h3>
          </Card.Header>
          <Card.Body>
            <p>
              Boxes are a way to track your boxes. You can add boxes to your
              list, and you can also see the status of your boxes.
            </p>
          </Card.Body>
        </Card>
      </Grid>
    </MainTemplate>
  );
};

export default Home;

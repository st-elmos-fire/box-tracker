import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import MainTemplate from 'templates/main';
import useAuth from 'lib/context/auth-context';

/* Import Types */
import { User } from 'lib/types/user';
interface Props extends React.ComponentProps<'div'> {
  /**
   * The component text
   */
  text: string;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

// Import components
import { SiteCard } from 'components';

const siteA = {
  name: 'Meteor Street',
  address: '23 Meteor Street, Tuffnell Park, London, N7 90PW',
  type: 'source',
  boxes: []
};

const siteB = {
  name: 'Meteor Street',
  address: '23 Meteor Street, Tuffnell Park, London, N7 90PW',
  type: 'destination',
  boxes: []
};

/**
 * The Dashboard Page - this is where a logged in user can manage everything in their account
 */
export const Dashboard: React.FC<Props> = ({
  text = 'No text provided',
  className,
  ...props
}: Props) => {
  const auth = useAuth();

  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    // Check if a user is logged in
    setUser(auth?.getUser());
  }, [auth]);

  return (
    <MainTemplate user={user}>
      <DndProvider backend={HTML5Backend}>
        <div className={`${styles['dashboard']} ${className}`} {...props}>
          <SiteCard {...siteA} />
          <SiteCard {...siteB} />
        </div>
      </DndProvider>
    </MainTemplate>
  );
};

export default Dashboard;
export type { Props };

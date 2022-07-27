import React from 'react';

// Stylesheet
import styles from './styles.module.scss';

// Types
import { User } from 'lib/types/user';
export interface Props extends React.ComponentProps<'header'> {
  /**
   * The User object (if logged in)
   */
  user?: User;
}

// Render component
export const AppHeader: React.FC<Props> = ({ user }: Props) => (
  <header className={styles['app-header']}>
    <div>Logo would go here</div>
    {user && <div className={styles['user-info']}>{user.displayName}</div>}
  </header>
);

export default AppHeader;

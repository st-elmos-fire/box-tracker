import React from 'react';

// Stylesheet
import styles from './styles.module.scss';

// Types
import { User } from 'lib/types/user';
import Link from 'next/link';
import Avatar from 'components/users/avatar';
import UserMenu from 'components/users/user-menu';
export interface Props extends React.ComponentProps<'header'> {
  /**
   * The User object (if logged in)
   */
  user?: User;
}

// Render component
export const AppHeader: React.FC<Props> = ({ user }: Props) => (
  <header className={`${styles['app-header']} ${user && styles['logged-in']}`}>
    <div className={styles['left-col']}>
      <div className={styles['logo']} />
      <div>
        <h1 className={styles['title']}>Box Tracker</h1>
        <p className={styles['subtitle']}>
          The <strong>essential</strong> moving companion
        </p>
      </div>
    </div>
    {user && (
      <div className={styles['right-col']}>
        <UserMenu user={user} />
        <nav>
          <ul className={styles['nav-list']}>
            <li className={styles['nav-item']}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className={styles['nav-item']}>
              <Link href="/">
                <a>About</a>
              </Link>
            </li>
            <li className={styles['nav-item']}>
              <Link href="/">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    )}
  </header>
);

export default AppHeader;

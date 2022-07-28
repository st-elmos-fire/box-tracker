import React from 'react';

// Stylesheet
import styles from './styles.module.scss';

// Types
import { User } from 'lib/types/user';
import Link from 'next/link';
import Avatar from 'components/users/avatar';
export interface Props extends React.ComponentProps<'header'> {
  /**
   * The User object (if logged in)
   */
  user?: User;
}

// Render component
export const AppHeader: React.FC<Props> = ({ user }: Props) => (
  <header className={`${styles['app-header']} ${user && styles['logged-in']}`}>
    <div className={styles['top']}>
      <div className={styles['logo-and-title']}>
        <picture className={styles['logo']}>
          <img
            src="/public/box-tracker-logo.svg"
            alt="An illustration of a box"
          />
        </picture>
        <h1 className={styles['title']}>Box Tracker</h1>
      </div>
      {user && (
        <div className={styles['user-info']}>
          <Avatar
            name={user.displayName}
            imagePath={user.photoUrl}
            size="50px"
          />
        </div>
      )}
    </div>
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
  </header>
);

export default AppHeader;

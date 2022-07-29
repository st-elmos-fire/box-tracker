import React from 'react';

// Stylesheet
import styles from './styles.module.scss';

// Types
import { User } from 'lib/types/user';
import Link from 'next/link';
import UserMenu from 'components/users/user-menu';
export interface Props extends React.ComponentProps<'header'> {
  /**
   * The app Name
   */
  appName: string;
  /**
   * The app Subtitle
   */
  appSubtitle: JSX.Element | string;
  /**
   * Logo (Must be a JSX Element)
   */
  logo?: JSX.Element;
  /**
   * The User object (if logged in)
   */
  user?: User;
}

// Render component
export const AppHeader: React.FC<Props> = ({
  user,
  appName,
  appSubtitle,
  logo
}: Props) => (
  <header className={`${styles['app-header']} ${user && styles['logged-in']}`}>
    <div className={styles['left-col']}>
      <div className={styles['logo']}>{logo}</div>
      <div>
        <h1 className={styles['title']}>{appName}</h1>
        <p className={styles['subtitle']}>{appSubtitle}</p>
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

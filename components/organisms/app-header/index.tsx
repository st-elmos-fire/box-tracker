import React from 'react';
import Link from 'next/link';

// Stylesheet
import styles from './styles.module.scss';

// Types
import { User } from 'lib/types/user';
import LinkObject from 'lib/types/link-object';

// Components
import { UserMenu, TopNavigation } from 'components';

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
  /**
   * The list of links to display
   */
  links: LinkObject[];
}

/**
 * The `AppHeader` component is the header section of the application. It is used to display the logo, application name, user details and primary navigation.
 */
export const AppHeader: React.FC<Props> = ({
  user,
  appName,
  appSubtitle,
  links,
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
    <div className={styles['right-col']}>
      <UserMenu user={user} />
      <TopNavigation links={links} />
    </div>
  </header>
);

AppHeader.displayName = 'AppHeader';

export default AppHeader;

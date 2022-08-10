import React from 'react';

// Stylesheet
import styles from './styles.module.scss';

// Types

import Link from 'next/link';
import LinkObject from 'lib/types/link-object';
import Button from 'components/atoms/button';

export interface Props extends React.ComponentProps<'header'> {
  /**
   * The list of links to display
   */
  links: LinkObject[];
  /**
   * Is the user logged in?
   */
  isLoggedIn?: boolean;
}

/**
 * The `TopNavigation` component is the header section of the application. It is used to display the logo, application name, user details and primary navigation.
 */
export const TopNavigation: React.FC<Props> = ({
  links,
  isLoggedIn
}: Props) => (
  <nav className={styles['top-nav']}>
    <ul className={styles['nav-list']}>
      {links.map((link) => (
        <li key={link.label} className={styles['nav-item']}>
          <Link href={link.href}>
            <a>
              {link.icon} {link.label}
            </a>
          </Link>
        </li>
      ))}
    </ul>
    {isLoggedIn && (
      <Link href="/dashboard">
        <Button variant="primary" label="Dashboard" />
      </Link>
    )}
  </nav>
);

TopNavigation.displayName = 'TopNavigation';

export default TopNavigation;

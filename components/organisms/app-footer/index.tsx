import React from 'react';

// Stylesheet
import styles from './styles.module.scss';

// Types
import { User } from 'lib/types/user';
import Link from 'next/link';
import { UserMenu } from 'components';
import LinkObject from 'lib/types/link-object';
export interface Props extends React.ComponentProps<'header'> {
  /**
   * The app Name
   */
  appName: string;
  /**
   * Left links
   */
  leftLinks?: LinkObject[];
  /**
   * Right links
   */
  rightLinks?: LinkObject[];
}

// Render component
export const AppFooter: React.FC<Props> = ({
  appName,
  leftLinks,
  rightLinks
}: Props) => (
  <footer className={styles['app-footer']}>
    <div className={styles['left-col']}>
      <p>
        Copyright © {new Date().getFullYear()} {appName}
      </p>
    </div>
    <div className={styles['right-col']}>
      <nav>links will go here.</nav>
    </div>
  </footer>
);

AppFooter.displayName = 'AppFooter';

export default AppFooter;

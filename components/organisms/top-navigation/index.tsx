import React from 'react';

// Stylesheet
import styles from './styles.module.scss';

// Types

import Link from 'next/link';
import LinkObject from 'lib/types/link-object';

export interface Props extends React.ComponentProps<'header'> {
  /**
   * The list of links to display
   */
  links: LinkObject[];
}

// Render component
export const TopNavigation: React.FC<Props> = ({ links }: Props) => (
  <nav>
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
  </nav>
);

TopNavigation.displayName = 'TopNavigation';

export default TopNavigation;

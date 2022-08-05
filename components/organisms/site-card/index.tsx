import React from 'react';

// Import components
import { Icons } from 'components';

// Types
import { Box } from 'lib/types/box';
interface Props extends React.ComponentProps<'div'> {
  /**
   * The site name
   */
  name: string;
  /**
   * The site address
   */
  address: string;
  /**
   * The site type
   * @default 'source'
   */
  type?: 'source' | 'destination';
  /**
   * The boxes in the site
   */
  boxes: Box[];
}

/* Import Stylesheet */
import styles from './styles.module.scss';
import Button from 'components/atoms/button';

/*
 * The Site card Component
 */
export const SiteCard: React.FC<Props> = ({
  name,
  address,
  type = 'source',
  boxes,
  className,
  ...props
}: Props) => {
  return (
    <section
      className={`${styles['site-card']} ${
        styles[`site-${type}`]
      } ${className}`}
      {...props}
    >
      <header className={styles['header']}>
        <div className={styles['site-metadata']}>
          <h2 className={styles['site-name']}>{name}</h2>
          <address className={styles['site-address']}>{address}</address>
        </div>
        <div className={styles['site-actions']}>
          <Button variant="secondary" label="Manage" />
          <Button variant="tertiary" label="Generate Labels" iconOnly>
            <Icons.Tag />
          </Button>
        </div>
      </header>
      <div className={styles['content']}>
        <p>Content goes here</p>
        <span>You have {boxes.length} boxes 😎</span>
      </div>
    </section>
  );
};

export default SiteCard;
export type { Props };

import React from 'react';

/* Components */
import { Icons as Icon } from 'components';

/* Stylesheet */
import styles from './styles.module.scss';

/*
 * The Add new box Component
 */
export const AddNewBox: React.FC<React.ComponentProps<'button'>> = ({
  ...props
}: React.ComponentProps<'button'>) => {
  return (
    <button
      className={`${styles['add-new-box']}`}
      {...props}
      title="Add a new box"
    >
      <Icon.Add className={styles['icon']} />
    </button>
  );
};

export default AddNewBox;

import React from 'react';
import classNames from 'classnames';

// Import Stylesheet
import styles from './styles.module.scss';

// Prop Types
export interface Props extends React.ComponentProps<'table'> {
  /**
   * Should the table be striped?
   * @default false
   */
  striped?: boolean;
  /**
   * Should the table have a solid background colour on the header?
   * @default false
   */
  solidHeader?: boolean;
  /**
   * Should the table take up the full width of its container?
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Foward ref to the table element
   */
  innerRef?: React.Ref<HTMLTableElement>;
}

const cx = classNames.bind(styles);

// Render component
export const Table: React.FC<Props> = ({
  striped,
  solidHeader,
  fullWidth,
  children,
  className,
  innerRef,
  ...props
}: Props) => (
  <table
    ref={innerRef || undefined}
    className={cx(
      styles['table'],
      striped && styles['striped'],
      solidHeader && styles['solid-header'],
      fullWidth && styles['full-width'],
      className
    )}
    {...props}
  >
    {children}
  </table>
);

export default Table;

import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

/* Types */
import { BoxItem } from 'lib/types/box-item';
import { Room } from 'lib/types/room';
interface Props extends React.ComponentProps<'div'> {
  /**
   * The boxes uuid
   */
  boxID: string;
  /**
   * The box number
   */
  boxNumber: number;
  /**
   * The box's room
   */
  room: Room;
  /**
   * The first 4 box items
   */
  items: BoxItem[];
  /**
   * The total number of items in the box
   */
  itemCount: number;
  /**
   * The boxes filled status (in percentage)
   */
  percentFilled: number;
  /**
   * The boxes sealed status
   * @default false
   */
  sealed?: boolean;
  /**
   * The boxes selected status
   */
  selected?: boolean;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

/**
 * The `BoxPreview` component is used to display a small preview of a box.
 * It shows the box number, location, first 4 item names, total item count,
 * and filled percentage.
 */
export const BoxPreview: React.FC<Props> = ({
  boxID,
  boxNumber,
  room,
  items,
  itemCount,
  percentFilled,
  sealed = false,
  selected = false,
  className,
  ...props
}) => {
  const remainingItems =
    itemCount -
      items
        .map((item) => item.quantity || 1)
        .reduce((acc, curr) => acc + curr, 0) || 0;

  const [{ isDragging, isDroppabble }, dragRef] = useDrag({
    type: 'BOX',
    item: {
      id: boxID,
      status: sealed
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      isDroppabble: sealed
    })
  });

  return (
    <section
      className={`
        ${styles['box-preview']}
        ${sealed && styles['sealed']}
        ${selected && styles['selected']}
        ${isDragging && styles['dragging']}
        ${isDroppabble ? styles['droppable'] : styles['not-droppable']}
        ${styles[`colour-choice-${room.colour}`]}
        ${className}
        `}
      ref={dragRef}
      {...props}
    >
      <header className={styles['header']}>
        {sealed && !selected && (
          <span className={styles['shippable-banner']}>
            Ready for transport
          </span>
        )}
        {selected && (
          <span className={styles['selected-banner']}>Selected for move</span>
        )}
        <h2 className={styles['box-number']}>Box #{boxNumber}</h2>
        <h3 className={styles['box-location']}>{room.name}</h3>
      </header>
      <ul className={styles['box-items']}>
        {items.map((item, index) => (
          <li key={index} className={styles['box-item']}>
            {item.name}
            {item.quantity > 1 && ` x ${item.quantity}`}
          </li>
        ))}
        {remainingItems > 0 && <li>{remainingItems} more...</li>}
      </ul>
      <footer className={styles['footer']}>
        <div
          className={styles['fill-bar']}
          style={{ width: `${percentFilled}%` }}
        />
        <div
          className={styles['box-items-count']}
        >{`${itemCount} items (${percentFilled}% full)`}</div>
      </footer>
    </section>
  );
};

BoxPreview.displayName = 'BoxPreview';

export default BoxPreview;
export type { Props };

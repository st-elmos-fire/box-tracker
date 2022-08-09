import React from 'react';
import { useDrop } from 'react-dnd';

/* Import Types */
interface Props extends React.ComponentProps<'div'> {
  /**
   * The box id's that were dropped on the target
   */
  droppedBoxes: (ids: string[]) => void;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

/**
 * The Site drag target Component is used to allow the user to drag and drop
 * boxes between the sites.
 */
export const SiteDropTarget: React.FC<Props> = ({
  droppedBoxes,
  className,
  ...props
}: Props) => {
  const getBoxes = (ids: string[]) => {
    droppedBoxes(ids);
  };
  const checkDrop = (status: boolean, id: string) => {
    if (status) {
      return getBoxes([id]);
    }
    return console.log('Drop failed');
  };
  const [{ isOver, accepted }, dropRef] = useDrop({
    accept: 'BOX',
    drop: (item: { status: boolean; id: string }) => {
      return checkDrop(item.status, item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      accepted: monitor.getItemType() === 'BOX'
    })
  });

  return (
    <div
      ref={dropRef}
      className={`
        ${styles['site-drop-target']}
        ${isOver && accepted ? styles['drag-accepted'] : ''}
        ${isOver && !accepted ? styles['drag-denied'] : ''}
        ${className}`}
      {...props}
    >
      Drag a box here to move it to this site
    </div>
  );
};

export default SiteDropTarget;
export type { Props };

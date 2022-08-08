import React, { useState, useEffect } from 'react';

/* Components */
import { BoxPreview, AddNewBox } from 'components';

/* Types */
import { Box } from 'lib/types/box';
import { BoxItem } from 'lib/types/box-item';
interface Props extends React.ComponentProps<'ul'> {
  /**
   * The boxes in the site
   */
  boxes: Box[];
}

/* Stylesheet */
import styles from './styles.module.scss';

/*
 * The Box grid Component
 */
export const BoxGrid: React.FC<Props> = ({
  boxes,
  className,
  ...props
}: Props) => {
  const [boxList, setBoxList] = useState(boxes);

  useEffect(() => {
    setBoxList(boxes);
  }, [boxes]);

  return (
    <ul className={`${styles['box-grid']} ${className}`} {...props}>
      {boxList.map((box) => {
        const contents = box.contents as BoxItem[];
        const itemCount = contents.reduce(
          (acc: number, item: BoxItem) => acc + item.quantity,
          0
        );
        const items = box.contents.slice(0, 4);
        const boxData = {
          boxNumber: box.boxNumber,
          room: box.room,
          items,
          itemCount,
          percentFilled: box.percentFilled || 0,
          sealed: box.sealed
        };
        return (
          <li key={box.uuid}>
            <BoxPreview {...boxData} />
          </li>
        );
      })}
      <li>
        <AddNewBox />
      </li>
    </ul>
  );
};

export default BoxGrid;
export type { Props };

import React, { useState, useEffect } from 'react';

/* Components */
import { BoxPreview, AddNewBox, Modal, Card, AddBoxForm } from 'components';

/* Types */
import { Box } from 'lib/types/box';
import { BoxItem } from 'lib/types/box-item';
interface Props extends React.ComponentProps<'ul'> {
  /**
   * The boxes in the site
   */
  boxes: Box[];
  /**
   * Toggle the select mode
   */
  selectModeEnabled: boolean;
  /**
   * The onSelectBox callback
   */
  onSelectedBoxes: (boxes: Box[]) => void;
}

/* Stylesheet */
import styles from './styles.module.scss';

/**
 * The Box grid Component is used to display a list of boxes. It is designed to be used inside a SiteCard component.
 */
export const BoxGrid: React.FC<Props> = ({
  boxes,
  selectModeEnabled,
  onSelectedBoxes,
  className,
  ...props
}: Props) => {
  const [boxList, setBoxList] = useState(boxes);
  const [selectedBoxes, setSelectedBoxes] = useState<Box[]>([]);
  const [selectMode, setSelectMode] = useState(selectModeEnabled);
  const [addBoxModalOpen, setAddBoxModalOpen] = useState(false);

  useEffect(() => {
    setBoxList(boxes);
  }, [boxes]);

  useEffect(() => {
    setSelectMode(selectModeEnabled);
  }, [selectModeEnabled]);

  useEffect(() => {
    onSelectedBoxes(selectedBoxes);
  }, [selectedBoxes]);

  const handleClick = (box: Box) => {
    if (selectMode) {
      if (selectedBoxes.includes(box)) {
        setSelectedBoxes(selectedBoxes.filter((b) => b.uuid !== box.uuid));
      } else {
        setSelectedBoxes([...selectedBoxes, box]);
      }
    }
  };

  const AddBoxModal = () => {
    return (
      <Modal isOpen={addBoxModalOpen} setIsOpen={setAddBoxModalOpen}>
        <Card>
          <Card.Header>Add new box</Card.Header>
          <Card.Body>
            <AddBoxForm />
          </Card.Body>
        </Card>
      </Modal>
    );
  };

  return (
    <ul
      className={`
          ${styles['box-grid']}
          ${selectMode ? styles['select-mode'] : ''}
          ${className}
        `}
      {...props}
    >
      {boxList.map((box) => {
        const contents = box.contents as BoxItem[];
        const boxSelected = selectedBoxes.includes(box);
        const itemCount = contents.reduce(
          (acc: number, item: BoxItem) => acc + item.quantity,
          0
        );
        const items = box.contents.slice(0, 4);
        const boxData = {
          boxID: box.uuid,
          boxNumber: box.boxNumber,
          room: box.room,
          items,
          itemCount,
          percentFilled: box.percentFilled || 0,
          sealed: box.sealed
        };
        return (
          <li key={box.uuid}>
            <BoxPreview
              {...boxData}
              className={styles['box-preview']}
              onClick={() => handleClick(box)}
              selected={selectMode && boxSelected}
              title={
                selectMode
                  ? `${boxSelected ? 'Remove from' : 'Add to'} box selection`
                  : 'View box'
              }
            />
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

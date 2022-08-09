import React, { useState, useEffect } from 'react';

// Components
import { Icons, BoxGrid, SiteCardFilter } from 'components';

// Helpers
import { getTrueItemCount } from 'lib/helpers';

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
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('Box Number');
  const [view, setView] = useState('Boxes');
  const [boxList, setBoxList] = useState<Box[]>(boxes);
  const [selectMode, setSelectMode] = useState(false);

  useEffect(() => {
    setBoxList(boxes);
  }, [boxes]);

  const handleFilterChange = (value: string) => {
    setFilter(value);
    if (value === '') {
      setBoxList(boxes);
    } else {
      // Filter by box number
      setBoxList(
        boxList.filter((box) => box.boxNumber.toString().includes(value))
      );
      // Filter by room
      setBoxList(
        boxList.filter((box) =>
          box.room.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        )
      );
      // Filter by item name
      setBoxList(
        boxList.filter((box) =>
          box.contents.some((item) =>
            item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
          )
        )
      );
    }
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setBoxList(
      boxList.sort((a, b) => {
        if (value === 'boxNumber') {
          return a.boxNumber - b.boxNumber;
        } else if (value === 'room') {
          const nameA = a.room.name.toLocaleLowerCase();
          const nameB = b.room.name.toLocaleLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        } else if (value === 'itemCount') {
          return getTrueItemCount(a.contents) - getTrueItemCount(b.contents);
        } else if (value === 'percentFilled') {
          const percentA = a.percentFilled || 0;
          const percentB = b.percentFilled || 0;
          return percentA - percentB;
        } else {
          return 0;
        }
      })
    );
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') {
      setSelectMode(true);
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
      setSelectMode(false);
    }
  });

  const handleSelectModeChange = (value: boolean) => {
    setSelectMode(value);
  };

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
          <Button
            variant="secondary"
            label="Manage"
            className={styles['tag-button']}
          />
          <Button variant="tertiary" label="Generate Labels" iconOnly>
            <Icons.Tag />
          </Button>
        </div>
      </header>
      <div className={styles['content']}>
        <SiteCardFilter
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onViewChange={setView}
          onSelectModeChange={handleSelectModeChange}
          filterValue={filter}
          sortValue={sort}
          viewValue={view}
          selectModeEnabled={selectMode}
        />
        <BoxGrid boxes={boxList} selectModeEnabled={selectMode} />
      </div>
    </section>
  );
};

export default SiteCard;
export type { Props };

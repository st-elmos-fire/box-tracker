import React, { useState, useEffect } from 'react';

// Components
import { Icons, BoxGrid, SiteCardFilter } from 'components';

// Helpers
import { getTrueItemCount } from 'lib/helpers';

// Hooks
import { usePrevious } from 'lib/hooks';

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
  const prevFilter = usePrevious(filter);
  const prevSort = usePrevious(sort);
  const prevView = usePrevious(view);

  const [filteredBoxes, setFilteredBoxes] = useState(boxes);
  const [sortedBoxes, setSortedBoxes] = useState(boxes);
  const [boxList, setBoxList] = useState(boxes);

  useEffect(() => {
    if (filter) {
      const filteredBoxes = boxes.filter((box) => {
        // Filter by box number
        if (box.boxNumber.toString() === filter) {
          return true;
        }
        // Filter by room
        if (box.room.name.toLowerCase().includes(filter.toLowerCase())) {
          return true;
        }
        // Filter by contents
        if (
          box.contents.some((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase())
          )
        ) {
          return true;
        }
        return false;
      });
      setFilteredBoxes(filteredBoxes);
    } else {
      setFilteredBoxes(boxes);
    }
  }, [filter, boxes]);

  useEffect(() => {
    if (sort === 'boxNumber') {
      console.log('sort by box number');
      return setSortedBoxes(
        filteredBoxes.sort((a, b) => a.boxNumber - b.boxNumber)
      );
    }
    if (sort === 'room') {
      console.log('sort by room');
      return setSortedBoxes(
        filteredBoxes.sort((a, b) => a.room.name.localeCompare(b.room.name))
      );
    }
    if (sort === 'itemCount') {
      console.log('sort by item count');
      return setSortedBoxes(
        filteredBoxes.sort(
          (a, b) => getTrueItemCount(a.contents) - getTrueItemCount(b.contents)
        )
      );
    }
    if (sort === 'percentFilled') {
      console.log('sort by percent filled');
      return setSortedBoxes(
        filteredBoxes.sort((a, b) => {
          const aPercent = a.percentFilled || 0;
          const bPercent = b.percentFilled || 0;
          return aPercent - bPercent;
        })
      );
    }
    return setSortedBoxes(filteredBoxes);
  }, [sort, filteredBoxes]);

  useEffect(() => {
    if (prevSort !== sort) {
      setBoxList(sortedBoxes);
    }
    if (prevFilter !== filter) {
      setBoxList(filteredBoxes);
    }
  }),
    [sort, filter, prevFilter, prevSort];

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
          onFilterChange={setFilter}
          onSortChange={setSort}
          onViewChange={setView}
          filterValue={filter}
          sortValue={sort}
          viewValue={view}
        />
        <BoxGrid boxes={boxList} />
      </div>
    </section>
  );
};

export default SiteCard;
export type { Props };

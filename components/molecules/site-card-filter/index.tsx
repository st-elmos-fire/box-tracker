import React, { useState } from 'react';

/* Components */
import { InputFactory } from 'components';

/* Types */
interface Props extends React.ComponentProps<'div'> {
  /**
   * The onChange callback for the filter input
   */
  onFilterChange: (value: string) => void;
  /**
   * The onChange callback for the sort input
   */
  onSortChange: (value: string) => void;
  /**
   * The onChange callback for the view input
   */
  onViewChange: (value: string) => void;
  /**
   * Initial value for the filter input
   */
  filterValue?: string;
  /**
   * Initial value for the sort input
   */
  sortValue?: string;
  /**
   * Initial value for the view input
   */
  viewValue?: string;
}

/*  Stylesheet */
import styles from './styles.module.scss';

/*
 * The Site card filter Component
 */
export const SiteCardFilter: React.FC<Props> = ({
  onFilterChange,
  onSortChange,
  onViewChange,
  filterValue = '',
  sortValue = 'Box Number',
  viewValue = 'Boxes',
  className,
  ...props
}: Props) => {
  const [filter, setFilter] = useState(filterValue);
  const [sort, setSort] = useState(sortValue);
  const [view, setView] = useState(viewValue);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter(value);
    onFilterChange(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSort(value);
    onSortChange(value);
  };

  const handleViewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setView(value);
    onViewChange(value);
  };

  return (
    <div className={`${styles['site-card-filter']} ${className}`} {...props}>
      <InputFactory
        type="select"
        labelText="View"
        options={[{ label: 'Boxes', value: 'boxes' }]}
        className={styles['select-view']}
        value={view}
        onChange={handleViewChange}
      />

      <div className={styles['refine-results']}>
        <InputFactory
          type="text"
          placeholder="Start typing..."
          labelText="Filter results"
          value={filter}
          onChange={handleFilterChange}
        />

        <InputFactory
          type="select"
          labelText="Sort by"
          options={[
            { label: 'Box Number', value: 'boxNumber' },
            { label: 'Room', value: 'room' },
            { label: 'Item Count', value: 'itemCount' },
            { label: 'Percent Filled', value: 'percentFilled' }
          ]}
          value={sort}
          onChange={handleSortChange}
        />
      </div>
    </div>
  );
};

export default SiteCardFilter;
export type { Props };

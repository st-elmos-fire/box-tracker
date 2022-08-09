import React, { useState, useEffect } from 'react';

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
   * The onChange callback for the selectMode toggle input
   */
  onSelectModeChange: (value: boolean) => void;
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
  /**
   * Initial value for the selectMode toggle input
   */
  selectModeEnabled?: boolean;
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
  onSelectModeChange,
  filterValue = '',
  sortValue = 'BoxNumber',
  viewValue = 'Boxes',
  selectModeEnabled = false,
  className,
  ...props
}: Props) => {
  const [filter, setFilter] = useState(filterValue);
  const [sort, setSort] = useState(sortValue);
  const [view, setView] = useState(viewValue);
  const [selectMode, setSelectMode] = useState(selectModeEnabled);

  useEffect(() => {
    setSelectMode(selectModeEnabled);
  }, [selectModeEnabled]);

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

  const handleModeChange = () => {
    setSelectMode(!selectMode);
    onSelectModeChange(!selectMode);
  };

  return (
    <div className={`${styles['site-card-filter']} ${className}`} {...props}>
      <div className={styles['left']}>
        <InputFactory
          type="select"
          labelText="View"
          options={[{ label: 'Boxes', value: 'boxes' }]}
          value={view}
          onChange={handleViewChange}
        />
        <InputFactory
          type="checkbox"
          labelText="Select multiple"
          checked={selectMode}
          onChange={handleModeChange}
          title="You can also use the shift key to select multiple boxes"
        />
      </div>

      <div className={styles['right']}>
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

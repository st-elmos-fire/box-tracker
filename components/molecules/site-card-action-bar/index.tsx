import React, { useState, useEffect } from 'react';

/* Components */
import { InputFactory, Button } from 'components';

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
  /**
   * Selected boxes
   */
  selectedBoxes?: string[];
}

/*  Stylesheet */
import styles from './styles.module.scss';

/*
 * The Site card action bar component is used to display the filter, sort, and view options.
 */
export const SiteCardActionBar: React.FC<Props> = ({
  onFilterChange,
  onSortChange,
  onViewChange,
  onSelectModeChange,
  filterValue = '',
  sortValue = '',
  viewValue = 'boxes',
  selectModeEnabled = false,
  selectedBoxes = [],
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

  const handleViewChange = (viewValue: string) => {
    setView(viewValue);
    onViewChange(viewValue);
  };

  const handleModeChange = () => {
    setSelectMode(!selectMode);
    onSelectModeChange(!selectMode);
  };

  const handleMoveBoxes = () => {
    console.log(`moved ${selectedBoxes.length} boxes`);
    console.log(selectedBoxes.join(', '));
  };

  const availableViews = ['boxes', 'rooms', 'items'];

  return (
    <div
      className={`${styles['site-card-action-bar']} ${className}`}
      {...props}
    >
      <nav className={styles['nav-bar']}>
        <ul>
          {availableViews.map((v) => (
            <li key={v}>
              <Button
                variant="text"
                onClick={() => handleViewChange(v)}
                label={`Show ${v}`}
                active={view === v}
              />
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles['filter-bar']}>
        <div className={styles['left']}>
          <InputFactory
            type="text"
            labelText="Filter boxes"
            hideLabel
            value={filter}
            placeholder="Search boxes..."
            onChange={handleFilterChange}
            className={styles['input-filter']}
          />

          <InputFactory
            type="select"
            labelText="Sort by"
            hideLabel
            placeholder="Sort by..."
            options={[
              { label: 'Sort by box number', value: 'boxNumber' },
              { label: 'Sort by room', value: 'room' },
              { label: 'Sort by item Count', value: 'itemCount' },
              { label: 'Sort by percent Filled', value: 'percentFilled' }
            ]}
            value={sort}
            onChange={handleSortChange}
            className={styles['input-sort']}
          />
        </div>
        <div className={styles['right']}>
          {selectMode ? (
            <div className={styles['select-mode']}>
              <Button
                variant="secondary"
                onClick={handleMoveBoxes}
                label={`Move ${selectedBoxes.length} boxes`}
              />
              <Button
                variant="tertiary"
                onClick={handleModeChange}
                label="Cancel"
                iconOnly
                preset="close"
              />
            </div>
          ) : (
            <Button
              variant="primary"
              onClick={handleModeChange}
              label="Move multiple boxes"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteCardActionBar;
export type { Props };

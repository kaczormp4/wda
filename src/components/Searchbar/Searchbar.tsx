import { FC, FocusEventHandler, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Categories, FilterType, ICategory, ICategoryFilter, IFilter } from '../../api/Categories';
import Button from '../commonComponents/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { Navigate, useNavigate } from 'react-router-dom';
import { IsAny } from 'react-hook-form';
import { filter } from 'lodash';

import styles from './Searchbar.module.scss';
type P = {
  categories: ICategory[];
  className?: string;
};

const Searchbar: FC<P> = (props: P) => {
  const [isOpen, setOpen] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>();
  const [textQuery, setTextQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ICategoryFilter>(null);
  const [selectedFilters, setSelectedFilters] = useState<IFilter['filterValues']>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.value = '';
    }
  }, [textQuery]);

  const openDropdown = (event: any) => {
    setOpen(true);
  };

  const closeDropdown = (event: any) => {
    if (!wrapperRef.current.contains(event.relatedTarget)) {
      setOpen(false);
    }
  };


  if (!props.categories) {
    return <Button size="lg" className={styles.Skeleton} skeleton></Button>;
  }

  const addCategoryFilter = (cat: ICategory) => {
    setLoadingCategory(true);
    new Categories().getById(cat.id).then(currentCat => {
      setLoadingCategory(false);
      setSelectedCategory(currentCat);
      setSelectedFilters([]);
    });
  };

  const addFilter = (filter: IFilter['filterValues'][0]) => {
    const filterGroup = selectedCategory.filters.find(v =>
      v.filterValues.map(v => v.id).includes(filter.id)
    );

    if (filterGroup.filterType === FilterType.SelectOne) {
      // deselect filter from the same group
      const filterWithout = [...selectedFilters].filter(
        filter => !filterGroup.filterValues.map(v => v.id).includes(filter.id)
      );
      setSelectedFilters([...filterWithout, filter]);
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const removeFilter = (filter: IFilter['filterValues'][0]) => {
    setSelectedFilters(selectedFilters.filter(v => v.id !== filter.id));
  };

  const getCategoryTag = (cat: ICategory) => {
    return (
      <Button
        className={classnames(styles.Tag, {
          [styles.Disabled]: selectedCategory && selectedCategory.id !== cat.id,
          [styles.Selected]: selectedCategory && selectedCategory.id === cat.id,
        })}
        kind="teritiary"
        onClick={() => (selectedCategory?.id !== cat.id ? addCategoryFilter(cat) : null)}
      >
        {cat.name}
      </Button>
    );
  };

  const getFilterTag = (
    filter: IFilter['filterValues'][0],
    type: FilterType,
    oneOfGroupSelected: boolean
  ) => {
    const filterSelected = selectedFilters.map(v => v.id).includes(filter.id);
    return (
      <Button
        className={classnames(styles.Tag, {
          [styles.Selected]: filterSelected,
          [styles.Inactive]: !filterSelected && oneOfGroupSelected && type === FilterType.SelectOne,
        })}
        kind="teritiary"
        onClick={() => (filterSelected ? removeFilter(filter) : addFilter(filter))}
        icon={filterSelected ? <FontAwesomeIcon icon="close" /> : null}
      >
        {filter.value}
        {/* {filterSelected && <FontAwesomeIcon icon="close" />} */}
      </Button>
    );
  };

  const getCategoryFilter = () => {
    if (selectedCategory) {
      return (
        <div className={styles.TagFilter}>
          <button className={styles.Main}>{selectedCategory.name}</button>
          <button className={styles.Close}>
            <FontAwesomeIcon icon="close" />
          </button>
        </div>
      );
    }
    return <></>;
  };

  const getFilters = () => {
    if (selectedFilters.length) {
      return selectedFilters.map(v => {
        return (
          <div className={styles.TagFilter}>
            <button className={styles.Main}>{v.value}</button>
            <button className={styles.Close} onClick={() => removeFilter(v)}>
              <FontAwesomeIcon icon="close" />
            </button>
          </div>
        );
      });
    }
    return <></>;
  };

  const getFilterControls = (filter: IFilter) => {
    const groupIDs = filter.filterValues.map(v => v.id);
    const oneOfGroupSelected = groupIDs.some(v => selectedFilters.map(v => v.id).includes(v));

    return (
      <>
        <label>{filter.name}</label>
        <div className={styles.TypeSection}>
          {filter.filterValues.map(v => getFilterTag(v, filter.filterType, oneOfGroupSelected))}
        </div>
      </>
    );
  };

  const getCategoryLoader = () => {
    return [...new Array(3)].map(v => {
      return (
        <div>
          <div></div>
        </div>
      );
    });
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      setTextQuery((e.target as HTMLInputElement).value);
    }
  };

  const getQuery = () => {
    if (textQuery) {
      return (
        <div className={styles.TagFilter}>
          <button className={styles.Main}>
            <FontAwesomeIcon icon="quote-left" className={styles.TagIcon} />
            {textQuery}
          </button>
          <button className={styles.Close} onClick={() => setTextQuery(null)}>
            <FontAwesomeIcon icon="close" />
          </button>
        </div>
      );
    }
    return <></>;
  };

  const search = () => {
    // transform all filters to query and navigate
    const category = `/ogloszenia/${selectedCategory.id}`;
    let query = '';
    if (textQuery) {
      query += `?text=${textQuery}`;
    }
    if (selectedFilters.length) {
      if (!textQuery) {
        query = '?';
      } else {
        query += '&';
      }
      let filters = {} as any;
      selectedFilters.forEach(filter => {
        // assign to filter category
        const filterGroup = selectedCategory.filters.find(v =>
          v.filterValues.map(v => v.id).includes(filter.id)
        );
        if (filters[filterGroup.id]) {
          filters[filterGroup.id].push(filter.id);
        } else {
          filters[filterGroup.id] = [filter.id];
        }
      });
      const filtersArr = Object.keys(filters);

      filtersArr.forEach((v, i) => {
        query += `${v}=`;
        query += filters[v].toString();
        if (i < filtersArr.length - 1) {
          query += '&';
        }
      });
    }
    const url = category + query;
    navigate(url);
  };

  return (
    <div
      className={classnames(styles.Wrapper, props.className)}
      onClick={openDropdown}
      onFocus={openDropdown}
      onBlur={closeDropdown}
      tabIndex={0}
      ref={wrapperRef}
    >
      <div className={styles.Searchbar}>
        <div className={styles.TagList}>
          {getCategoryFilter()}
          {getFilters()}
          {getQuery()}
        </div>
        {!isOpen && !selectedCategory && (
          <span className={styles.Placeholder}>Wybierz filtry aby wyszukać ogłoszenia</span>
        )}
        <input
          ref={inputRef}
          className={styles.Input}
          onBlur={closeDropdown}
          onKeyDown={e => handleInputKeyDown(e)}
        />
        <Button onClick={() => search()} disabled={!selectedCategory}>
          Szukaj
        </Button>
      </div>
      {isOpen && (
        <div className={styles.Dropdown}>
          <div className={styles.DropdownSection}>
            <label>Kategorie</label>
            <div className={styles.TypeSection}>
              {props.categories.map(cat => getCategoryTag(cat))}
            </div>
            {selectedCategory?.filters.map(filter => getFilterControls(filter))}
          </div>
          {/* <div className={styles.DropdownSection}>
            <label>Cena</label>
            <div className={styles.TypeSection}>10-100zł</div>
          </div> */}
        </div>
      )}
    </div>
  );
};
export default Searchbar;

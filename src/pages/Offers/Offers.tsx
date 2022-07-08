import { FC, useEffect, useState } from 'react';
import s from './Offers.module.scss';
import { IOffer, Offers as OfferAPI } from '../../api/Offers';

import { useParams, useNavigate } from 'react-router-dom';
import { Categories, FilterType, ICategory, ICategoryFilter, IFilter } from '../../api/Categories';
import { fill } from 'lodash';
import Select, { ISelectItem } from '../../components/commonComponents/Select/Select';
import Button from '../../components/commonComponents/Button/Button';
import classNames from 'classnames';
import MultiSelect from '../../components/commonComponents/MultiSelect/MultiSelect';
import { OffersView } from './OffersView';
import Input from '../../components/commonComponents/Input/Input';

type OffersProps = {
  offers?: IOffer[];
};

const Offers = (props: OffersProps) => {
  const propsOffers = props.offers;
  const [offers, setOffers] = useState<IOffer[]>(propsOffers);
  const [category, setCategory] = useState<ICategoryFilter>(null);
  const [categories, setCategories] = useState<ICategory[]>(null);
  const [dynamicFilters, setDynamicFilters] = useState([]);
  const [searchValue, setSearchValue] = useState<string>('');
  let { id } = useParams();
  const categoryId = Number(id);
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.offers) {
      if (id === undefined) navigate('notfound');
      new OfferAPI().getByCategory(categoryId).then(off => {
        setOffers(off);
      });
      new Categories().get().then(cats => {
        setCategories(cats);
      });
      new Categories().getById(id).then(currentCat => {
        setCategory(currentCat);
      });
    }
  }, [id]);

  const onCategoryChange = (item: ISelectItem) => {
    navigate(`/ogloszenia/${item.value}`);
  };

  const changeFilters = (filterGroup: number, item: ISelectItem | ISelectItem[]) => {
    let newFilters = { ...dynamicFilters };
    newFilters[filterGroup] = (
      (item as ISelectItem[]).length
        ? (item as ISelectItem[]).map(v => v.id)
        : [(item as ISelectItem).id]
    ).filter(v => v !== -1);
    if (newFilters[filterGroup].length === 0) {
      delete newFilters[filterGroup];
    }
    setDynamicFilters(newFilters);
  };

  const getCategorySelect = (filter: IFilter) => {
    const filterSelectItems = filter.filterValues?.map(v => {
      return { id: v.id, text: v.value, value: v.id };
    });
    if (filter.filterType === FilterType.SelectMany) {
      return (
        <div className={s.FilterField} key={filter.id}>
          <label htmlFor={String(filter.id)} className={s.FilterLabel}>
            {filter.name}
          </label>
          <MultiSelect
            buttonProps={{ id: String(filter.id) }}
            items={filterSelectItems}
            onChange={(item: ISelectItem) => {
              changeFilters(filter.id, item);
            }}
          />
        </div>
      );
    }

    filterSelectItems.unshift({ id: -1, text: 'Nie wybrano', value: -1 });
    return (
      <div className={s.FilterField} key={filter.id}>
        <label htmlFor={String(filter.id)} className={s.FilterLabel}>
          {filter.name}
        </label>
        <Select
          buttonProps={{ id: String(filter.id) }}
          items={filterSelectItems}
          onChange={(items: ISelectItem) => {
            changeFilters(filter.id, items);
          }}
        />
      </div>
    );
  };

  const getFilters = () => {
    const categoriesSelectItems = categories?.map(v => {
      return { id: v.id, text: v.name, value: v.id };
    });
    return categories && category ? (
      <>
        <div className={s.FiltersWrapper}>
          {!props.offers && (
            <div className={s.FilterField}>
              <label htmlFor="categorySelect" className={s.FilterLabel}>
                Kategoria
              </label>
              <Select
                buttonProps={{ id: 'categorySelect' }}
                items={categoriesSelectItems}
                defaultSelected={category.id}
                onChange={(item: ISelectItem) => onCategoryChange(item)}
              />
            </div>
          )}
          {category?.filters.map(c => getCategorySelect(c))}
        </div>
        <div className={s.SearchWrapper}>
          <Input
            kind="outlined"
            size="sm"
            type="search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
            label="Wyszukaj po nazwie i opisie ogłoszenia"
          />
        </div>
        {/* <Button
          kind="ghost"
          onClick={() => setDynamicFilters([])}
          className={s.FiltersReset}
          iconOnly
          icon={<FontAwesomeIcon icon="arrows-rotate" />}
        /> */}
      </>
    ) : (
      <div className={s.FiltersWrapper}>
        {fill(Array(4), null).map((v, i) => (
          <div className={s.FilterField} key={i}>
            <label
              htmlFor="categorySelect"
              className={classNames(s.FilterLabel, s.Skeleton)}
            ></label>
            <Button skeleton />
          </div>
        ))}
      </div>
    );
  };

  const filteredOffers = (offers: IOffer[]) => {
    if(!offers) return null;
    const currFilters = Object.values(dynamicFilters);
    let filteredOffers = [...offers];
    if(searchValue) {
      filteredOffers = filteredOffers.filter((v) =>  
        v.title.toLowerCase().includes((searchValue.toLowerCase())) ||
        v.description.toLowerCase().includes((searchValue.toLowerCase())) ||
        v.shortDescription.toLowerCase().includes((searchValue.toLowerCase()))
      )
    }
    if (currFilters.length) {
      return filteredOffers.filter(offer => {
        const selectedFilters = offer.selectedFilters?.map(v => v.selectedFilterValues).flat();
        const selectedFiltersIDs = selectedFilters.map(v => v.id);
        return currFilters.every(ids => ids.some((v: number) => selectedFiltersIDs.includes(v)));
      });
    } else return filteredOffers;
  };

  return (
    <div className={s.Offers}>
      {/* cannot rneder filters for profile view cuase they don't have onme category */}
      {!props.offers && <div className={s.Filters}>{getFilters()}</div>}
      <OffersView offers={filteredOffers(offers)} />
    </div>
  );
};

const defaultProps: OffersProps = {
  offers: null,
};

Offers.defaultProps = defaultProps;
export default Offers;

import { FC, useEffect, useState } from 'react'
import s from "./Offers.module.scss";
import { IAdvertisement, Advertisements as AdvAPI } from '../../api/Advertisements';

import { useParams, useNavigate } from 'react-router-dom';
import { OfferCard } from '../../components/OfferCard/OfferCard';
import { Categories, FilterType, ICategory, ICategoryFilter, IFilter } from '../../api/Categories';
import { fill } from 'lodash';
import Select, { ISelectItem } from '../../components/commonComponents/Select/Select';
import Button from '../../components/commonComponents/Button/Button';
import classNames from 'classnames';
import MultiSelect from '../../components/commonComponents/MultiSelect/MultiSelect';


export const Offers: FC = () => {
    const [offers, setOffers] = useState<IAdvertisement[]>(null);
    const [category, setCategory] = useState<ICategoryFilter>(null);
    const [categories, setCategories] = useState<ICategory[]>(null);
    let { id } = useParams();
    const categoryId = Number(id);
    const navigate = useNavigate();
    useEffect(() => {
        if (id === undefined) navigate('notfound');
        new AdvAPI().getByCategory(categoryId).then((off) => {
            setOffers(off);
        });
        new Categories().get().then((cats) => {
            setCategories(cats);
        });
        new Categories().getById(id).then((currentCat) => {
            setCategory(currentCat)
        });
    }, [id]);

    const onCategoryChange = (item: ISelectItem) => {
        navigate(`/ogloszenia/${item.value}`);
    };

    const getCategorySelect = (filter: IFilter) => {
        const filterSelectItems = filter.filterValues?.map((v) => { return { id: v.id, text: v.value, value: v.id } });
        if(filter.filterType === FilterType.SelectMany) {
            return <div className={s.FilterField}>
            <label htmlFor={String(filter.id)} className={s.FilterLabel}>{filter.name}</label>
            <MultiSelect 
                buttonProps={{ id: String(filter.id) }}
                items={filterSelectItems} 
                // defaultSelected={category.id} 
                // onChange={(item: ISelectItem) => onCategoryChange(item)} 
                />
        </div>
        }
        
        filterSelectItems.unshift({id: -1, text: 'Nie wybrano', value: -1});
        return <div className={s.FilterField}>
            <label htmlFor={String(filter.id)} className={s.FilterLabel}>{filter.name}</label>
            <Select 
                buttonProps={{ id: String(filter.id) }}
                items={filterSelectItems} 
                // defaultSelected={category.id} 
                // onChange={(item: ISelectItem) => onCategoryChange(item)} 
             />
        </div>;
    }

    const getFilters = () => {
        const categoriesSelectItems = categories?.map((v) => { return { id: v.id, text: v.name, value: v.id } });
        console.log({category, offers});
        return (categories && category)
            ? <>
                <div className={s.FilterField}>
                    <label htmlFor='categorySelect' className={s.FilterLabel}>Kategoria</label>
                    <Select buttonProps={{ id: 'categorySelect' }} items={categoriesSelectItems} defaultSelected={category.id} onChange={(item: ISelectItem) => onCategoryChange(item)} />
                </div>
                {category?.filters.map((c) => getCategorySelect(c))}
            </>
            : fill(Array(4), null).map((v, i) => <div className={s.FilterField} key={i}>
                <label htmlFor='categorySelect' className={classNames(s.FilterLabel, s.Skeleton)}></label>
                <Button skeleton />
            </div>)
    };

    return <div className={s.Offers}>
        <div className={s.Filters}>
            {getFilters()}
        </div>
        {offers
            ? offers.map((off) => <OfferCard key={off.id} offer={off} />)
            : fill(Array(6), null).map((x, i) => <OfferCard key={i} skeleton />)
        }
    </div>
}

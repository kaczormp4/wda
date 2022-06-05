import { FC, useEffect, useState } from 'react'
import s from "./Offers.module.scss";
import { IAdvertisement, Advertisements as AdvAPI } from '../../api/Advertisements';

import { useParams, useNavigate } from 'react-router-dom';
import { OfferCard } from '../../components/OfferCard/OfferCard';
import { Categories, ICategory } from '../../api/Categories';
import { fill } from 'lodash';
import Select from '../../components/commonComponents/Select/Select';
import Button from '../../components/commonComponents/Button/Button';
import classNames from 'classnames';


export const Offers: FC = () => {
    const [offers, setOffers] = useState<IAdvertisement[]>(null);
    const [category, setCategory] = useState<ICategory>(null);
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
            const currentCat = cats.find((v) => v.id === categoryId);
            setCategory(currentCat);
            setCategories(cats);
        });
    }, [id]);

    const onCategoryChange = (item: ICategory) => {
        navigate(`/ogloszenia/${item.id}`);
    };


    const getFilters = () => {
        const categoriesSelectItems = categories?.map((v) => { return { id: v.id, text: v.name } });

        return (categories && category)
            ? <div className={s.FilterField}>
                <label htmlFor='categorySelect' className={s.FilterLabel}>Kategoria</label>
                <Select buttonProps={{ id: 'categorySelect' }} items={categoriesSelectItems} defaultSelected={category.id} onChange={(item: ICategory) => onCategoryChange(item)}/>
            </div>
            : fill(Array(4), null).map((v,i) => <div className={s.FilterField} key={i}>
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

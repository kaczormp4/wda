import { FC, useEffect, useState } from 'react';
import { Categories, ICategory } from '../../api/Categories';
import { CategoriesView } from './CategoriesView/CategoriesView';
import { HomeOffers } from './HomeOffers/HomeOffers';

import styles from "./Home.module.scss";
import { IOffer, Offers } from '../../api/Offers';
import Searchbar from '../../components/Searchbar/Searchbar';

export const Home: FC = () => {

    const [categories, setCategories] = useState<ICategory[]>(null);
    const [offers, setOffers] = useState<IOffer[]>(null);

    useEffect(() => {
        new Categories().get().then((cats) => {
            setCategories(cats);
        });
        new Offers().getByCategory('4').then((offers) => {
            setOffers(offers);
        });
    }, []);

    return <>
        <div className={styles.Home}>
            <Searchbar categories={categories}/>
            <CategoriesView categories={categories} />
            <HomeOffers offers={offers}/>
        </div>
    </>
}
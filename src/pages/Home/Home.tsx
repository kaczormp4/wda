import { FC, useEffect, useState } from 'react';

import Searchbar from '../../components/Searchbar/Searchbar';
import { SectionLarge, SectionMedium } from '../../components/Section/Section';

import { CategoriesView } from './CategoriesView/CategoriesView';
import { HomeOffers } from './HomeOffers/HomeOffers';

import { Categories, ICategory } from '../../api/Categories';
import { IOffer, Offers } from '../../api/Offers';

import styles from "./Home.module.scss";

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
        <SectionLarge>
            <div className={styles.WelcomePage}>
                <div className={styles.WelcomePageContentContainer}>
                    <div className={styles.WPTitle}>
                        <h1>NUPTIAE - TUTAJ ZNAJDZIESZ CZEGO SZUKASZ</h1>
                    </div>
                    <div className={styles.WPButtons}>
                        <div> <h2>WYSZUKIWARKA</h2></div>

                        <div> <h2>POPULARNE OFERTY</h2></div>
                    </div>
                </div>
            </div>
        </SectionLarge>
        <SectionMedium>
            <div className={styles.Home}>
                <Searchbar categories={categories} />
                <CategoriesView categories={categories} />
            </div>
        </SectionMedium>
        <SectionLarge>
            <div className={styles.PopularOffers}>
                <SectionMedium>
                    <HomeOffers offers={offers} />
                </SectionMedium>
            </div>
        </SectionLarge>
    </>
}
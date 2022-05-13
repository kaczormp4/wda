import { FC, useEffect, useState } from 'react';
import { Categories, ICategory } from '../../api/Categories';
import { CategoriesView } from './CategoriesView/CategoriesView';

import styles from "./Home.module.scss";

export const Home: FC = () => {

    const [categories, setCategories] = useState<ICategory[]>(null);

    useEffect(() => {
        new Categories().get().then((cats) => {
            setCategories(cats);
        });
    }, []);

    return <>
        <div className={styles.Home}>
            <div className={styles.Search}>Placeholder dla wyszukiwarki</div>
            <CategoriesView categories={categories} />
        </div>
    </>
}
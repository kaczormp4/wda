import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { FC, FormEvent, useEffect, useRef, useState, } from 'react';
import { toast } from 'react-toastify';
import { Advertisements, IAdvertisement } from '../../api/Advertisements';
import { Categories, ICategory } from '../../api/Categories';
import Button from '../../components/commonComponents/Button/Button';
import Input from '../../components/commonComponents/Input/Input';
import TextField from '../../components/commonComponents/TextField/TextField';
import CategoriesModal from './CategoriesModal';

import styles from "./NewAd.module.scss";
import PhotoAdder from './PhotoAdder';

const NewAd: FC = () => {
    const [categories, setCategories] = useState<ICategory[]>(null);
    const [photos, setPhotos] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<ICategory>(null);
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [newAd, setNewAd] = useState<IAdvertisement>({
        title: '',
        shortDescription: '',
        description: '',
        categoryId: null
    });

    useEffect(() => {
        new Categories().get().then((cats) => {
            setCategories(cats);
        });
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');

        new Advertisements().post(newAd)
            .then(x => {
                console.info(x);
                formRef.current.reset();
                toast.success("Dodano ogłoszenie!");
            })
            .catch(err => console.error(err));
    }

    const modifyNewAd = (val: IAdvertisement) => {
        setNewAd(val);
    }

    const applyCategory = (category: ICategory) => {
        setNewAd((ad) => {
            const newAd = { ...ad };
            ad.categoryId = category.id;

            return newAd;
        });
        setCategoryModalOpen(false);
        setSelectedCategory(category);
    }

    return <>
        <main className={styles.NewAd}>
            <h1 className={styles.Header}>Dodaj ogłoszenie</h1>
            <form ref={formRef}>
                <section className={styles.FormSection}>
                    <Input className={styles.LongInput} kind="filled" type="text" label="Tytuł ogłoszenia" required errorText='Hej, twoje ogłoszenie musi posiadać tytuł'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { modifyNewAd({ ...newAd, title: e.target.value }) }} />
                    <p className={styles.BtnLabel}>Dodaj krótki opis ogłoszenia, będzie on widoczny z poziomu wyszukiwania ogłoszeń</p>
                    <TextField id="newAdShortDesc" className={styles.ShortDesc} kind="filled" label="Krótki opis ogłoszenia" required errorText='Hej, twoje ogłoszenie musi posiadać opis' maxLength={1000}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { modifyNewAd({ ...newAd, shortDescription: e.target.value }) }} />
                    <Button type="button" size="lg" icon={<FontAwesomeIcon icon="chevron-right" />} onClick={() => setCategoryModalOpen(true)}>{selectedCategory ? selectedCategory.name : 'Wybierz kategorię'}</Button>
                    {categoryModalOpen && <CategoriesModal categories={categories} onClose={() => setCategoryModalOpen(false)} onBtnClick={applyCategory} />}
                </section>
                <section className={styles.FormSection}>
                    <h2 className={styles.SectionHeader}>Dodaj zdjęcia</h2>
                    <p className={styles.SectionDesc}>Dodaj zdjęcia jak najlepiej oddające przedmiot ogłoszenia. Pierwsze zdjęcie będzie miniaturą ogłoszenia.</p>
                    <PhotoAdder count={5} onChange={(photos: string[]) => { setPhotos(photos) }} />
                </section>
                <section className={styles.FormSection}>
                    <h2 className={styles.SectionHeader}>Dodaj opis ogłoszenia</h2>
                    <p className={styles.BtnLabel}>Opisz szczegółowo przedmiot ogłoszenia</p>
                    <TextField id="newAdDesc" className={styles.ShortDesc} kind="filled" label="Opis ogłoszenia" required errorText='Hej, twoje ogłoszenie musi posiadać opis' maxLength={8000}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { modifyNewAd({ ...newAd, description: e.target.value }) }} />
                </section>
                <section className={classNames(styles.FormSection, styles.SubmitSection)}>
                    <Button type="submit" size="lg" kind="secondary" onClick={handleSubmit} value="Submit">Dodaj ogłoszenie</Button>
                </section>
            </form>
        </main>
    </>
}

export default NewAd;
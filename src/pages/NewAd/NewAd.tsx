import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { FC, FormEvent, useEffect, useRef, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Advertisements, IAdvertisement } from '../../api/Advertisements';
import { Categories, ICategory } from '../../api/Categories';
import { IPriceUnit, PriceUnits } from '../../api/PriceUnits';
import Button from '../../components/commonComponents/Button/Button';
import Input from '../../components/commonComponents/Input/Input';
import Select, { ISelectItem } from '../../components/commonComponents/Select/Select';
import TextField from '../../components/commonComponents/TextField/TextField';
import CategoriesModal from './CategoriesModal';

import styles from "./NewAd.module.scss";
import PhotoAdder from './PhotoAdder';

enum PRICE_TYPES {
    UNIT = "UNIT",
    RANGE = "RANGE"
}

enum PRICE_ERRORS {
    RANGE = "Cena minimalna musi być mniejsza od ceny maksymalnej",
    NEGATIVE = "Cena nie może być liczbą ujemną"
}

const priceTypes: ISelectItem[] = [{
    id: PRICE_TYPES.UNIT,
    text: 'Cena jednostkowa'
}, {
    id: PRICE_TYPES.RANGE,
    text: 'Zakres cen'
}]


const NewAd: FC = () => {
    const navigate = useNavigate();
    // REST
    const [categories, setCategories] = useState<ICategory[]>(null);
    const [priceUnits, setPriceUnits] = useState<ISelectItem[]>(null);
    // form
    const [photos, setPhotos] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<ICategory>(null);
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
    const [priceType, setPriceType] = useState<string>(PRICE_TYPES.UNIT);
    const formRef = useRef<HTMLFormElement>(null);
    const [newAd, setNewAd] = useState<IAdvertisement>({
        title: '',
        shortDescription: '',
        description: '',
        categoryId: null,
        priceUnitId: null,
        minPrice: null,
        maxPrice: null
    });

    useEffect(() => {
        new Categories().get().then((cats) => {
            setCategories(cats);
        });
        new PriceUnits().get().then((data) => {
            const firstItem = {
                id: '0',
                text: 'Za darmo'
            }
            const selectItems = data.map((v) => {
                return {
                    id: v.id.toString(),
                    text: v.unit
                }
            });
            setPriceUnits([firstItem, ...selectItems]);
        })
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');

        new Advertisements().post(newAd)
            .then(adId => {
                console.info(adId);
                navigate(`/ogloszenie/${adId}`);
                toast.success("Dodano ogłoszenie!");
            })
            .catch(err => console.error(err));
    }

    const modifyNewAd = (val: IAdvertisement) => {
        setNewAd(val);
    }

    const isPriceWrongErr = () => {
        if (newAd.minPrice !== null && newAd.maxPrice !== null) {
            if (newAd.minPrice > newAd.maxPrice) {
                return PRICE_ERRORS.RANGE;
            } else if ((newAd.minPrice < 0 || newAd.maxPrice < 0)) {
                return PRICE_ERRORS.NEGATIVE;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    const applyCategory = (category: ICategory) => {
        setNewAd((ad) => {
            const newAd = { ...ad, categoryId: category.id };
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
                {newAd.categoryId !== null &&
                    <section className={styles.FormSection}>
                        <h2 className={styles.SectionHeader}>Określ cenę</h2>
                        <p className={styles.BtnLabel}>Dzięki określonej cenie pozwolisz dotrzeć klientom do swojej oferty </p>
                        <div className={styles.PriceSection}>
                            <Select items={priceUnits} onChange={(e: ISelectItem) => { modifyNewAd({ ...newAd, priceUnitId: Number(e.id) }) }} />
                            {newAd.priceUnitId ? <Select items={priceTypes} defaultSelected={priceType} onChange={(e: ISelectItem) => { setPriceType(e.id) }} /> : <></>}
                        </div>
                        {isPriceWrongErr() && <p className={classNames(styles.BtnLabel, styles.Error)}>{isPriceWrongErr()}</p>}
                        {(newAd.priceUnitId && priceType === PRICE_TYPES.UNIT
                            && <Input kind="filled" type="number" label="Cena" required errorText='Podaj cenę' defaultValue={newAd.minPrice || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { modifyNewAd({ ...newAd, minPrice: Number(e.target.value), maxPrice: Number(e.target.value) }) }} />)}
                        {(newAd.priceUnitId && priceType === PRICE_TYPES.RANGE
                            && <>
                                <div className={styles.PriceInputs}>
                                    <Input kind="filled" type="number" label="Cena minimalna" required errorText={!isPriceWrongErr() && 'Podaj minimalną cenę'} defaultValue={newAd.minPrice || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { modifyNewAd({ ...newAd, minPrice: Number(e.target.value) }) }} error={Boolean(isPriceWrongErr())} />
                                    <Input kind="filled" type="number" label="Cena maksymalna" required errorText={!isPriceWrongErr() && 'Podaj minimalną cenę'} defaultValue={newAd.maxPrice || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { modifyNewAd({ ...newAd, maxPrice: Number(e.target.value) }) }} error={Boolean(isPriceWrongErr())} />
                                </div>
                            </>
                        )}
                    </section>
                }
                <section className={classNames(styles.FormSection, styles.SubmitSection)}>
                    <Button type="submit" size="lg" kind="secondary" onClick={handleSubmit} value="Submit" disabled={true}>Dodaj ogłoszenie</Button>
                </section>
            </form>
        </main>
    </>
}

export default NewAd;
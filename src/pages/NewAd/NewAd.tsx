import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Categories, ICategory } from '../../api/Categories';
import Button from '../../components/commonComponents/Button/Button';
import Input from '../../components/commonComponents/Input/Input';
import CategoriesModal from './CategoriesModal';

import styles from "./NewAd.module.scss";
import PhotoAdder from './PhotoAdder';

type S = {
    categories: ICategory[],
    selectedCategory: ICategory,
    categoryModalOpen: boolean
}

class NewAd extends Component<null, S> {

    constructor(props: null) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: null,
            categoryModalOpen: false
        }

        this.applyCategory = this.applyCategory.bind(this);
    }

    componentDidMount(): void {
        this.getCategories();
    }

    getCategories() {
        new Categories().get().then((cats) => {
            this.setState({
                categories: cats
            })
        })

    }

    applyCategory(category: ICategory) {
        this.setState({
            categoryModalOpen: false,
            selectedCategory: category
        })
    }

    render() {
        const { categoryModalOpen, selectedCategory, categories } = this.state;

        return <>
            <main className={styles.NewAd}>
                <h1 className={styles.Header}>Dodaj ogłoszenie</h1>
                <section className={styles.FormSection}>
                    <Input className={styles.LongInput} kind="filled" type="text" label="Tytuł ogłoszenia" required errorText='Hej, twoje ogłoszenie musi posiadać tytuł' />
                    <p className={styles.BtnLabel}>Wybierz kategorię</p>
                    <Button size="lg" icon={<FontAwesomeIcon icon="chevron-right" />} onClick={() => this.setState({ categoryModalOpen: true })}>{selectedCategory ? selectedCategory.name : 'Wybierz kategorię'}</Button>
                    {categoryModalOpen && <CategoriesModal categories={categories} onClose={() => this.setState({ categoryModalOpen: false })} onBtnClick={this.applyCategory} />}
                </section>
                <section className={styles.FormSection}>
                    <h2 className={styles.SectionHeader}>Dodaj zdjęcia</h2>
                    <p className={styles.SectionDesc}>Dodaj zdjęcia jak najlepiej oddające przedmiot ogłoszenia. Pierwsze zdjęcie będzie miniaturą ogłoszenia.</p>
                    <p className={styles.SectionDesc}>pleceholdery!</p>
                    <PhotoAdder count={5}/>
                </section>
            </main>
        </>
    }
}

export default NewAd;
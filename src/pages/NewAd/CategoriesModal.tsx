import { fill } from 'lodash';
import React, { Component } from 'react';
import { ICategory } from '../../api/Categories';
import Button from '../../components/commonComponents/Button/Button';
import Modal from '../../components/commonComponents/Modal/Modal';

import styles from "./NewAd.module.scss";

type P = {
    categories: ICategory[],
    onClose: Function
    onBtnClick: Function
}


class CategoriesModal extends Component<P> {

    render() {
        const { categories, onClose, onBtnClick } = this.props;

        return <Modal
            id="categoriesModal"
            heading="Wybierz kategorię"
            open={true}
            passive
            onClose={onClose}
        >
            <div className={styles.CategoriesModal}>
                {categories
                    ? categories.map((cat) =>
                        <Button key={cat.id} size="lg" kind="secondary" onClick={() => onBtnClick(cat)}>{cat.name}</Button>
                    )
                    : fill(Array(12), null).map((x, i) => <Button key={i} size="lg" skeleton></Button>)}
            </div>
        </Modal>
    }
}

export default CategoriesModal;
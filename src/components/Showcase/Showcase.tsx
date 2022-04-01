import React, { FC } from 'react';
import styles from "./Showcase.module.scss";
import ButtonShowcase from './ButtonShowcase/ButtonShowcase';
import FlyoutShowcase from './FlyoutShowcase/FlyoutShowcase';
import InputShowcase from './InputShowcase/InputShowcase';

type ShowcaseProps = {
}

// No need to define the defaultProps property
const Showcase: FC<ShowcaseProps> = () =>
    <section className={styles.Showcase}>
        <h1>Showcase</h1>
        <div className={styles.componentWrapper}>
            <ButtonShowcase />
        </div>
        <div className={styles.componentWrapper}>
            <FlyoutShowcase />
        </div>
        <div className={styles.componentWrapper}>
            <InputShowcase />
        </div>

    </section>


export default Showcase;


import React, { FC } from 'react';
import Select from '../../commonComponents/Select/Select';
import parentStyles from "./../Showcase.module.scss";
import styles from "./SelectShowcase.module.scss";

const selectItems = [{
    id: 'item1',
    text: 'Item 1',
},{
    id: 'item2',
    text: 'Item 2',
},{
    id: 'item3',
    text: 'Item 3',
},{
    id: 'item4',
    text: 'Item 4 long label here okay',
}];

const SelectShowcase: FC = () =>
    <div className={styles.Buttons}>
        <h2>Select</h2>
        <section className={parentStyles.section}>
            <dd>Default select</dd>
            <Select items={selectItems}>
                Default
            </Select>
        </section>
        <h2>Different kinds and sizes</h2>
        <section className={parentStyles.section}>
            <dd>SM ghost</dd>
            <Select items={selectItems} size='sm' kind="ghost"></Select>
            <dd>MD primary</dd>
            <Select items={selectItems} size='md' kind="primary"></Select>
            <dd>LG secondary</dd>
            <Select items={selectItems} size='lg' kind="secondary"></Select>
            <dd>MD teritiary</dd>
            <Select items={selectItems} size='md' kind="teritiary"></Select>
        </section>
    </div>

export default SelectShowcase;

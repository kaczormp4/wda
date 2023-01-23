import React, { FC } from 'react'

import styles from './Section.module.scss';

export const SectionLarge: FC = ({ children }) => {
    return (
        <section className={styles.Large}>{children}</section>
    )
}

export const SectionMedium: FC = ({ children }) => {
    return (
        <section className={styles.Medium}>{children}</section>
    )
}
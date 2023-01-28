import React, { FC } from 'react'

import styles from './Section.module.scss';
import classnames from 'classnames';

type SectionProps = {
    children: React.ReactNode,
    noCenter?: boolean
}

export const SectionLarge: FC<SectionProps> = ({ children, noCenter }) => {
    return (
        <section className={classnames(styles.Large, noCenter ? styles.noCenter : '')}>{children}</section>
    )
}

export const SectionMedium: FC = ({ children }) => {
    return (
        <section className={styles.Medium}>{children}</section>
    )
}

export const SectionLine: FC = () => {
    return (
        <div className={styles.LineContainer}>
            <div className={styles.Line}></div>
            <div className={styles.Logo}></div>
            <div className={styles.Line}></div>
        </div>
    )
}

import React, { FC } from 'react';
import Flyout from './../../commonComponents/Flyout/Flyout';
import parentStyles from "./../Showcase.module.scss";
import styles from "./FlyoutShowcase.module.scss";
import Button from '../../commonComponents/Button/Button';

const ButtonShowcase: FC = () =>
    <div className={styles.Flyouts}>
        <h2>Flyout</h2>
        <section className={parentStyles.section}>
            <dd>Default Flyout</dd>
            <Flyout>
                Default
            </Flyout>
        </section>
        <section className={parentStyles.section}>
            <dd>Positions</dd>
            <div className={styles.btnGrid}>
                <div className={styles.gridRow}>
                    <Flyout direction="right-start">Right-start</Flyout>
                    <Flyout direction="right-end">right-end<br />right-end</Flyout>
                    <Flyout direction="top-start" focusTrap>top-start<Button>sadas</Button></Flyout>
                </div>
                <div className={styles.gridRow}>
                    <Flyout direction="top-start">top-start</Flyout>
                    <Flyout direction="top-end">top-end</Flyout>
                </div>
                <div className={styles.gridRow}>
                    <Flyout direction="bottom-end">bottom-end</Flyout>
                    <Flyout direction="left-start">left-start</Flyout>
                    <Flyout direction="left-end">left-end</Flyout>
                </div>
            </div>
        </section>
        <section className={parentStyles.section}>
            <dd>Different props test</dd>
            <span className={parentStyles.sectionDescription}>Portal</span>
            <Flyout renderInPortal >rendered in portal, check devtools</Flyout>
            <span className={parentStyles.sectionDescription}>Custom button props</span>
            <Flyout renderInPortal buttonProps={{ kind: 'ghost', size: 'md', iconOnly: false, children: <>children</>, counter: '9+' }}>rendered in portal, check devtools</Flyout>
            <span className={parentStyles.sectionDescription}>Opened by prop</span>
            <Flyout renderInPortal open={true}>Open/close controlled by prop</Flyout>
            <span className={parentStyles.sectionDescription}>Not closing on click outside</span>
            <Flyout closeOnClickOutside={false}>sad</Flyout>
        </section>
        <section className={parentStyles.section}>
            <dd>Autopositioning</dd>
            <span className={parentStyles.sectionDescription}>Default positions of elements is written inside the flyouts. Notice that those positions can be overwritten because elements will render out of bounds.</span>
            <div className={styles.btnGrid}>
                <div className={styles.gridRow}>
                    <Flyout direction="left-start">left-start</Flyout>
                    <Flyout direction="left-end">left-end<br />left-end</Flyout>
                </div>
                <div className={styles.gridRow}>
                    <Flyout direction="top-start">top-start</Flyout>
                    <Flyout direction="bottom-end">bottom-end</Flyout>
                </div>
                <div className={styles.gridRow}>
                    <Flyout direction="right-start">right-start</Flyout>
                    <Flyout direction="right-end">right-end</Flyout>
                </div>
            </div>
        </section>
    </div>

export default ButtonShowcase;

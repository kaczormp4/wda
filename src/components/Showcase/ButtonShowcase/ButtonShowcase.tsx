
import React, { FunctionComponent } from 'react';
import Button from './../../Button/Button';
import parentStyles from "./../Showcase.module.scss";
import styles from "./ButtonShowcase.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ButtonShowcase: FunctionComponent = () =>
    <div className={styles.Buttons}>
        <h2>Button</h2>
        <section className={parentStyles.section}>
            <dd>Default button</dd>
            <Button>
                Default
            </Button>
        </section>

        <section className={parentStyles.section}>
            <dd>Different sizes and kinds</dd>
            <div className={styles.inlineFlex}>
                <Button size='sm' kind='primary'>
                    Small primary
                </Button>
                <Button disabled size='sm' kind='primary'>
                    Small primary disabled
                </Button>
            </div>
            <div className={styles.inlineFlex}>
                <Button size='md' kind='secondary'>
                    Medium secondary
                </Button>
                <Button disabled size='md' kind='secondary'>
                    Medium secondary disabled
                </Button>
            </div>
            <div className={styles.inlineFlex}>
                <Button size='md' kind='teritiary'>
                    Medium teritiary
                </Button>
                <Button disabled size='md' kind='teritiary'>
                    Medium teritiary disabled
                </Button>
            </div>
            <div className={styles.inlineFlex}>
                <Button size='lg' kind='ghost'>
                    Large ghost
                </Button>
                <Button disabled size='lg' kind='ghost'>
                    Large ghost disabled
                </Button>
            </div>
        </section>

        <section className={parentStyles.section}>
            <dd>Danger buttons</dd>
            <span className={parentStyles.sectionDescription}>Danger is compatible with ghost type buttons</span>
            <div className={styles.inlineFlex}>
                <Button size='sm' kind='primary' danger>
                    Small primary
                </Button>
                <Button disabled size='sm' kind='secondary' danger>
                    Small primary disabled
                </Button>
            </div>
            <div className={styles.inlineFlex}>
                <Button size='lg' kind='ghost' danger>
                    Large ghost
                </Button>
                <Button disabled size='lg' kind='ghost' danger>
                    Large ghost disabled
                </Button>
            </div>
        </section>

        <section className={parentStyles.section}>
            <dd>Icon buttons</dd>
            <div className={styles.inlineFlex}>
                <Button size='sm' kind='primary' icon={<FontAwesomeIcon icon="coffee" />} iconDescription="Coffe time">
                    Small primary
                </Button>
                <Button size='md' kind='secondary' icon={<FontAwesomeIcon icon="coffee" />} iconDescription="Coffe time">
                    Medium primary
                </Button>
                <Button size='lg' kind='teritiary' icon={<FontAwesomeIcon icon="coffee" />} iconDescription="Coffe time">
                    Large primary
                </Button>
            </div>
            <div className={styles.inlineFlex}>
                <Button size='sm' kind='primary' iconOnly icon={<FontAwesomeIcon icon="coffee" />} iconDescription="Coffe time">
                    Small primary
                </Button>
                <Button size='md' kind='secondary' iconOnly icon={<FontAwesomeIcon icon="coffee" />} iconDescription="Coffe time">
                    Medium primary
                </Button>
                <Button size='lg' kind='teritiary' iconOnly icon={<FontAwesomeIcon icon="coffee" />} iconDescription="Coffe time">
                    Large primary
                </Button>
            </div>
            <div className={styles.inlineFlex}>
                <Button size='md' disabled kind='secondary' iconOnly icon={<FontAwesomeIcon icon="coffee" />} iconDescription="Coffe time">
                    Medium primary
                </Button>
                <Button size='lg' danger kind='primary' iconOnly icon={<FontAwesomeIcon icon="coffee" />} iconDescription="Coffe time">
                    Large primary
                </Button>
            </div>
        </section>

        <section className={parentStyles.section}>
            <dd>Skeletons</dd>
            <div className={styles.inlineFlex}>
                <Button skeleton size='sm' kind='primary' icon={<FontAwesomeIcon icon="coffee" />} iconDescription="Coffe time">
                    Small primary
                </Button>
                <Button skeleton size='md' kind='secondary' icon={<FontAwesomeIcon icon="coffee" />} iconDescription="Coffe time">
                    Medium primary
                </Button>
                <Button skeleton size='lg' kind='teritiary' icon={<FontAwesomeIcon icon="coffee" />} iconDescription="Coffe time">
                    Large primary
                </Button>
            </div>
            <div className={styles.inlineFlex}>
                <Button skeleton size='sm' kind='primary' iconOnly icon={<FontAwesomeIcon icon="coffee" />} iconDescription="Coffe time">
                    Small primary
                </Button>
                <Button skeleton size='md' kind='secondary' iconOnly icon={<FontAwesomeIcon icon="coffee" />} iconDescription="Coffe time">
                    Medium primary
                </Button>
                <Button skeleton size='lg' kind='teritiary' iconOnly icon={<FontAwesomeIcon icon="coffee" />} iconDescription="Coffe time">
                    Large primary
                </Button>
            </div>
        </section>
    </div>

export default ButtonShowcase;

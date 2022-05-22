import React, { FC, useState } from 'react';
import Checkbox from '../../commonComponents/Checkbox/Checkbox';
import parentStyles from "./../Showcase.module.scss";
import styles from "./CheckboxShowcase.module.scss";

const CheckboxShowcase: FC = () => {
    return <div className={styles.Checkbox}>
        <h2>Checkbox</h2>
        <section className={parentStyles.section}>
            <dd>Basic (no label)</dd>
            <div className={styles.inlineFlex}>
                <Checkbox label="Check all" >
                    <Checkbox label="child" />
                    <Checkbox label="child" />
                    <Checkbox label="child" />
                </Checkbox>
            </div>
            <div className={styles.inlineFlex}>
                <Checkbox />
                <Checkbox defaultChecked={true} />
                <Checkbox disabled={true} />
                <Checkbox disabled={true} defaultChecked={true} />
            </div>
            <dd>Basic primary (no label)</dd>
            <div className={styles.inlineFlex}>
                <Checkbox kind="primary" />
                <Checkbox kind="primary" defaultChecked={true} />
                <Checkbox kind="primary" disabled={true} />
                <Checkbox kind="primary" disabled={true} defaultChecked={true} />
            </div>
            <dd>Basic secondary (no label)</dd>
            <div className={styles.inlineFlex}>
                <Checkbox kind="secondary" />
                <Checkbox kind="secondary" defaultChecked={true} />
                <Checkbox kind="secondary" disabled={true} />
                <Checkbox kind="secondary" disabled={true} defaultChecked={true} />
            </div>
        </section >
        <section className={parentStyles.section}>
            <dd>Different sizes</dd>
            <div className={styles.inlineFlex}>
                <Checkbox size='sm' helperText='size="sm"' />
                <Checkbox size='md' helperText='size="md"' />
                <Checkbox size='lg' helperText='size="lg"' />
            </div>
        </section>
        <section className={parentStyles.section}>
            <dd>labelPosition</dd>
            <div className={styles.inlineFlex}>
                <Checkbox labelPosition="right" label="right (default)" />
                <Checkbox labelPosition="left" label='labelPosition="left"' />
                <Checkbox labelPosition="top" label='labelPosition="top"' />
                <Checkbox labelPosition="bottom" label='labelPosition="bottom"' />
            </div>
        </section>
        <section className={parentStyles.section}>
            <dd>Disabled</dd>
            <div className={styles.inlineFlex}>
                <Checkbox disabled={true} label='Disabled' />
                <Checkbox disabled={true} defaultChecked={true} label='Disabled checked' />
                <Checkbox disabled={true} />
                <Checkbox disabled={true} defaultChecked={true} />
                <Checkbox disabled={true} helperText='disable' />
                <Checkbox disabled={true} defaultChecked={true} helperText='disable' />
            </div>
        </section>
        <section className={parentStyles.section}>
            <dd>error</dd>
            <div className={styles.inlineFlex}>
                <Checkbox error={true} label='error={true}' />
                <Checkbox defaultChecked={true} error={true} label='error={true}' />
                <Checkbox disabled={true} error={true} label='error={true}' />
                <Checkbox disabled={true} defaultChecked={true} error={true} label='error={true}' />
            </div>
            <dd>error with errorText</dd>
            <div className={styles.inlineFlex}>
                <Checkbox error={true} errorText='Error msg' />
                <Checkbox defaultChecked={true} error={true} errorText='Error msg' />
                <Checkbox disabled={true} error={true} errorText='Error msg' label='Label' />
                <Checkbox disabled={true} defaultChecked={true} error={true} errorText='Error msg' label='Label' />
            </div>
        </section>
        <section className={parentStyles.section}>
            <dd>required </dd>
            <div className={styles.inlineFlex}>

                <Checkbox label='required' required />
                <Checkbox label='required' required defaultChecked={true} />
            </div>
        </section>
        <section className={parentStyles.section}>
            <dd>helperText </dd>
            <div className={styles.inlineFlex}>
                <Checkbox label='label with helperText' helperText='label with helperText' />
                <Checkbox defaultChecked={true} label='label with helperText' helperText='label with helperText' />
                <Checkbox disabled={true} label='label with helperText' helperText='label with helperText' />
                <Checkbox disabled={true} defaultChecked={true} label='label with helperText' helperText='label with helperText' />
            </div>
        </section>

    </div >
}
export default CheckboxShowcase;

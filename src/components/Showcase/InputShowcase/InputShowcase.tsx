
import React, { FC } from 'react';
import Input from './../../commonComponents/Input/Input';
import parentStyles from "./../Showcase.module.scss";
import styles from "./InputShowcase.module.scss";

const InputShowcase: FC = () =>
    <div className={styles.Inputs}>
        <h2>Input</h2>
        <section className={parentStyles.section}>
            <dd>Kinds</dd>
            <div className={styles.inlineFlex}>
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                    label="primary"
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="outlined"
                    label="outlined"
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="filled"
                    label="filled"
                />
            </div>
        </section>
        <section className={parentStyles.section}>
            <dd>Different sizes and kinds</dd>
            <div className={styles.inlineFlex}>
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                    label="primary sm"
                    size='sm'
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="outlined"
                    label="outlined sm"
                    size='sm'
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="filled"
                    label="filled sm"
                    size='sm'
                />
            </div>
            <div className={styles.inlineFlex}>
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                    label="primary md"
                    size='md'
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="outlined"
                    label="outlined md"
                    size='md'
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="filled"
                    label="filled md"
                    size='md'
                />
            </div>
        </section>

        <section className={parentStyles.section}>
            <dd>Disabled</dd>
            <div className={styles.inlineFlex}>
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                    label="primary"
                    disabled
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="outlined"
                    label="outlined"
                    disabled
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="filled"
                    label="filled"
                    disabled
                />
            </div>
        </section>

        <section className={parentStyles.section}>
            <dd>Types (text , password, number)</dd>
            <div className={styles.inlineFlex}>
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                    label="primary text"
                    type='text'
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="outlined"
                    label="outlined text"
                    type='text'
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="filled"
                    label="filled text"
                    type='text'
                />
            </div>
            <div className={styles.inlineFlex}>
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                    label="primary password"
                    type='password'
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="outlined"
                    label="outlined password"
                    type='password'
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="filled"
                    label="filled password"
                    type='password'
                />
            </div>
            <div className={styles.inlineFlex}>
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                    label="primary number"
                    type='number'
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="outlined"
                    label="outlined number"
                    type='number'
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="filled"
                    label="filled number"
                    type='number'
                />
            </div>
        </section>
        <section className={parentStyles.section}>
            <dd>no Label</dd>
            <div className={styles.inlineFlex}>
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="outlined"
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="filled"
                />
            </div>
        </section>

        <section className={parentStyles.section}>
            <dd>Default value</dd>
            <div className={styles.inlineFlex}>
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                    label="primary"
                    defaultValue="primary default value"
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="outlined"
                    label="outlined"
                    defaultValue="outlined default value"
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="filled"
                    label="filled"
                    defaultValue="filled default value"
                />
            </div>
        </section>

        <section className={parentStyles.section}>
            <dd>error</dd>
            <div className={styles.inlineFlex}>
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                    label="primary error"
                    error
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="outlined"
                    label="outlined error"
                    error
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="filled"
                    label="filled error"
                    error
                />
            </div>
            <dd>error with errorText</dd>

            <div className={styles.inlineFlex}>
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                    label="primary error"
                    error
                    errorText="INVALID value"
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="outlined"
                    label="outlined error"
                    error
                    errorText="INVALID value"
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="filled"
                    label="filled error"
                    error
                    errorText="INVALID value"
                />
            </div>
        </section>
        <section className={parentStyles.section}>
            <dd>read only + defaultValue </dd>
            <div className={styles.inlineFlex}>
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                    label="primary readonly"
                    defaultValue="primary readonly default value"
                    readOnly
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="outlined"
                    label="outlined readonly"
                    defaultValue="outlined readonly default value"
                    readOnly
                />
                <Input
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="filled"
                    label="filled readonly"
                    defaultValue="filled readonly default value"
                    readOnly
                />
            </div>

        </section>
    </div>

export default InputShowcase;

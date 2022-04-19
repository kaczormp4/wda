
import React, { FC } from 'react';
import TextField from '../../commonComponents/TextField/TextField';
import parentStyles from "./../Showcase.module.scss";
import styles from "./TextFieldShowcase.module.scss";

const TextFieldShowcase: FC = () =>
    <div className={styles.TextFields}>
        <h2>Text field</h2>
        <section className={parentStyles.section}>
            <dd>Basically same as input</dd>
            <div className={styles.inlineFlex}>
                <TextField
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                    label="primary"
                />
                <TextField
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="outlined"
                    required
                    errorText='Required!'
                    label="outlined"
                />
                <TextField
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="filled"
                    required
                    errorText='Required!'
                    label="filled"
                />
            </div>
        </section>
        <section className={parentStyles.section}>
            <dd>Skeleton and disabled</dd>
            <div className={styles.inlineFlex}>
                <TextField
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                    label="primary"
                    skeleton
                    disabled
                />
                 <TextField
                    onChange={(e: any) => console.log(e.target.value)}
                    kind="primary"
                    label="primary"
                    disabled
                />
            </div>
        </section>
    </div>

export default TextFieldShowcase;

import React, { FC } from 'react';
import Button from '../../../components/commonComponents/Button/Button';
import styles from "./Skeleton.module.scss";

const Skeleton: FC = () => {
    return <>
        <main className={styles.Container}>
            <div className={styles.SkeletonInfoContainer}>
                <section className={styles.Slider}>
                </section>
                <section className={styles.Description}>
                    <div className={styles.DateAndFavourite}>
                        <span></span>
                        <Button
                            kind='ghost'
                            iconOnly
                            skeleton
                        />
                    </div>
                    <h1></h1>
                    <div className={styles.PriceAndInfo}>
                        <h1></h1>
                    </div>
                    <div className={styles.AdditionalInfo}>
                        <div className={styles.singleLine}>
                        </div>
                        <div className={styles.singleLine}>
                        </div>
                        <div className={styles.singleLine}>
                        </div>
                        <div className={styles.singleLine}>
                        </div>
                        <div className={styles.singleLine}>
                        </div>
                        <div className={styles.singleLine}>
                        </div>
                        <div className={styles.singleLine}>
                        </div>
                        <div className={styles.singleLine}>
                        </div>
                    </div>
                    <h1></h1>
                    <div className={styles.MainDescription}>
                    </div>
                    <div className={styles.DescriptionFooter}>
                        <div> </div>
                        <div> </div>
                    </div>
                </section>
            </div>
            <div className={styles.MainUseInfoContainer}>
                <section className={styles.UserInfo}>
                    <div className={styles.MainUserInfo} >

                    </div>
                    <div className={styles.ButtonsContainer}>
                        <Button skeleton >Zadzwoń</Button>
                        <Button skeleton>Wyślij Wiadomość</Button>
                    </div>
                </section>
            </div>
        </main >
    </>
}


export default Skeleton;

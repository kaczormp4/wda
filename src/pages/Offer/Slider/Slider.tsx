import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from "./Slider.module.scss";
import Button from '../../../components/commonComponents/Button/Button';

type SliderProps = {
    photos: string[],
    maxNumOfPhotos: number,
}

const Slider: FC<SliderProps> = ({ photos, maxNumOfPhotos }) => {
    const [isCurrentPhoto, setCurrentPhoto] = useState<number>(0)

    const changePhoto = (dir: string) => {
        if (dir === 'prev') {
            if (isCurrentPhoto === 0) {
                setCurrentPhoto(maxNumOfPhotos - 1)
            } else {
                setCurrentPhoto(isCurrentPhoto - 1)
            }
        } else if (dir === 'next') {
            if (isCurrentPhoto === maxNumOfPhotos - 1) {
                setCurrentPhoto(0)
            } else {
                setCurrentPhoto(isCurrentPhoto + 1)
            }
        }
    }

    return <>
        <div className={styles.Container}>
            <div className={styles.Photo}>
                <img src={photos[isCurrentPhoto]} />
            </div>
            <div className={styles.Buttons}>
                <div className={styles.Arrow} onClick={() => changePhoto('prev')}>
                    <Button kind="primary" size="lg" iconOnly icon={<FontAwesomeIcon icon="chevron-left" />} onClick={() => changePhoto('prev')} />
                </div>
                <div className={styles.Circles}>
                    {
                        photos.slice(0, maxNumOfPhotos).map((_, index) =>
                            <Button
                                key={index}
                                kind={index === isCurrentPhoto ? 'primary' : 'ghost'}
                                size="sm"
                                iconOnly
                                icon={<FontAwesomeIcon icon="dot-circle" />}
                                onClick={() => setCurrentPhoto(index)} />
                        )
                    }
                </div>
                <div className={styles.Arrow} onClick={() => changePhoto('next')}>
                    <Button kind="primary" size="lg" iconOnly icon={<FontAwesomeIcon icon="chevron-right" />} onClick={() => changePhoto('next')} />
                </div>
            </div>
        </div >
    </>
}


export default Slider;

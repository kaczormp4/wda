import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fill } from 'lodash';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/commonComponents/Button/Button';

import styles from "./NewAd.module.scss";

const MB5 = 5242880;

type P = {
    count: number
}

interface Photo {
    blob: string
}


const PhotoAdder: FC<P> = (props) => {
    const [photos, setPhotos] = useState<Photo[]>(fill(Array(props.count), null));

    const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const maxFiles = props.count - photos.filter((v) => v).length;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                if(i >= maxFiles) {
                    toast.error(`Maksymalna ilość zdjęć to ${props.count}, musisz jakieś usunąć aby dodać nowe.`);
                    break;
                }
                const file = files[i];
                if(file.size > MB5) {
                    toast.error(`Dodane zdjęcie zajmuje więcej niż 5 MB, zmniejsz jego rozmiar lub dodaj inne.`);
                    return;
                }
                if (file) {
                    const x = URL.createObjectURL(file);
                    setPhotos(oldPhotos => {
                        const newPhotos = [...oldPhotos];
                        const firstEmpty = newPhotos.findIndex((v) => !v);
                        newPhotos[firstEmpty] = {
                            blob: x
                        }
                        return [...newPhotos];
                    });
                }
            }
        }
    }

    const removePhoto = (i: number) => {
        setPhotos(oldPhotos => {
            const newPhotos = [...oldPhotos];
            newPhotos.splice(i, 1);
            newPhotos.push(null);
            return [...newPhotos];
        });
    }


    return <div className={styles.PhotoAdder}>
        {photos.map((photo, i) => <div key={i}>
            {!photo ?
                <>
                    <input className={styles.PhotoInput} type="file" id={`photo-${i}`} onChange={(e) => getFile(e)} accept="image/png, image/jpeg, image/webp" multiple />
                    <label htmlFor={`photo-${i}`} className={styles.Photo}>
                        <FontAwesomeIcon icon="image" />
                    </label>
                </>
                : <div className={styles.Photo} >
                    <div className={styles.PhotoOverlay}>
                        <Button iconOnly danger icon={<FontAwesomeIcon icon="trash" />} onClick={() => removePhoto(i)}>Usuń</Button>
                    </div>
                    <img src={photo.blob} className={styles.PhotoImg} alt={`Zdjęcie ogłoszenia ${i}`} />
                </div>
            }

        </div>)}
    </div>

}

export default PhotoAdder;
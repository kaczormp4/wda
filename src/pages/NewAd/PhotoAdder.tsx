import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fill } from 'lodash';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/commonComponents/Button/Button';
import { useDropzone, FileRejection, ErrorCode } from 'react-dropzone';

import styles from "./NewAd.module.scss";
import classNames from 'classnames';

const MB5 = 5242880;

type P = {
    count: number,
    onChange: Function
}

interface Photo {
    blob: string
}



const PhotoAdder: FC<P> = (props) => {
    const [photos, setPhotos] = useState<Photo[]>(fill(Array(props.count), null));

    const ERROR_MESSAGES = {
        FileInvalidType: `Dodano plik złego typu. Dodaj zdjęcie.`,
        FileTooLarge: `Dodane zdjęcie zajmuje więcej niż 5 MB, zmniejsz jego rozmiar lub dodaj inne.`,
        TooManyFiles: `Maksymalna ilość zdjęć to ${props.count}, musisz jakieś usunąć aby dodać nowe.`
    }

    const onDrop = (acceptedFiles: File[], rejected: FileRejection[], event: any) => {
        let files: File[] = [];
        acceptedFiles.forEach((v) => {
            const accFile = Array.from(event.dataTransfer.files as File[]).find((x: File) => x.name === v.name);
            files.push(accFile);
        })
        console.log(files);
        addFiles(files);
        const errors = rejected.map((v) => v.errors).map((v) => v.filter((v) => v.code)).map((v) => v[0].code);
        const uniqueErrors = [...new Set(errors)];
        uniqueErrors.forEach(errCode => {
            switch (errCode) {
                case ErrorCode.FileInvalidType: toast.error(ERROR_MESSAGES.FileInvalidType); break;
                case ErrorCode.FileTooLarge: toast.error(ERROR_MESSAGES.FileTooLarge); break;
                case ErrorCode.TooManyFiles: toast.error(ERROR_MESSAGES.TooManyFiles); break;
            }
        });
    };
    const { getRootProps, isDragActive } = useDropzone({ onDrop: onDrop.bind(this), accept: 'image/jpeg,image/png', maxSize: MB5, maxFiles: 5, noClick: true })

    const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        addFiles(files);
    }

    const addFiles = (files: FileList | File[]) => {
        const maxFiles = props.count - photos.filter((v) => v).length;
        console.log(files.length, maxFiles);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                if (i >= maxFiles) {
                    toast.error(ERROR_MESSAGES.TooManyFiles);
                    break;
                }
                const file = files[i];
                if (file.size > MB5) {
                    toast.error(ERROR_MESSAGES.FileTooLarge);
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
                        props.onChange([...newPhotos]);
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
            props.onChange([...newPhotos]);
            return [...newPhotos];
        });
    }

    const classes = classNames({
        [styles.PhotoAdder]: true,
        [styles.PhotoAdderDrop]: isDragActive,
    });

    return <div className={classes} {...getRootProps()}>
        {photos.length <= props.count && <input className={styles.PhotoInput} type="file" id={`photo-add`} onChange={(e) => getFile(e)} accept="image/png, image/jpeg, image/webp" multiple />}
        {photos.map((photo, i) => <div key={i}>
            {!photo ?
                <>
                    <label htmlFor={`photo-add`} className={styles.Photo}>
                        <FontAwesomeIcon icon="image" />
                    </label>
                </>
                : <div className={styles.Photo}>
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
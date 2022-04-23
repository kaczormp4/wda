import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from "./Offer.module.scss";
import Button from '../../components/commonComponents/Button/Button';
import { get } from '../../api/rest';
import { useNavigate, useParams } from 'react-router-dom';

type OfferProps = {
}

const Offer: FC<OfferProps> = () => {
    const [data, setData] = useState(null);
    const [isFavourite, setisFavourite] = useState(false);
    const [isShowPhoneNumber, setShowPhoneNumber] = useState(false);

    const navigate = useNavigate();
    let { offerId } = useParams();

    const navigateTo = (route: string) => {
        navigate(`/${route}`);
    }

    useEffect(() => {
        if (offerId === undefined) navigateTo('notfound');

        get('/Advertisements', `/${offerId}`)
            .then((data) => {
                setData(data)
            }).catch((error) => {
                navigateTo('notfound');
            });
    }, [])

    const addToFavourite = () => {
        setisFavourite(!isFavourite)
    }

    return <>
        <main className={styles.Container}>
            <div className={styles.OfferInfoContainer}>
                <section className={styles.Slider}>
                    <div className={styles.Photo}>
                        <img src={'https://ckis.tczew.pl/imagecache/max_1800/orkiestra-jubileusz.jpg'} />
                    </div>
                </section>
                <section className={styles.Description}>
                    <div className={styles.DateAndFavourite}>
                        <span> Dodano : 1 lipca 18:00</span>
                        <Button
                            kind='ghost'
                            onClick={() => addToFavourite()}
                            iconOnly
                            iconDescription={
                                isFavourite ?
                                    'Usuń z "Moja Lista"'
                                    :
                                    'Dodaj do "Moja Lista"'
                            }
                            icon={
                                isFavourite ?
                                    <FontAwesomeIcon icon="heart" />
                                    :
                                    <FontAwesomeIcon icon="heart" className={styles.unfilled} />
                            }
                        />
                    </div>
                    <h1>{data?.title}</h1>
                    <div className={styles.PriceAndInfo}>
                        <h1>500zł/h</h1>
                        {/* <span>dostępne terminy</span> */}
                    </div>
                    <div className={styles.AdditionalInfo}>
                        <div className={styles.singleLine}>
                            <FontAwesomeIcon icon="check-circle" /> <span> Dostę2 z szo</span>
                        </div>
                        <div className={styles.singleLine}>
                            <FontAwesomeIcon icon="check-circle" /> <span> Dostępny na sesjach</span>
                        </div>
                        <div className={styles.singleLine}>
                            <FontAwesomeIcon icon="check-circle" /> <span> Dostjach</span>
                        </div>
                        <div className={styles.singleLine}>
                            <FontAwesomeIcon icon="check-circle" /> <span> Dosna sesjach</span>
                        </div>
                        <div className={styles.singleLine}>
                            <FontAwesomeIcon icon="check-circle" /> <span> Dostępny na sesjach</span>
                        </div>
                        <div className={styles.singleLine}>
                            <FontAwesomeIcon icon="check-circle" /> <span> Dostępny na sesjach</span>
                        </div>
                        <div className={styles.singleLine}>
                            <FontAwesomeIcon icon="check-circle" /> <span> Dostępny na sesjach</span>
                        </div>
                        <div className={styles.singleLine}>
                            <FontAwesomeIcon icon="check-circle" /> <span> za darmo</span>
                        </div>
                    </div>
                    <h1>OPIS</h1>
                    <div className={styles.MainDescription}>
                        {data?.description}
                    </div>
                    <div className={styles.DescriptionFooter}>
                        <div>ID: {data?.id}</div>
                        <Button kind='ghost'><FontAwesomeIcon icon="flag" /> Zgłoś Oferte</Button>
                    </div>
                </section>
            </div>
            <div className={styles.MainUseInfoContainer}>
                <section className={styles.UserInfo}>
                    <div className={styles.MainUserInfo} onClick={() => navigateTo('user')}>
                        <div className={styles.UserAvatar}>
                            <img src={'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png'} />
                        </div>
                        <div className={styles.NameAndRate}>
                            <div><h2>Jan Kowalski</h2><FontAwesomeIcon icon="check-circle" /></div>
                            <div><h3>Odwiedz profil</h3></div>
                            <div>★★★★★ 45</div>
                        </div>
                    </div>
                    <div className={styles.ButtonsContainer}>
                        <Button kind="teritiary" onClick={() => setShowPhoneNumber(!isShowPhoneNumber)}>Zadzwoń</Button>
                        <Button>Wyślij Wiadomość</Button>
                    </div>
                    {
                        isShowPhoneNumber && <div className={styles.PhoneNumber}>
                            723 333 222  <FontAwesomeIcon icon="clone" />
                        </div>
                    }
                </section>
                {/* <section className={styles.Calendar}>
                    <h1>calendar</h1>
                </section>
                <section className={styles.MiniMapContainer}>
                    <div className={styles.LocationInfo}>
                        <p>Krakow</p>
                        <span>Małopolskie</span>
                    </div>
                    <div className={styles.MiniMap}>
                        <img src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2018/03/Simple-Location-Picker.png?fit=561%2C421&ssl=1" />
                    </div>
                </section> */}
            </div>
        </main >
    </>
}


export default Offer;

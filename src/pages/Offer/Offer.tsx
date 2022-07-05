import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Offer.module.scss';
import Button from '../../components/commonComponents/Button/Button';
import { get } from '../../api/rest';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from './Slider/Slider';
import { getAdvPrice } from '../../utils/offersUtils';
import Skeleton from './Skeleton/Skeleton';
import classNames from 'classnames';
import DOMPurify from 'dompurify';
import { Advertisements, IAdvertisement, IImage } from '../../api/Advertisements';
import { FavButton } from '../../components/FavButton/FavButton';

const arrayPhotos = [
  'https://ckis.tczew.pl/imagecache/max_1800/orkiestra-jubileusz.jpg',
  'https://bi.im-g.pl/im/b3/27/19/z26374323V,Koncert-Orkiestry-Symfonicznej-PSM-i-OSM--Przy-for.jpg',
  'https://pliki.portalsamorzadowy.pl/i/08/22/45/082245_r0_940.jpg',
  'https://images.squarespace-cdn.com/content/v1/52fc766be4b0649c39e066ec/1590861856393-66XX4G6HUI4JH94YNQA2/wesele-z-klasa-oczepiny.jpg?format=1000w',
  'https://i.4wzk.pl/gallery/617/46487_34.jpg',
  'https://cdn.galleries.smcloud.net/t/galleries/gf-vbT8-gRMj-ct8i_kameralny-obiad-weselny-1920x1080-nocrop.jpg',
  'https://wedding.pl/lovestory/wp-content/uploads/menu-weselne-propozycje-dania-godziny.png',
  'https://wesele123.pl/_upload/blog/2016/12/12/min_1.jpg',
];

type OfferProps = {};

const Offer: FC<OfferProps> = () => {
  const [data, setData] = useState<IAdvertisement | null | any>(null);
  const [isFavourite, setisFavourite] = useState<boolean>(false);
  const [isShowPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);

  const navigate = useNavigate();
  let { offerId } = useParams();

  const navigateTo = (route: string) => {
    navigate(`/${route}`);
  };

  useEffect(() => {
    if (offerId === undefined) navigateTo('notfound');

    new Advertisements()
      .get(offerId)
      .then(data => {
        setData(data);
      })
      .catch(error => {
        navigateTo('notfound');
      });
  }, []);

  const addToFavourite = () => {
    setisFavourite(!isFavourite);
  };

  if (data === null) {
    return <Skeleton />;
  }

  return (
    <>
      <main className={styles.Container}>
        <div className={styles.OfferInfoContainer}>
          <section className={styles.Slider}>
            {data.images && <Slider photos={data.images as IImage[]} maxNumOfPhotos={3} />}
          </section>
          <section className={styles.Description}>
            <div className={styles.DateAndFavourite}>
              <span> Dodano : 1 lipca 18:00</span>
              <FavButton offerId={String(offerId)} />
            </div>
            <h1>{data?.title}</h1>
            <div className={styles.PriceAndInfo}>
              <h1>{getAdvPrice(data as any)}</h1>
              {/* <span>dostępne terminy NEW FUTURE</span> */}
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
            <div
              className={classNames(styles.MainDescription, 'styledText')}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description) }}
            ></div>
            <div className={styles.DescriptionFooter}>
              <div>ID: {data?.id}</div>
              <Button kind="ghost">
                <FontAwesomeIcon icon="flag" /> Zgłoś Oferte
              </Button>
            </div>
          </section>
        </div>
        <div className={styles.MainUseInfoContainer}>
          <section className={styles.UserInfo}>
            <div className={styles.MainUserInfo} onClick={() => navigateTo(`profil/${22}`)}>
              <div className={styles.UserAvatar}>
                <img
                  src={
                    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png'
                  }
                />
              </div>
              <div className={styles.NameAndRate}>
                <div>
                  <h2>Jan Kowalski</h2>
                  <FontAwesomeIcon icon="check-circle" />
                </div>
                <div>
                  <h3>Odwiedz profil</h3>
                </div>
                <div>★★★★★ 45</div>
              </div>
            </div>
            <div className={styles.ButtonsContainer}>
              <Button kind="teritiary" onClick={() => setShowPhoneNumber(!isShowPhoneNumber)}>
                Zadzwoń
              </Button>
              <Button onClick={() => navigateTo(`wiadomosci/${data.author.userIdentifier}`)}>
                Wyślij Wiadomość
              </Button>
            </div>
            {isShowPhoneNumber && (
              <div className={styles.PhoneNumber}>
                723 333 222 <FontAwesomeIcon icon="clone" />
              </div>
            )}
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
      </main>
    </>
  );
};

export default Offer;

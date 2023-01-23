import { FC, useEffect, useState } from 'react';
import { fill } from 'lodash';

import { OfferCard } from '../../components/OfferCard/OfferCard';
import { SectionMedium } from '../../components/Section/Section';

import { Favorites } from '../../api/Favorites';
import { Offers, IImage, IOffer } from '../../api/Offers';

import styles from './FavList.module.scss';

type FavListProps = {};

const FavList: FC<FavListProps> = () => {
  const favOffers = new Favorites().getList();
  const [offers, setOffers] = useState<IOffer[]>();

  useEffect(() => {
    const api = new Offers();
    const offersPromises = favOffers?.map(
      v =>
        new Promise<IOffer>((resolve, reject) => {
          api.get(v).then(offer => {
            resolve(offer);
          });
        })
    );
    Promise.all(offersPromises).then(res => {
      res.forEach(v => (v.image = v.images[0] as IImage));
      setOffers(res);
    });
  }, []);

  return (
    <SectionMedium>
      <main className={styles.FavList}>
        <h1 className={styles.Header}>Obserwowane ogłoszenia</h1>
        {!favOffers || favOffers.length === 0 ? (
          <h2 className={styles.subHeader}>Brak obserwowanych ogłoszeń</h2>
        ) : (
          <div className={styles.Offers}>
            {offers
              ? offers.map(off => <OfferCard key={off.id} offer={off} />)
              : fill(Array(4), null).map((x, i) => <OfferCard key={i} skeleton />)}
          </div>
        )}
      </main>
    </SectionMedium>
  );
};

export default FavList;

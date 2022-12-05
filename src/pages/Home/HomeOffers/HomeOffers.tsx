import { FC } from 'react';
import s from './HomeOffers.module.scss';
import { IOffer } from '../../../api/Offers';
import { OffersView } from '../../Offers/OffersView';

type P = {
  offers: IOffer[];
};

export const HomeOffers: FC<P> = props => {
  const { offers } = props;

  const promoOffers = offers?.map((v, i) => {
    if (i < 3) {
      v.promo = true;
    }

    return v;
  });

  return (
    <div className={s.HomeOffers}>
      <h2>Najciekawsze ogłoszenia</h2>
      <div className={s.OffersWrapper}>
        <OffersView offers={promoOffers} />
      </div>
    </div>
  );
};

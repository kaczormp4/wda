import s from './Offers.module.scss';
import { IOffer } from '../../api/Offers';

import { OfferCard } from '../../components/OfferCard/OfferCard';
import { fill } from 'lodash';

type Props = {
  allowEdit?: boolean,
  offers: IOffer[];
};
export const OffersView = (props: Props) => {
  const { offers, allowEdit } = props;
  return (
    <>
      {offers
        ? offers.map(off => <OfferCard allowEdit={allowEdit} key={off.id} offer={off} />)
        : fill(Array(6), null).map((x, i) => <OfferCard key={i} skeleton />)}
    </>
  );
};

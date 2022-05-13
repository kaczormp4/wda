import classNames from 'classnames';
import { FC } from 'react'
import { Link } from 'react-router-dom';
import { IAdvertisement } from '../../api/Advertisements';
import { getAdvPrice } from '../../utils/offersUtils';
import s from "./OfferCard.module.scss";

type P = {
    offer?: IAdvertisement
    skeleton?: boolean
}

export const OfferCard: FC<P> = (props) => {
    const { offer, skeleton } = props;

    const skeletonCard = () => {
        return <div className={classNames(s.OfferCard, s.Skeleton)}></div>
    }

    if (skeleton) return skeletonCard();

    return <Link className={s.OfferCard} to={`/ogloszenie/${offer.id}`}>
        <img className={s.Image} alt={`Przedmiot ogłoszenia ${offer.title}`} src={`https://i.4wzk.pl/gallery/617/46487_34.jpg`} />
        <div className={s.InfoWrap}>
            <div>
                <h6 className={s.Title}>{offer.title}</h6>
                <p className={s.Desc}>{offer.shortDescription}</p>
            </div>
            <p className={s.Price}>{getAdvPrice(offer)}</p>
        </div>
    </Link>
}

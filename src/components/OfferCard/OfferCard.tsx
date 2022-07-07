import classNames from 'classnames';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { IOffer } from '../../api/Offers';
import { ISelectedFilter } from '../../api/Categories';
import { getAdvPrice } from '../../utils/offersUtils';
import { FavButton } from '../FavButton/FavButton';
import s from './OfferCard.module.scss';
import Button from '../commonComponents/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteOfferModal from './DeleteOfferModal/DeleteOfferModal';

type P = {
  offer?: IOffer;
  skeleton?: boolean;
  allowEdit?: boolean;
};

export const getTags = (filters: ISelectedFilter[]) => {
  if (filters) {
    const filtersMap: string[] = [];
    filters.forEach(filter => {
      filter.selectedFilterValues.forEach(filterVal => {
        filtersMap.push(`${filter.filterName}: ${filterVal.value}`);
      });
    });
    return filtersMap.map(v => (
      <span className={s.Tag}>
        <FontAwesomeIcon icon="check-circle" /> <span>{v}</span>
      </span>
    ));
  }
};

export const OfferCard: FC<P> = props => {
  const { offer, skeleton, allowEdit } = props;
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [hideOffer, setHideOffer] = useState<boolean>(false);
  const skeletonCard = () => {
    return <div className={classNames(s.OfferCard, s.Skeleton)}></div>;
  };

  if (skeleton) return skeletonCard();

  const onDelete = () => {
    setHideOffer(true);
  };
  if (hideOffer) {
    return null;
  }
  
  return (
    <>
      <Link className={s.OfferCard} to={`/ogloszenie/${offer.id}`}>
        <img
          className={s.Image}
          alt={`Przedmiot ogłoszenia ${offer.title}`}
          src={offer.image ? offer.image.imageUrl : ''}
        />
        <div className={s.InfoWrap}>
          <div>
            <div>
              <h6 className={s.Title}>{offer.title}</h6>
              <p className={s.Desc}>{offer.shortDescription}</p>
              <div className={s.Tags}>{getTags(offer.selectedFilters)}</div>
            </div>
            <p className={s.Price}>{getAdvPrice(offer)}</p>
          </div>
          <div className={s.footerWrapper}>
            <p>
              Dodane przez: {offer.author.givenName} {offer.author.surname}{' '}
            </p>
            {allowEdit ? (
              <div>
                <Button
                  danger
                  kind="ghost"
                  icon={<FontAwesomeIcon icon="trash" />}
                  onClick={setShowDeleteModal}
                >
                  Usuń ogłoszenie
                </Button>
              </div>
            ) : (
              <FavButton offerId={String(offer.id)} />
            )}
          </div>
        </div>
      </Link>
      {showDeleteModal && (
        <DeleteOfferModal offer={offer} setModalOpen={setShowDeleteModal} onDelete={onDelete} />
      )}
    </>
  );
};

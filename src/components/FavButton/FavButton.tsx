import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { Favorites } from '../../api/Favorites';
import Button from '../commonComponents/Button/Button';
import s from './FavButton.module.scss';

type P = {
  offerId: string;
  className?: string;
};

export const FavButton: FC<P> = props => {
  const { offerId, className } = props;
  const isFavorite = new Favorites().get(offerId);
  const [isFav, setIsFav] = useState<boolean>(isFavorite);

  return (
    <div className={className}>
      <Button
        className={s.FavButton}
        kind="ghost"
        onClick={() =>
          isFav
            ? new Favorites().remove(offerId).then(v => setIsFav(v))
            : new Favorites().post(offerId).then(v => setIsFav(v))
        }
        iconOnly
        iconDescription={isFav ? 'Usuń z "Moja Lista"' : 'Dodaj do "Moja Lista"'}
        icon={
          isFav ? (
            <FontAwesomeIcon icon="heart" />
          ) : (
            <FontAwesomeIcon icon="heart" className={s.unfilled} />
          )
        }
      />
    </div>
  );
};

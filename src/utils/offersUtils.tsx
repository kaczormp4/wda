import { ReactElement } from 'react';
import { IOffer } from '../api/Offers';

export function getAdvPrice(adv: IOffer): ReactElement | string {
  if (adv === null || adv === undefined) return;
  const currency = 'zł';
  let priceUnit = adv.priceUnit === null ? '' : adv.priceUnit;

  if (adv.minPrice === adv.maxPrice && adv.minPrice !== null) {
    return (
      <>
        {adv.minPrice} {currency} <span>{priceUnit}</span>
      </>
    );
  } else if (adv.minPrice < adv.maxPrice) {
    return (
      <>
        od {adv.minPrice} do {adv.maxPrice} {currency} <span>{priceUnit}</span>
      </>
    );
  } else if (adv.minPrice === 0 && adv.maxPrice === 0) {
    return `za darmo`;
  } else {
    return 'nie podano';
  }
}

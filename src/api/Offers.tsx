import { ISelectedFilter } from './Categories';
import { get, patch, post, remove } from './rest';
import { IUser } from './Users';

const url = '/Offers';

interface IImage {
  id?: number;
  imageUrl: string;
}

interface IOffer {
  id?: number | string;
  author: IUser;
  title: string;
  shortDescription: string;
  priceUnit: string;
  description: string;
  categoryId: number;
  minPrice: number;
  maxPrice: number;
  priceUnitId: number;
  selectedFilters: ISelectedFilter[];
  image?: IImage;
  images?: IImage[];
  // temp
  promo?: boolean;
}

interface IEditOffer {
  title: string;
  shortDescription: string;
  description: string;
}

interface IOfferReport {
  reason: string
}

type IgnoredFields = 'images' | 'selectedFilters' | 'author';

interface IPostOffer extends Omit<IOffer, IgnoredFields> {
  images: Blob[];
  selectedFilterValueIds: number[];
}

class Offers {
  public get(id: IOffer['id']): Promise<IOffer> {
    return get(url, `/${id}`);
  }

  public getUserOffers(id: IUser['userIdentifier']): Promise<IOffer[]> {
    return get(url, `/user/${id}`);
  }

  public getByCategory(id: IOffer['id']): Promise<IOffer[]> {
    return get(url, `?categoryId=${id}`);
  }

  public report(id: IOffer['id'], body: IOfferReport): Promise<string> {
    return post(`${url}/${id}/report`, body);
  }

  public post(ad: IPostOffer): Promise<number> {
    return post(url, ad, true);
  }

  public patch(id: IOffer['id'], ad: IEditOffer): Promise<string> {
    return patch(`${url}/${id}/update`, ad);
  }

  public delete(id: IOffer['id']): Promise<string> {
    return remove(`${url}/${id}/delete`);
  }

}

export { IImage, IOffer, IPostOffer, IEditOffer, Offers };

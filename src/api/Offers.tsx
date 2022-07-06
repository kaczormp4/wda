import { ISelectedFilter } from './Categories';
import { get, post } from './rest';
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

  public post(ad: IPostOffer): Promise<number> {
    return post(url, ad);
  }
}

export { IImage, IOffer, IPostOffer, Offers };

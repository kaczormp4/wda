import { ISelectedFilter } from './Categories';
import { get, post } from './rest';
import { IUser } from './Users';

const url = '/Offers';

interface IImage {
  id?: number;
  imageUrl: string;
}

interface IAdvertisement {
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

interface IPostAdvertisement extends Omit<IAdvertisement, IgnoredFields> {
  images: Blob[];
  selectedFilterValueIds: number[];
}

class Advertisements {
  public get(id: IAdvertisement['id']): Promise<IAdvertisement> {
    return get(url, `/${id}`);
  }

  public getByCategory(id: IAdvertisement['id']): Promise<IAdvertisement[]> {
    return get(url, `?categoryId=${id}`);
  }

  public post(ad: IPostAdvertisement): Promise<number> {
    return post(url, ad);
  }
}

export { IImage, IAdvertisement, IPostAdvertisement, Advertisements };

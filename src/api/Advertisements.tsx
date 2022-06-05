import { get, post } from "./rest";

const url = '/Offers';

interface IImage {
    id?: number, 
    imageUrl: string
} 

interface IAdvertisement {
    id?: number | string,
    title: string,
    shortDescription: string,
    priceUnit: string,
    description: string,
    categoryId: number,
    minPrice: number,
    maxPrice: number,
    priceUnitId: number,
    image?: IImage
    images?: Blob[] | IImage[]
}

class Advertisements {

    public get(id: IAdvertisement['id']): Promise<IAdvertisement> {
        return get(url, `/${id}`);
    }
    
    public getByCategory(id: IAdvertisement['id']): Promise<IAdvertisement[]> {
        return get(url, `?categoryId=${id}`);
    }

    public post(ad: IAdvertisement): Promise<number> {
        return post(url, ad);
    }
}

export {
    IImage,
    IAdvertisement,
    Advertisements,
}
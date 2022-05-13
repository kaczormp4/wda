import { get, post } from "./rest";

const url = '/Advertisements';

interface IAdvertisement {
    id?: number,
    title: string,
    shortDescription: string,
    priceUnit: string,
    description: string,
    categoryId: number,
    minPrice?: number,
    maxPrice?: number,
    priceUnitId: number
}

class Advertisements {

    public get(id: IAdvertisement['id']): Promise<IAdvertisement[]> {
        return get(url, `?categoryId=${id}`);
    }

    public post(ad: IAdvertisement): Promise<number> {
        return post(url, ad);
    }
}

export {
    IAdvertisement,
    Advertisements,
}
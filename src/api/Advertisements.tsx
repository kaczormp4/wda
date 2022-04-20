import { get, post } from "./rest";

const url = '/Advertisements';

interface IAdvertisement {
    id?: number,
    title: string,
    shortDescription: string,
    description: string,
    categoryId: number, 
}

class Advertisements {

    public get(): Promise<IAdvertisement[]> {
        return get(url);
    }

    public post(ad: IAdvertisement): Promise<number> {
        return post(url, ad);
    }
}

export {
    IAdvertisement,
    Advertisements,
}
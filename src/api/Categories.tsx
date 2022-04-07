import { argsToString, get, post, remove } from "./rest";

const url = '/categories';

interface ICategory {
    name: string
}

class Categories {
    public get(pageNumber?: number, pageSize?: number): Promise<ICategory[]> {
        const args = {
            pageNumber: pageNumber,
            pageSize: pageSize
        };
        return get(url, argsToString(args));
    }

    public getById(id: string): Promise<ICategory> {
        return get(url, `/${id}`);
    }

    public post(category: ICategory): Promise<number> {
        return post(url, category);
    }

    public remove(id: number): Promise<number> {
        return remove(url, `/${id}`);
    }
}

export default Categories;
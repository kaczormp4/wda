import { argsToString, get, post, remove } from "./rest";

const url = '/categories';

interface ICategory {
    id?: number,
    name: string
}

enum FilterType {
    SelectOne= "SelectOne",
    SelectMany= "SelectMany",
    Range= "Range",
    Unknown= "Unknown"
}

interface IFilter {
    id: number,
    name: string,
    filterType: FilterType,
    filterValues: {
        id: number,
        value: string
    }[]
}

interface ICategoryFilter extends ICategory {
    filters: IFilter[]
}

class Categories {
    public get(pageNumber?: number, pageSize?: number): Promise<ICategory[]> {
        const args = {
            pageNumber: pageNumber,
            pageSize: pageSize
        };
        return get(url, argsToString(args));
    }

    public getById(id: string | number): Promise<ICategoryFilter> {
        return get(url, `/${id}`);
    }

    public post(category: ICategory): Promise<number> {
        return post(url, category);
    }

    public remove(id: number): Promise<number> {
        return remove(url, `/${id}`);
    }
}

export {
    ICategory,
    Categories,
    ICategoryFilter,
    FilterType,
    IFilter
}
// dummy API component

export const favoriteKey = 'favOffers';

class Favorites {
  public getList(): string[] {
    return (JSON.parse(localStorage.getItem(favoriteKey)) as string[]);
  }
  public get(offerId?: string): boolean {
    const isFavourite = (JSON.parse(localStorage.getItem(favoriteKey)) as string[])?.includes(
      offerId
    );
    return isFavourite;
  }

  public async post(offerId: string): Promise<boolean> {
    const listOfFav = (JSON.parse(localStorage.getItem(favoriteKey)) || []) as string[];
    listOfFav.push(offerId);
    localStorage.setItem(favoriteKey, JSON.stringify(listOfFav));
    return true;
  }

  public async remove(offerId: string): Promise<boolean> {
    let listOfFav = (JSON.parse(localStorage.getItem(favoriteKey)) || []) as string[];
    listOfFav = listOfFav.filter(v => v !== offerId);
    localStorage.setItem(favoriteKey, JSON.stringify(listOfFav));
    return false;
  }
}

export { Favorites };

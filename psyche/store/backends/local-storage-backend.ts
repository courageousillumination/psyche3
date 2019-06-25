import Backend from "./backend";

class LocalStorageBackend<T> implements Backend<T> {
  private resourceName: string;
  constructor(resourceName: string) {
    this.resourceName = resourceName;
  }

  public async getAll(): Promise<T[]> {
    try {
      return JSON.parse(window.localStorage.getItem(this.resourceName) || "[]");
    } catch (e) {
      return [];
    }
  }

  public async create(item: T) {
    const allItems = await this.getAll();
    const maxId = allItems.length
      ? Math.max(...allItems.map((x: any) => x.id))
      : 0;
    const newItem = { ...item, id: maxId + 1 };
    this.saveToLocalStorage([...allItems, newItem]);
    return newItem;
  }

  public async delete(id: number) {
    const allItems = await this.getAll();
    this.saveToLocalStorage(allItems.filter((item: any) => item.id !== id));
  }

  private saveToLocalStorage(items: T[]) {
    try {
      window.localStorage.setItem(this.resourceName, JSON.stringify(items));
      // tslint:disable-next-line: no-empty
    } catch (e) {}
  }
}

export default LocalStorageBackend;

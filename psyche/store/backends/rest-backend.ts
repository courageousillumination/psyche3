import Backend from "psyche/store/backends/backend";
import { resource } from "psyche/utils/rest";

class RestBackend<T> implements Backend<T> {
  private resourceName: string;
  constructor(resourceName: string) {
    this.resourceName = resourceName;
  }

  public async getAll() {
    return resource<T>(this.resourceName).getAll();
  }
  public async create(item: T) {
    return resource<T>(this.resourceName).create(item);
  }
  public async delete(id: number) {
    return resource<T>(this.resourceName).delete(id);
  }
}

export default RestBackend;

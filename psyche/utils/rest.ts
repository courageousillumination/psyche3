/** Utilities for working with REST resources */

const COMMON_FETCH_OPTIONS = {
  headers: {
    "Content-Type": "application/json"
  }
};

const API_ROOT = "http://localhost:8000/";

class RestResource<T> {
  private resourceName: string;

  constructor(resourceName: string) {
    this.resourceName = resourceName;
  }

  public async create(item: any): Promise<T> {
    const response = await fetch(this.getResourceUrl(), {
      ...COMMON_FETCH_OPTIONS,
      body: JSON.stringify(item),
      method: "POST"
    });
    return await response.json();
  }

  public async getAll(): Promise<T[]> {
    const response = await fetch(this.getResourceUrl(), COMMON_FETCH_OPTIONS);
    return await response.json();
  }

  public async delete(id: number): Promise<void> {
    await fetch(this.getResourceUrl(id), {
      ...COMMON_FETCH_OPTIONS,
      method: "DELETE"
    });
  }

  private getResourceUrl(id?: number): string {
    const base = `${API_ROOT}${this.resourceName}/`;
    return id === undefined ? base : `${base}${id}/`;
  }
}

function resource<T>(name: string): RestResource<T> {
  return new RestResource<T>(name);
}

export { resource, RestResource };

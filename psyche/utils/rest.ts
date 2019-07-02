/** Utilities for working with REST resources */
import environment from "psyche/environment";

const COMMON_FETCH_OPTIONS = {
  headers: {
    "Content-Type": "application/json"
  }
};

/**
 * Maps any remote field names that may be different from local fields.
 * The first entry in the tuple is the remote, and the second is the local.
 */
const FIELD_MAP = [{ remote: "note_type", local: "noteType" }];

const applyFieldMap = (obj: any, outbound = false) => {
  const modifiedObj = { ...obj };
  for (const { remote, local } of FIELD_MAP) {
    const [source, dest] = outbound ? [local, remote] : [remote, local];
    if (modifiedObj[source] !== undefined) {
      modifiedObj[dest] = modifiedObj[source];
      delete modifiedObj[source];
    }
  }
  return modifiedObj;
};

const API_ROOT = environment.restBackendHost;

class RestResource<T> {
  private resourceName: string;

  constructor(resourceName: string) {
    this.resourceName = resourceName;
  }

  public async create(item: any): Promise<T> {
    const response = await fetch(this.getResourceUrl(), {
      ...COMMON_FETCH_OPTIONS,
      body: JSON.stringify(applyFieldMap(item, true)),
      method: "POST"
    });
    return applyFieldMap(await response.json());
  }

  public async getAll(): Promise<T[]> {
    const response = await fetch(this.getResourceUrl(), COMMON_FETCH_OPTIONS);
    return (await response.json()).map((item: T) => applyFieldMap(item));
  }

  public async update(item: Partial<T>): Promise<T> {
    const response = await fetch(this.getResourceUrl((item as any).id), {
      ...COMMON_FETCH_OPTIONS,
      body: JSON.stringify(applyFieldMap(item, true)),
      method: "PATCH"
    });
    return applyFieldMap(await response.json());
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

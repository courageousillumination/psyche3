export default interface Backend<T> {
  getAll(): Promise<T[]>;
  create(item: any): Promise<T>;
  delete(id: number): Promise<void>;
}

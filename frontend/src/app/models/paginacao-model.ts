export interface Paginacao<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

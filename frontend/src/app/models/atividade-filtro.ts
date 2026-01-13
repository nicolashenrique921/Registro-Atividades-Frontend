export interface AtividadeFiltro {
  page: number;
  limit: number;
  titulo?: string;
  sort?: 'data' | 'titulo';
}

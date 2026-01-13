import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atividade } from '../models/atividade-model';
import { Paginacao } from '../models/paginacao-model';

export interface AtividadeFiltro {
  page?: number;
  limit?: number;
  titulo?: string;
  sort?: 'data' | 'titulo';
}

@Injectable({ providedIn: 'root' })
export class AtividadesService {

  private http = inject(HttpClient);
  private readonly API = 'http://localhost:3000/atividades';

  listar(filtro: AtividadeFiltro = {}): Observable<Paginacao<Atividade>> {
    const params = {
      page: filtro.page ?? 1,
      limit: filtro.limit ?? 5,
      titulo: filtro.titulo ?? '',
      sort: filtro.sort ?? 'data'
    };

    return this.http.get<Paginacao<Atividade>>(this.API, { params });
  }

  buscarPorId(id: string): Observable<Atividade> {
    return this.http.get<Atividade>(`${this.API}/${id}`);
  }

  criar(payload: Omit<Atividade, 'id'>): Observable<Atividade> {
    return this.http.post<Atividade>(this.API, payload);
  }

  atualizar(id: string, payload: Omit<Atividade, 'id'>): Observable<Atividade> {
    return this.http.put<Atividade>(`${this.API}/${id}`, payload);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}

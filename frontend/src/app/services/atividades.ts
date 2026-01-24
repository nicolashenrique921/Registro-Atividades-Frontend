import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atividade } from '../models/atividade-model';

@Injectable({
  providedIn: 'root'
})
export class AtividadesService {

  private apiUrl = 'http://localhost:3000/atividades';

  constructor(private http: HttpClient) {}

  listarPaginado(
    pagina: number,
    limite: number,
    busca: string,
    ordenacao: string
  ): Observable<{ dados: Atividade[]; total: number }> {

    let params = new HttpParams()
      .set('page', pagina)
      .set('limit', limite)
      .set('search', busca)
      .set('sort', ordenacao);

    return this.http.get<{ dados: Atividade[]; total: number }>(
      this.apiUrl,
      { params }
    );
  }

  criar(atividade: Atividade) {
    return this.http.post<Atividade>(this.apiUrl, atividade);
  }

  remover(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

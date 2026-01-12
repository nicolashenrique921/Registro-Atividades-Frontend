import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Atividade {
  id?: string;
  titulo: string;
  descricao: string;
}

@Injectable({ providedIn: 'root' })
export class AtividadesService {

  private apiUrl = 'http://localhost:8080/atividades';

  constructor(private http: HttpClient) {}

  listar(): Observable<Atividade[]> {
    return this.http.get<Atividade[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Atividade> {
    return this.http.get<Atividade>(`${this.apiUrl}/${id}`);
  }

  criar(atividade: Atividade): Observable<void> {
    return this.http.post<void>(this.apiUrl, atividade);
  }

  atualizar(id: string, atividade: Atividade): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, atividade);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ MÉTODO QUE FALTAVA
  validarTitulo(titulo: string, id?: string): Observable<boolean> {
    let params = new HttpParams().set('titulo', titulo);

    if (id) {
      params = params.set('id', id);
    }

    return this.http.get<boolean>(
      `${this.apiUrl}/validar-titulo`,
      { params }
    );
  }
}

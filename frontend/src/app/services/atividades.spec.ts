import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atividade } from '../models/atividade-model';

@Injectable({ providedIn: 'root' })
export class AtividadesService {

  private apiUrl = 'http://localhost:3000/atividades';

  constructor(private http: HttpClient) {}

  listar(): Observable<Atividade[]> {
    return this.http.get<Atividade[]>(this.apiUrl);
  }

  criar(dados: Omit<Atividade, 'id'>): Observable<Atividade> {
    return this.http.post<Atividade>(this.apiUrl, dados);
  }

  remover(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

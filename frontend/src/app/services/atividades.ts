import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Atividade {
  _id?: string;
  titulo: string;
  descricao: string;
  data?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AtividadesService {

  private apiUrl = 'http://localhost:3000/atividades';

  constructor(private http: HttpClient) {}

  listar(): Observable<Atividade[]> {
    return this.http.get<Atividade[]>(this.apiUrl);
  }

  criar(atividade: Atividade): Observable<Atividade> {
    return this.http.post<Atividade>(this.apiUrl, atividade);
  }

  remover(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoaderService } from './loader';
import { ToastService } from './toast-service';

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

  constructor(
    private http: HttpClient,
    private loader: LoaderService,
    private toast: ToastService
  ) {}

  listar(): Observable<Atividade[]> {
    this.loader.show();

    return this.http.get<Atividade[]>(this.apiUrl).pipe(
      finalize(() => this.loader.hide()),
      catchError(err => {
        this.toast.error('Erro ao carregar atividades');
        return throwError(() => err);
      })
    );
  }

  criar(atividade: Atividade): Observable<Atividade> {
    this.loader.show();

    return this.http.post<Atividade>(this.apiUrl, atividade).pipe(
      tap(() => this.toast.success('Atividade criada com sucesso')),
      finalize(() => this.loader.hide()),
      catchError(err => {
        this.toast.error('Erro ao criar atividade');
        return throwError(() => err);
      })
    );
  }

  remover(id: string): Observable<void> {
    this.loader.show();

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.toast.success('Atividade removida')),
      finalize(() => this.loader.hide()),
      catchError(err => {
        this.toast.error('Erro ao remover atividade');
        return throwError(() => err);
      })
    );
  }
  atualizar(id: string, atividade: Atividade): Observable<Atividade> {
    return this.http.put<Atividade>(`${this.apiUrl}/${id}`, atividade);
  }
}

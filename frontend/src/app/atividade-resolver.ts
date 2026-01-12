import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { AtividadesService, Atividade } from './services/atividades';
import { Observable, map } from 'rxjs';

export const atividadeResolver: ResolveFn<Atividade | undefined> =
  (route: ActivatedRouteSnapshot): Observable<Atividade | undefined> => {

    const service = inject(AtividadesService);
    const id = route.paramMap.get('id');

    if (!id) {
      return new Observable<undefined>(observer => {
        observer.next(undefined);
        observer.complete();
      });
    }

    return service.listar().pipe(
      map(atividades =>
        atividades.find(atividade => atividade._id === id)
      )
    );
  };

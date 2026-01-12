import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AtividadesService } from '../app/services/atividades';

export const atividadeResolver: ResolveFn<any> = (route) => {
  const service = inject(AtividadesService);
  const id = route.paramMap.get('id')!;
  return service.buscarPorId(id);
};

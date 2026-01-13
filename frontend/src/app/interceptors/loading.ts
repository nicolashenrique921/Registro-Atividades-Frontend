import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpRequest
} from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader';

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const loader = inject(LoaderService);
  loader.show();

  return next(req).pipe(finalize(() => loader.hide()));
};

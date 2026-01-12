import { CanDeactivateFn } from '@angular/router';
import { AtividadeForm } from '../components/atividade-form/atividade-form';

export const pendingChangesGuard: CanDeactivateFn<AtividadeForm> = (component) => {
  return component.podeSair();
};

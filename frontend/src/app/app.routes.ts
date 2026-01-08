import { Routes } from '@angular/router';

import { AtividadeList } from './components/atividade-list/atividade-list';
import { AtividadeForm } from './components/atividade-form/atividade-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'atividades',
    pathMatch: 'full'
  },

  {
    path: 'atividades',
    component: AtividadeList
  },

  {
    path: 'atividades/nova',
    component: AtividadeForm
  },

  {
    path: 'atividades/editar/:id',
    component: AtividadeForm
  }
];

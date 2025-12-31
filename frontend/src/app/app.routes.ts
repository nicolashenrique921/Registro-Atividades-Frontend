import { Routes } from '@angular/router';
import { AtividadeList } from './components/atividade-list/atividade-list';
import { AtividadeForm } from './components/atividade-form/atividade-form';
import { App } from './app';

export const routes: Routes = [
  { path: '', redirectTo: 'atividades', pathMatch: 'full' },
  { path: 'AtividadeList', component: AtividadeList },
  { path: 'AtividadeForm', component: AtividadeForm }
];

import { Component, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AtividadesService } from '../../services/atividades';
import { ToastService } from '../../services/toast-service';
import { Atividade } from '../../models/atividade-model';

@Component({
  selector: 'app-atividade-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './atividade-list.html',
  styleUrl: './atividade-list.css'
})
export class AtividadeList {

  private service = inject(AtividadesService);
  private toast = inject(ToastService);

  atividades = signal<Atividade[]>([]);
  carregando = signal(true);

  busca = new FormControl('');
  ordenacao = new FormControl<'data' | 'titulo'>('data');

  constructor() {
    effect(() => {
      this.carregar();
    });
  }

  carregar(): void {
    this.carregando.set(true);

    this.service.listar({
      titulo: this.busca.value ?? '',
      sort: this.ordenacao.value ?? 'data'
    }).subscribe({
      next: res => {
        this.atividades.set(res.data);
        this.carregando.set(false);
      },
      error: () => {
        this.toast.error('Erro ao carregar atividades');
        this.carregando.set(false);
      }
    });
  }

  confirmarRemocao(id: string): void {
    const confirmado = confirm('Deseja realmente excluir esta atividade?');
    if (!confirmado) return;

    this.service.deletar(id).subscribe({
      next: () => {
        this.toast.success('Atividade removida com sucesso');
        this.carregar();
      },
      error: () => this.toast.error('Erro ao remover atividade')
    });
  }
}

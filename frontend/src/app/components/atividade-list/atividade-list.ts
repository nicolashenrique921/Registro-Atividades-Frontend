import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AtividadesService, Atividade } from '../../services/atividades';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-atividade-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './atividade-list.html',
  styleUrl: './atividade-list.css'
})
export class AtividadeList implements OnInit {

  atividades: Atividade[] = [];

  confirmarExclusao = false;
  atividadeSelecionada?: Atividade;

  constructor(
    private service: AtividadesService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    this.service.listar().subscribe({
      next: data => this.atividades = data,
      error: () => this.toast.error('Erro ao carregar atividades.')
    });
  }

  abrirConfirmacao(atividade: Atividade): void {
    this.atividadeSelecionada = atividade;
    this.confirmarExclusao = true;
  }

  cancelar(): void {
    this.confirmarExclusao = false;
    this.atividadeSelecionada = undefined;
  }

  confirmar(): void {
    if (!this.atividadeSelecionada?._id) return;

    this.service.remover(this.atividadeSelecionada._id).subscribe({
      next: () => {
        this.toast.success('Atividade removida com sucesso!');
        this.buscar();
        this.cancelar();
      },
      error: () => {
        this.toast.error('Erro ao remover atividade.');
        this.cancelar();
      }
    });
  }
}

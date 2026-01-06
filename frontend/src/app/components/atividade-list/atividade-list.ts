import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast-service';
import { AtividadesService, Atividade } from '../../services/atividades';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-atividade-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './atividade-list.html',
  styleUrl: './atividade-list.css'
})
export class AtividadeList implements OnInit {

  atividades: Atividade[] = [];

  constructor(
    private service: AtividadesService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.service.listar().subscribe({
      next: data => this.atividades = data,
      error: () => this.toast.error('Erro ao carregar atividades.')
    });
  }

  remover(id: string) {
    this.service.remover(id).subscribe({
      next: () => {
        this.toast.success('Atividade removida com sucesso!');
        this.buscar();
      },
      error: () => this.toast.error('Erro ao remover atividade.')
    });
  }
}

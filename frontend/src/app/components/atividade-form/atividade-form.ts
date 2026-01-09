import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AtividadesService, Atividade } from '../../services/atividades';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-atividade-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './atividade-form.html',
  styleUrl: './atividade-form.css'
})
export class AtividadeForm implements OnInit {

  atividade: Atividade = {
    titulo: '',
    descricao: ''
  };

  id?: string;
  editando = false;

  constructor(
    private service: AtividadesService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.id) {
      this.editando = true;
      this.carregarAtividade();
    }
  }

  carregarAtividade() {
    this.service.listar().subscribe({
      next: atividades => {
        const encontrada = atividades.find(a => a._id === this.id);

        if (!encontrada) {
          this.toast.error('Atividade não encontrada.');
          this.router.navigate(['/atividades']);
          return;
        }

        this.atividade = {
          titulo: encontrada.titulo,
          descricao: encontrada.descricao
        };
      },
      error: () => {
        this.toast.error('Erro ao carregar atividade.');
        this.router.navigate(['/atividades']);
      }
    });
  }

  salvar() {
    if (!this.atividade.titulo.trim()) {
      this.toast.error('O título é obrigatório.');
      return;
    }

    const requisicao = this.editando && this.id
      ? this.service.atualizar(this.id, this.atividade)
      : this.service.criar(this.atividade);

    requisicao.subscribe({
      next: () => {
        this.toast.success(
          this.editando
            ? 'Atividade atualizada com sucesso!'
            : 'Atividade registrada com sucesso!'
        );
        this.router.navigate(['/atividades']);
      },
      error: () => {
        this.toast.error('Erro ao salvar atividade.');
      }
    });
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ToastService } from '../../services/toast-service';
import { AtividadesService, Atividade } from '../../services/atividades';

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
  salvando = false;

  get editando(): boolean {
    return !!this.id;
  }

  constructor(
    private service: AtividadesService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.id) {
      this.service.listar().subscribe({
        next: atividades => {
          const encontrada = atividades.find(a => a._id === this.id);
          if (encontrada) {
            this.atividade = { ...encontrada };
          }
        },
        error: () => this.toast.error('Erro ao carregar atividade.')
      });
    }
  }

  salvar() {
    if (!this.atividade.titulo.trim()) {
      this.toast.error('O título é obrigatório.');
      return;
    }

    this.salvando = true;

    const operacao = this.editando
      ? this.service.atualizar(this.id!, this.atividade)
      : this.service.criar(this.atividade);

    operacao.subscribe({
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
      },
      complete: () => {
        this.salvando = false;
      }
    });
  }
}

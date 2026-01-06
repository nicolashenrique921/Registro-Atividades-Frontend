import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
          if (encontrada) this.atividade = encontrada;
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

    const operacao = this.id
      ? this.service.atualizar(this.id, this.atividade)
      : this.service.criar(this.atividade);

    operacao.subscribe({
      next: () => {
        this.toast.success(
          this.id
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

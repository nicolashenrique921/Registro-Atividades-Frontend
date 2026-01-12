import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  salvando = false;

  // UX
  tituloTouched = false;
  descricaoTouched = false;

  // Validação assíncrona
  tituloDuplicado = false;
  validandoTitulo = false;

  constructor(
    private service: AtividadesService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;

    const atividadeResolvida = this.route.snapshot.data['atividade'];
    if (atividadeResolvida) {
      this.atividade = atividadeResolvida;
    }
  }

  get tituloInvalido() {
    return this.tituloTouched && !this.atividade.titulo.trim();
  }

  get descricaoInvalida() {
    return this.descricaoTouched && this.atividade.descricao.length > 500;
  }

  validarTitulo() {
    if (!this.atividade.titulo.trim()) return;

    this.validandoTitulo = true;
    this.tituloDuplicado = false;

    this.service.validarTitulo(this.atividade.titulo, this.id).subscribe({
      next: duplicado => {
        this.tituloDuplicado = duplicado;
        this.validandoTitulo = false;
      },
      error: () => {
        this.validandoTitulo = false;
      }
    });
  }

  salvar() {
    this.tituloTouched = true;
    this.descricaoTouched = true;

    if (
      this.tituloInvalido ||
      this.descricaoInvalida ||
      this.tituloDuplicado
    ) {
      this.toast.error('Corrija os erros antes de salvar.');
      return;
    }

    this.salvando = true;

    const request$ = this.id
      ? this.service.atualizar(this.id, this.atividade)
      : this.service.criar(this.atividade);

    request$.subscribe({
      next: () => {
        this.toast.success(
          this.id ? 'Atividade atualizada!' : 'Atividade criada!'
        );
        this.router.navigate(['/atividades']);
      },
      error: () => {
        this.toast.error('Erro ao salvar.');
        this.salvando = false;
      }
    });
  }

  // 🔒 Usado pelo CanDeactivate
  podeSair(): boolean {
    return (
      !this.atividade.titulo ||
      confirm('Você tem alterações não salvas. Deseja sair?')
    );
  }
}

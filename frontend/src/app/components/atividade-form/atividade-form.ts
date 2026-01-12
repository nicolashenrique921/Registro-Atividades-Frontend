import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

import { AtividadesService, Atividade } from '../../services/atividades';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-atividade-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './atividade-form.html',
  styleUrl: './atividade-form.css'
})
export class AtividadeForm implements OnInit {

  form!: FormGroup;
  id?: string;
  submetido = false;

  constructor(
    private fb: FormBuilder,
    private service: AtividadesService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.id) {
      this.service.listar().subscribe({
        next: atividades => {
          const atividade = atividades.find(a => a._id === this.id);
          if (atividade) {
            this.form.patchValue({
              titulo: atividade.titulo,
              descricao: atividade.descricao
            });
          }
        },
        error: () => this.toast.error('Erro ao carregar atividade.')
      });
    }
  }

  // 🔹 Getters tipados (RESOLVEM erro 4111)
  get titulo() {
    return this.form.get('titulo');
  }

  get descricao() {
    return this.form.get('descricao');
  }

  salvar(): void {
    this.submetido = true;

    if (this.form.invalid) {
      this.toast.error('Corrija os erros do formulário.');
      return;
    }

    const atividade: Atividade = this.form.value;

    const request = this.id
      ? this.service.atualizar(this.id, atividade)
      : this.service.criar(atividade);

    request.subscribe({
      next: () => {
        this.toast.success(
          this.id
            ? 'Atividade atualizada com sucesso!'
            : 'Atividade criada com sucesso!'
        );
        this.router.navigate(['/atividades']);
      },
      error: () => this.toast.error('Erro ao salvar atividade.')
    });
  }
}

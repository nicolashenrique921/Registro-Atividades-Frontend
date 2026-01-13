import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AtividadesService } from '../../services/atividades';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-atividade-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './atividade-form.html',
  styleUrl: './atividade-form.css'
})
export class AtividadeForm {

  private fb = inject(FormBuilder);
  private service = inject(AtividadesService);
  private router = inject(Router);
  private toast = inject(ToastService);

  submitted = false;

  form = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    descricao: ['', [Validators.required, Validators.minLength(5)]]
  });

  salvar() {
    this.submitted = true;

    if (this.form.invalid) return;

    this.service.criar(this.form.getRawValue()).subscribe({
      next: () => {
        this.toast.success('Atividade salva!');
        this.router.navigate(['/atividades']);
      },
      error: () => this.toast.error('Erro ao salvar')
    });
  }
}

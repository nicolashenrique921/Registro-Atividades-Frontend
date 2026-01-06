import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast-service';
import { AtividadesService } from '../../services/atividades';

@Component({
  selector: 'app-atividade-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './atividade-form.html',
  styleUrl: './atividade-form.css'
})
export class AtividadeForm {

  atividade = {
    titulo: '',
    descricao: ''
  };

  constructor(
    private service: AtividadesService,
    private toast: ToastService,
    private router: Router
  ) {}

  salvar() {
    if (!this.atividade.titulo.trim()) {
      this.toast.error('O título é obrigatório.');
      return;
    }

    this.service.criar(this.atividade).subscribe({
      next: () => {
        this.toast.success('Atividade registrada com sucesso!');
        this.atividade = { titulo: '', descricao: '' };
        this.router.navigate(['/atividades']);
      },
      error: () => {
        this.toast.error('Erro ao registrar atividade.');
      }
    });
  }
}

import { Component } from '@angular/core';
import { AtividadesService } from '../../services/atividades';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-atividade-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './atividade-form.html',
  styleUrl: './atividade-form.css',
})
export class AtividadeForm {
  titulo = "";
  descricao = "";

  constructor(private service: AtividadesService) {}

  salvar() {
    const atividade = {
      titulo: this.titulo,
      descricao: this.descricao
    };

    this.service.criar(atividade).subscribe(() => {
      this.titulo = "";
      this.descricao = "";
      alert("Atividade salva!");
    });
  }
}

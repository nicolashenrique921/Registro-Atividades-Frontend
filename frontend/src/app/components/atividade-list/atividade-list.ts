import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AtividadesService } from '../../services/atividades';
import { Atividade } from '../../models/atividade-model';

@Component({
  selector: 'app-atividade-list',
  standalone: true,
  imports: [
    CommonModule, // @if, @for, date pipe
    FormsModule   // ngModel
  ],
  templateUrl: './atividade-list.html',
  styleUrls: ['./atividade-list.css']
})
export class AtividadeList implements OnInit {

  atividades: Atividade[] = [];

  paginaAtual = 1;
  limite = 5;
  totalRegistros = 0;

  busca = '';
  ordenacao = 'data';

  constructor(private service: AtividadesService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service
      .listarPaginado(
        this.paginaAtual,
        this.limite,
        this.busca,
        this.ordenacao
      )
      .subscribe(res => {
        this.atividades = res.dados;
        this.totalRegistros = res.total;
      });
  }

  buscar() {
    this.paginaAtual = 1;
    this.carregar();
  }

  alterarOrdenacao(tipo: string) {
    this.ordenacao = tipo;
    this.carregar();
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregar();
    }
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregar();
    }
  }

  get totalPaginas(): number {
    return Math.ceil(this.totalRegistros / this.limite);
  }

  remover(id?: string) {
    if (!id) return;

    this.service.remover(id).subscribe(() => {
      this.carregar();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AtividadesService, Atividade } from '../../services/atividades';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-atividade-list',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './atividade-list.html',
  styleUrl: './atividade-list.css',
})
export class AtividadeList implements OnInit {

  atividades: Atividade[] = [];

  constructor(private service: AtividadesService) { }

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.service.listar().subscribe(data => {
      this.atividades = data;
    });
  }

  remover(id: string) {
    this.service.remover(id).subscribe(() => {
      this.buscar();
    });
  }
}


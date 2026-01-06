import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toastcomponent.html',
  styleUrl: './toastcomponent.css'
})

export class ToastComponent {

  private toastService = inject(ToastService);
  toast$ = this.toastService.toast$;

  constructor() {
    this.toast$.subscribe(() => {
      setTimeout(() => this.toastService.clear(), 3000);
    });
  }
}

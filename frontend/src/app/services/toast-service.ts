import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {

  private toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  toast$ = this.toastSubject.asObservable();

  showSuccess(message: string) {
    this.toastSubject.next({ message, type: 'success' });
  }

  showError(message: string) {
    this.toastSubject.next({ message, type: 'error' });
  }

  clear() {
    this.toastSubject.next(null);
  }
}

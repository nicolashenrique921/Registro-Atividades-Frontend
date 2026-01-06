import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new BehaviorSubject<Toast | null>(null);
  toast$ = this.toastSubject.asObservable();

  success(message: string) {
    this.toastSubject.next({ message, type: 'success' });
  }

  error(message: string) {
    this.toastSubject.next({ message, type: 'error' });
  }

  info(message: string) {
    this.toastSubject.next({ message, type: 'info' });
  }

  clear() {
    this.toastSubject.next(null);
  }
}

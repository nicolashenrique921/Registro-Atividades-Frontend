import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LoaderComponent } from './components/loader/loader';
import { ToastComponent } from './components/toastcomponent/toastcomponent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    LoaderComponent,
    ToastComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ToastComponent } from './components/toastcomponent/toastcomponent';
import { LoaderComponent } from './components/loader/loader';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
     RouterLink,
     LoaderComponent,
     ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }

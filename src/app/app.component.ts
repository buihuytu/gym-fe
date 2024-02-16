import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplayoutComponent } from './layout/applayout/applayout.component';
import { LoginComponent } from './auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    ApplayoutComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GymAngularFrontend';
}

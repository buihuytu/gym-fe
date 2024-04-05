import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplayoutComponent } from './layout/applayout/applayout.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './libraries/alert/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    ApplayoutComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GymAngularFrontend';
}

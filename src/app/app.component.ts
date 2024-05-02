import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplayoutComponent } from './layout/applayout/applayout.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './libraries/alert/alert.component';
import { AppConfigService } from './services/app-config.service';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

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
    AlertComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit, OnDestroy, AfterViewInit,OnChanges{
  title = 'GymAngularFrontend';
  authenticated!: boolean;
  subscriptions: Subscription[] = []
  constructor(
    private authService: AuthService,
  ) {
    this.subscriptions.push(
      this.authService.data$.subscribe(x => this.authenticated = !!x )
    )
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => {
      if (x) x.unsubscribe()
    })
  }

  ngAfterViewInit(): void {
  }
}
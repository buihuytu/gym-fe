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
import { TokenService } from './services/token.service';

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
  subscriptions: Subscription[] = [];
  expiration: any;
  isExpiration!: boolean;
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    
    this.subscriptions.push(
      this.authService.data$.subscribe(x => this.authenticated = !!x)
    )
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  ngOnInit(): void {
    console.log(this.authService.data$.value);
    
  }

  ngOnDestroy(): void {
    // this.subscriptions.map(x => {
    //   if (x) x.unsubscribe()
    // })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.expiration = this.tokenService.getExpiration();
      // console.log(parseInt(this.expiration, 10).toLocaleString(), Date.now() > parseInt(this.expiration, 10));
      // this.isExpiration = Date.now() > parseInt(this.expiration, 10)
      
      this.subscriptions.push(
        this.tokenService.isExpired$.subscribe(x => this.isExpiration = x)
      )
      console.log(this.tokenService.isExpired$.value);
    })

  }
}
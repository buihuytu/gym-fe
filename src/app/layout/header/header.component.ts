import { Component } from '@angular/core';
import { AppConfigService } from '../../services/app-config.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  language: boolean = true;
  data!:any;
  subscriptions: Subscription[] = [];
  constructor(
    public appConfig: AppConfigService,
    private tọkenServices: TokenService,
    private authService: AuthService,
    private router: Router,
  ){
    this.subscriptions.push(
      this.authService.data$.subscribe(x => this.data = x)
    )
  }
  onChangeLanguage(){
    this.appConfig.LANGUAGE = !this.appConfig.LANGUAGE;
  }
  logOut(){
    this.tọkenServices.userLogout();
    this.router.navigate(['/']);
  }
}

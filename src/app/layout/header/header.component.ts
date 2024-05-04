import { Component } from '@angular/core';
import { AppConfigService } from '../../services/app-config.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

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
  constructor(
    public appConfig: AppConfigService,
    private tọkenSevices: TokenService,
    private router: Router,
  ){
    console.log(this.appConfig.LANGUAGE) ; 
  }
  onChangeLanguage(){
    this.appConfig.LANGUAGE = !this.appConfig.LANGUAGE;
  }
  logOut(){
    this.tọkenSevices.userLogout();
    this.router.navigate(['/']);
  }
}

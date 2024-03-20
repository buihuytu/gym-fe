import { Component } from '@angular/core';
import { AppConfigService } from '../../services/app-config.service';
import { FormsModule } from '@angular/forms';

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
  constructor(public appConfig: AppConfigService){
    console.log(this.appConfig.LANGUAGE) ; 
  }
  onChangeLanguage(){
    this.appConfig.LANGUAGE = !this.appConfig.LANGUAGE;
  }
}

import { Component, OnInit } from '@angular/core';
import { PreLoaderComponent } from '../pre-loader/pre-loader.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../../auth/login/login.component';
import { DemoTableComponent } from '../../demo/demo-table/demo-table.component';
import { DemoFormComponent } from '../../demo/demo-form/demo-form.component';
import { RouterModule } from '@angular/router';
import { NavigatorComponent } from '../navigator/navigator.component';
import { ConfirmDialogComponent } from '../../libraries/confirm-dialog/confirm-dialog.component';
import { AppConfigService } from '../../services/app-config.service';
import { AlertComponent } from '../../libraries/alert/alert.component';

@Component({
  selector: 'app-applayout',
  standalone: true,
  imports: [
    PreLoaderComponent,
    HeaderComponent,
    FooterComponent,
    DemoTableComponent,
    DemoFormComponent,
    RouterModule,
    NavigatorComponent,
    ConfirmDialogComponent,
    AlertComponent,
  ],
  templateUrl: './applayout.component.html',
  styleUrl: './applayout.component.css'
})
export class ApplayoutComponent implements OnInit {
  constructor(public appConfig: AppConfigService ) {
    
  }
  ngOnInit(): void {
    this.appConfig.BASE_URL = "https://localhost:40404";
    this.appConfig.LANGUAGE = false;
    // try {
    //   fetch('../../assets/app.config.json').then(res => res.json()).then(({ 
    //     BASE_URL,LANGUAGE
    //   }) => {
        
    //   }).catch(e => console.log("fetch app.config.json error", e))
    // } catch (e) {
    //   console.log("appInitialize() zip() error: ", e)
    // }
  }

}

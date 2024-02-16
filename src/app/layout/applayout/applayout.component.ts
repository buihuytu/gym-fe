import { Component } from '@angular/core';
import { PreLoaderComponent } from '../pre-loader/pre-loader.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../../auth/login/login.component';
import { DemoTableComponent } from '../../demo/demo-table/demo-table.component';
import { DemoFormComponent } from '../../demo/demo-form/demo-form.component';

@Component({
  selector: 'app-applayout',
  standalone: true,
  imports: [
    PreLoaderComponent,
    HeaderComponent,
    FooterComponent,
    DemoTableComponent,
    DemoFormComponent
  ],
  templateUrl: './applayout.component.html',
  styleUrl: './applayout.component.css'
})
export class ApplayoutComponent {

}

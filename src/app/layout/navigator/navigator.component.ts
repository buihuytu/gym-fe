import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

declare var Zenix: any;
@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [
    RouterModule 
  ],
  templateUrl: './navigator.component.html',
  styleUrl: './navigator.component.scss'
})
export class NavigatorComponent {
  constructor(){
    
  }
  ngOnInit() {
    Zenix.init();
  }
}

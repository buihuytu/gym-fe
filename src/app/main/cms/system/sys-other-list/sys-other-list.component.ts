import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SysOtherListService } from './sys-other-list.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-sys-other-list',
  standalone: true,
  imports: [
  ],
  templateUrl: './sys-other-list.component.html',
  styleUrl: './sys-other-list.component.css'
})
export class SysOtherListComponent implements OnInit, AfterViewInit{

  listSysOtherListType: any[]=[];


  constructor(
    private sysOtherListService: SysOtherListService
  ){

  }

  ngOnInit(){
    console.log(111111);
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.sysOtherListService.getListType().pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const body = x.body;
            if (body.statusCode === 200) {
              const innerBody = body.innerBody;
              this.listSysOtherListType = innerBody;
            }
          } else {
          }
        })
      );
      console.log(this.listSysOtherListType);
    })
  }

}

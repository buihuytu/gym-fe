import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, TemplateRef, isDevMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { BasePageListService } from './base-page-list.service';
import { HttpRequestService } from '../../services/http.service';
import { LibrariesModule } from '../libraries.module';

export interface ICorePageListApiDefinition {
  queryListRelativePath: string;
}

export interface ICoreTableColumnItem {
  caption: string; 
  field: string;
  type: string;
  align: string;
  width?: number;
  hidden?: boolean;
  templateRef?: TemplateRef<any>;
}

@Component({
  selector: 'app-base-page-list',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './base-page-list.component.html',
  styleUrl: './base-page-list.component.css'
})
export class BasePageListComponent implements OnInit, AfterViewInit {
  @Input() columns!: ICoreTableColumnItem[];
  @Input() apiDefinition!: ICorePageListApiDefinition;


  navigationLink!:any;

  constructor(
    private basePageListService: BasePageListService,
  ) {
    this.navigationLink = `/cms/test/${btoa('0')}`;
  }
  ngOnInit(): void {
    if (!!!this.columns) {
      console.log("NOT EXITS COLUMNS")
    }
    if (this.columns.filter((c: ICoreTableColumnItem) => c.field === 'id').length === 0 && isDevMode() && this.columns.length) {
      console.log("The columns must have one with 'field' property === 'id'")
    }
    const url = this.apiDefinition.queryListRelativePath;
    this.basePageListService.queryList(url,'x');
    // switchMap((x) => {
    //   // this.loading = true;
    //   const url = this.apiDefinition.queryListRelativePath;
    //   return 
    // })
  }
  ngAfterViewInit(): void {
  }

}

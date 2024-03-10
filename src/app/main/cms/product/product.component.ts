import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem } from '../../../libraries/base-page-list/base-page-list.component';
import { api } from '../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../constants/headerButton/ButtonDefinitions';
import { HttpRequestService } from '../../../services/http.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    BasePageListComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  apiQueryList: ICorePageListApiDefinition ={
    queryListRelativePath: api.QUERY_LIST_TEST
  };
  showButtons: EnumBaseButton[]= [EnumBaseButton.CREATE, EnumBaseButton.DELETE, EnumBaseButton.EDIT, EnumBaseButton.APPROVE]
  columns:ICoreTableColumnItem[] = [
    {
      caption: 'id',
      field:'id',
      hidden: true,
      type: 'text',
      align: 'left',
      width: 100
    },
    {
      caption: 'codeCenter',
      field: 'codeCenter',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: 'nameCenter',
      field: 'nameCenter',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: 'address',
      field: 'address',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: 'phone',
      field: 'phone',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: 'isActive',
      field: 'isActive',
      type: 'boolean',
      align: 'left',
      width: 150
    },
    {
      caption: 'isActive',
      field: 'isActive',
      type: 'boolean',
      align: 'left',
      width: 150
    },
    {
      caption: 'isActive',
      field: 'isActive',
      type: 'boolean',
      align: 'left',
      width: 150
    },
    {
      caption: 'isActive',
      field: 'isActive',
      type: 'boolean',
      align: 'left',
      width: 150
    },
    {
      caption: 'isActive',
      field: 'isActive',
      type: 'boolean',
      align: 'left',
      width: 150
    },
    {
      caption: 'isActive',
      field: 'isActive',
      type: 'boolean',
      align: 'left',
      width: 150
    },
    {
      caption: 'isActive',
      field: 'isActive',
      type: 'boolean',
      align: 'left',
      width: 150
    },
    {
      caption: 'isActive',
      field: 'isActive',
      type: 'boolean',
      align: 'left',
      width: 150
    },
  ]
  constructor(
    private httpService: HttpRequestService,
  ) {
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
  }
  ngOnInit() {
    this.httpService.makeGetRequest('qur',api.QUERY_LIST_TEST).pipe().subscribe(x=>{
    })
  }
}


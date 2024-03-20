import { Component } from '@angular/core';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem } from '../../../libraries/base-page-list/base-page-list.component';
import { api } from '../../../constants/api/apiDefinitions';
import { HttpRequestService } from '../../../services/http.service';
import { EnumBaseButton } from '../../../constants/headerButton/ButtonDefinitions';

@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [
    BasePageListComponent
  ],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.scss'
})
export class TestComponentComponent {
  apiQueryList: ICorePageListApiDefinition ={
    queryListRelativePath: api.QUERY_LIST_TEST
  };
  showButtons: EnumBaseButton[]= [EnumBaseButton.CREATE, EnumBaseButton.DELETE, EnumBaseButton.EDIT, EnumBaseButton.APPROVE]
  columns:ICoreTableColumnItem[] = [
    // {
    //   caption: 'id',
    //   field:'id',
    //   hidden: true,
    //   type: 'text',
    //   align: 'left',
    //   width: 100
    // },
    // {
    //   caption: 'codeCenter',
    //   field: 'codeCenter',
    //   type: 'text',
    //   align: 'left',
    //   width: 150
    // },
    // {
    //   caption: 'nameCenter',
    //   field: 'nameCenter',
    //   type: 'text',
    //   align: 'left',
    //   width: 150
    // },
    // {
    //   caption: 'address',
    //   field: 'address',
    //   type: 'text',
    //   align: 'left',
    //   width: 150
    // },
    // {
    //   caption: 'phone',
    //   field: 'phone',
    //   type: 'text',
    //   align: 'left',
    //   width: 150
    // },
    // {
    //   caption: 'isActive',
    //   field: 'isActive',
    //   type: 'boolean',
    //   align: 'left',
    //   width: 150
    // },
  ]
  constructor(
    private httpService: HttpRequestService,
  ) {
  }
  ngOnInit() {
    this.httpService.makeGetRequest('qur',api.QUERY_LIST_TEST).pipe().subscribe(x=>{
    })
  }
}

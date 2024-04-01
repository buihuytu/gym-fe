import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SysOtherListService } from './sys-other-list.service';
import { Subscription, map } from 'rxjs';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { HttpRequestService } from '../../../../services/http.service';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';

@Component({
  selector: 'app-sys-other-list',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './sys-other-list.component.html',
  styleUrl: './sys-other-list.component.css'
})
export class SysOtherListComponent implements BaseComponent {

  listSysOtherListType: any[]=[];
  subscriptions: Subscription[] = [];

  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_OTHER_LIST_QUERY_LIST
  };
  title: string[] = ['Tham số hệ thống', 'System parameter'];
  currentIdType!:any;
  otherListTypeOptions!:any[];
  searchType!:any;
  outerInOperators: IInOperator[] = [];
  showButtons: EnumBaseButton[] = [
    EnumBaseButton.CREATE, 
    EnumBaseButton.DELETE, 
    EnumBaseButton.EDIT, 
    EnumBaseButton.APPROVE
  ]
  columns: ICoreTableColumnItem[] = [
    {
      caption: ['id', 'id'],
      field: 'id',
      hidden: true,
      type: 'text',
      align: 'left',
      width: 100
    },
    {
      caption: ['Trạng thái', 'Status'],
      field: 'status',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Mã nhóm', 'Code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Tên nhóm tham số', 'name'],
      field: 'name',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Mô tả', 'Description'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 400
    },
  ]


  constructor(
    private sysOtherListService: SysOtherListService,
    private httpService: HttpRequestService,
    public appLayoutService:AppLayoutService
  ){
  }
  
  getListOtherListTypes() {
    this.subscriptions.push(
      this.httpService.makeGetRequest('',api.SYS_OTHER_LIST_TYPE_GET_LIST).subscribe(x => {
        if (!!x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            const data = body.innerBody;
            this.otherListTypeOptions = data;
          }
        }
      })
    );
  }

  onSearchListType(e:any){
    console.log(this.searchType)
  }

  onSelectedListTypeChanged(e:any) {
    if(this.currentIdType == e.id) return;
    else{
      this.currentIdType = e.id;
      this.outerInOperators.push(
        {
          field: 'typeId',
          values: e.id
        }
      )
      console.log(this.outerInOperators)
    }
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.getListOtherListTypes();
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}

import { Component } from '@angular/core';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem } from '../../../../libraries/base-page-list/base-page-list.component';
import { api } from '../../../../constants/api/apiDefinitions';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { Subscription, debounceTime, pipe } from 'rxjs';
import { HttpRequestService } from '../../../../services/http.service';
import { CommonModule } from '@angular/common';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';

@Component({
  selector: 'app-sys-other-list-type',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './sys-other-list-type.component.html',
  styleUrl: './sys-other-list-type.component.scss'
})
export class SysOtherListTypeComponent implements BaseComponent {
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_OTHER_LIST_TYPE_QUERY_LIST
  };
  title: string[] = ['Nhóm tham số hệ thống', 'System parameter group'];
  currentIdType!:any;
  otherListTypeOptions!:any[];
  searchType!:any;
  showButtons: EnumBaseButton[] = [EnumBaseButton.CREATE, EnumBaseButton.DELETE, EnumBaseButton.EDIT, EnumBaseButton.APPROVE]
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
    private httpService: HttpRequestService,
    public appLayoutService:AppLayoutService
  ) {
  }
  subscriptions: Subscription[]=[];
  ngAfterViewInit(): void {
    
  }
  ngOnDestroy(): void {
  }
  ngOnInit() {
    this.getListOtherListTypes()
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
    }
  }
}

import { Component } from '@angular/core';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { ICorePageListApiDefinition, IInOperator, ICoreTableColumnItem, BasePageListComponent } from '../../../../libraries/base-page-list/base-page-list.component';
import { HttpRequestService } from '../../../../services/http.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';

@Component({
  selector: 'app-hu-employee',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './hu-employee.component.html',
  styleUrl: './hu-employee.component.scss'
})
export class HuEmployeeComponent implements BaseComponent {
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_OTHER_LIST_TYPE_QUERY_LIST,
    deleteIds:api.SYS_OTHER_LIST_TYPE_DELETE_IDS
  };
  title: string[] = ['Danh sách nhân viên', 'List of employee'];
  currentIdType!:any;
  otherListTypeOptions!:any[];
  searchType!:any;
  outerInOperators: IInOperator[] = [];
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
      caption: ['Trạng thái làm việc', 'Working Status'],
      field: 'status',
      type: 'text',
      align: 'left',
      width: 220
    },
    {
      caption: ['Mã NV', 'Employee Code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Họ và tên', 'Employee name'],
      field: 'name',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Địa chỉ', 'Address'],
      field: 'address',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Điện thoại', 'Phone'],
      field: 'phone',
      type: 'text',
      align: 'left',
      width: 120
    },
    {
      caption: ['Nhóm NV', 'Staff group'],
      field: 'staffGroupName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ghi chú', 'Note'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 150
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
      this.outerInOperators = [
        {
          field: 'typeId',
          values: e.id
        }
      ]
    }
  }
}

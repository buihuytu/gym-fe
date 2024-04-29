import { Component } from '@angular/core';
import { HttpRequestService } from '../../../../services/http.service';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';

@Component({
  selector: 'app-per-customer',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './per-customer.component.html',
  styleUrl: './per-customer.component.scss'
})
export class PerCustomerComponent {
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.PER_CUSTOMER_QUERY_LIST,
    deleteIds:api.PER_CUSTOMER_DELETE_IDS,
    toggleActiveIds: api.PER_CUSTOMER_TOGGLE_ACTIVE
  };
  title: string[] = ['Thông tin khách hàng', 'Informasion customer'];
  currentIdType!:any;
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
      width: 200
    },
    // {
    //   caption: ['Ảnh đại diện', 'Avatar'],
    //   field: 'avatar',
    //   type: 'text',
    //   align: 'left',
    //   width: 200
    // },
    {
      caption: ['Mã khách hàng', 'Customer Code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Nhóm khách hàng', 'Customer group'],
      field: 'customerClassName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Họ và tên', 'Customer name'],
      field: 'fullName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ngày sinh', 'Birth date'],
      field: 'birthDateString',
      type: 'date',
      align: 'center',
      width: 120
    },
    {
      caption: ['CCCD/CMND', 'ID No'],
      field: 'idNo',
      type: 'text',
      align: 'center',
      width: 120
    },
    {
      caption: ['Giới tính', 'Gender'],
      field: 'genderName',
      type: 'text',
      align: 'left',
      width: 100
    },
    {
      caption: ['Địa chỉ', 'Address'],
      field: 'address',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Điện thoại', 'Phone'],
      field: 'phoneNumber',
      type: 'text',
      align: 'left',
      width: 100
    },
    {
      caption: ['Là khách tập thử', 'Is Guest Pass'],
      field: 'isGuestPass',
      type: 'bool',
      align: 'left',
      width: 170
    },
    {
      caption: ['Huấn luyện viên', 'Coach'],
      field: 'perPtName',
      type: 'text',
      align: 'left',
      width: 170
    },
    {
      caption: ['Ghi chú', 'Note'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
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
  }

  onSearchListType(e:any){
    console.log(this.searchType)
  }

  
}

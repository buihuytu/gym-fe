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
      width: 220
    },
    {
      caption: ['Ảnh đại diện', 'Avatar'],
      field: 'avatar',
      type: 'text',
      align: 'left',
      width: 220
    },
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
      width: 250
    },
    {
      caption: ['Ngày sinh', 'Birth date'],
      field: 'birthDateString',
      type: 'date',
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
      caption: ['Email', 'Email'],
      field: 'email',
      type: 'text',
      align: 'left',
      width: 120
    },
    {
      caption: ['Tỉnh thành', 'Native'],
      field: 'nativeName',
      type: 'text',
      align: 'left',
      width: 100
    },
    
    {
      caption: ['Tôn giáo', 'Religion'],
      field: 'religionName',
      type: 'text',
      align: 'left',
      width: 100
    },
    {
      caption: ['Ngân hàng', 'Bank'],
      field: 'bankName',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Chi nhánh ngân hàng', 'Bank branch'],
      field: 'bankBranchName',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Số tài khoản', 'Bank no'],
      field: 'bankNo',
      type: 'text',
      align: 'left',
      width: 150
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

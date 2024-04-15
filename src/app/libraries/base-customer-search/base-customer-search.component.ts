import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { api } from '../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../constants/headerButton/ButtonDefinitions';
import { AppLayoutService } from '../../layout/applayout/applayout.service';
import { AppConfigService } from '../../services/app-config.service';
import { HttpRequestService } from '../../services/http.service';
import { BaseComponent } from '../base-component/base-component.component';
import { BasePageListComponent, ICorePageListApiDefinition, IInOperator, ICoreTableColumnItem } from '../base-page-list/base-page-list.component';
import { DebounceDirective } from '../debounce-event/debounce-event.directive';

@Component({
  selector: 'base-customer-control',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './base-customer-search.component.html',
  styleUrl: './base-customer-search.component.scss'
})
export class BaseCustomerSearchComponent implements BaseComponent {
  @Output() selectedDataChange = new EventEmitter();

  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.PER_CUSTOMER_QUERY_LIST,
    deleteIds:api.PER_CUSTOMER_DELETE_IDS,
    toggleActiveIds: api.PER_CUSTOMER_TOGGLE_ACTIVE
  };
  title: string[] = ['Thông tin khách hàng', 'Informasion customer'];
  currentIdType!:any;
  otherListTypeOptions!:any[];
  searchType!:any;
  outerInOperators: IInOperator[] = [];
  language!: boolean;
  showPopup!: boolean;

  selectedData!: any;
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
  ]
  constructor(
    private httpService: HttpRequestService,
    public appLayoutService:AppLayoutService,
    public appConfig: AppConfigService,
  ) {
    this.language = this.appConfig.LANGUAGE;
  }
  subscriptions: Subscription[]=[];
  ngAfterViewInit(): void {
    
  }
  ngOnDestroy(): void {
    this.subscriptions.map((subscription: Subscription) =>{
      subscription.unsubscribe();
    });
  }
  ngOnInit() {
    this.getListOtherListTypes()
    if (typeof window !== "undefined") {
    
    }
  }

  getListOtherListTypes() {
    this.subscriptions.push(
      this.httpService.makeGetRequest('',api.SYS_OTHER_LIST_GET_LIST_BY_TYPE+'STAFF_GROUP').subscribe(x => {
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
          field: 'staffGroupId',
          values: e.id
        }
      ]
    }
  }
  onShowPopup(){
    this.showPopup = true;
  }
  onClose(){
    this.showPopup = false;
  }
  onSelectedDataChange(e:any){
    this.selectedDataChange.emit(e);
    this.selectedData = e
    this.showPopup = false;
  }
  onUnSelectedData(){
    this.selectedDataChange.emit(null);
    this.selectedData = null;
  }
}

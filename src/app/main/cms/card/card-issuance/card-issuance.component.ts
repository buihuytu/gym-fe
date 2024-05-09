import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { BasePageListComponent, ICorePageListApiDefinition, IInOperator, ICoreTableColumnItem } from '../../../../libraries/base-page-list/base-page-list.component';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { HttpRequestService } from '../../../../services/http.service';

@Component({
  selector: 'app-card-issuance',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './card-issuance.component.html',
  styleUrl: './card-issuance.component.scss'
})
export class CardIssuanceComponent {
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.CARD_ISSUANCE_QUERY_LIST,
    deleteIds:api.CARD_ISSUANCE_DELETE_IDS,
    toggleActiveIds: api.CARD_ISSUANCE_TOGGLE_ACTIVE,
    exportExcel:api.CARD_ISSUANCE_QUERY_LIST,
  };
  title: string[] = ['Cấp thẻ', 'Card issuance'];
  currentIdType!:any;
  searchType!:any;
  outerInOperators: IInOperator[] = [];
  showButtons: EnumBaseButton[] = [
    EnumBaseButton.CREATE, 
    EnumBaseButton.DELETE, 
    EnumBaseButton.EDIT, 
    EnumBaseButton.APPROVE,
    EnumBaseButton.PDF,
    EnumBaseButton.EXCEL,
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
      caption: ['Số chứng từ', 'Document number'],
      field: 'status',
      type: 'text',
      align: 'left',
      width: 220
    },
    {
      caption: ['Ngày chứng từ', 'Customer code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 220
    },
    {
      caption: ['Tên khách hàng', 'Customer name'],
      field: 'cardTypeName',
      type: 'text',
      align: 'left',
      width: 220
    },
    {
      caption: ['Mã khách hàng', 'Customer Code'],
      field: 'codeCus',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Nhóm khách hàng', 'Customer group'],
      field: 'customerName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Khung giờ tập', 'Practice time'],
      field: 'genderName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số thẻ', 'Card number'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Loại thẻ', 'Type card'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ngày bắt đầu', 'Start date'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ngày kết thúc ', 'End date'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Thời gian tập', 'Start date'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Thời gian thêm', 'Extra time'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Tổng thời gian', 'Total time'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Lấy giá gốc?', 'Original price?'],
      field: 'note',
      type: 'bool',
      align: 'left',
      width: 200
    },
    {
      caption: ['Giá thẻ', 'Price'],
      field: 'priceCard',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Phần trăm giảm', 'Percent reduction'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số tiền giảm', 'Reduced amount'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['VAT', 'VAT'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    // {
    //   caption: ['Số tiền VAT', 'VAT amount'],
    //   field: 'note',
    //   type: 'text',
    //   align: 'left',
    //   width: 200
    // },
    // {
    //   caption: ['Dịch vụ', 'Service'],
    //   field: 'note',
    //   type: 'text',
    //   align: 'left',
    //   width: 200
    // },
    // {
    //   caption: ['Số tiền dịch vụ', 'Service amount'],
    //   field: 'note',
    //   type: 'text',
    //   align: 'left',
    //   width: 200
    // },
    // {
    //   caption: ['Số tiền khác', 'Other amount'],
    //   field: 'note',
    //   type: 'text',
    //   align: 'left',
    //   width: 200
    // },
    {
      caption: ['Tổng cộng', 'Total'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số tiền phải trả', 'The money have to pay'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số tiền đẫ trả', 'The money have to pay'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số tiền còn lại', 'The remaining amount'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ghi chú', 'note'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Loại giao dịch', 'Transaction type'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Tạo bởi', 'Create by'],
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
}

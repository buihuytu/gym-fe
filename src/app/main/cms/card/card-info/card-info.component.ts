import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { HttpRequestService } from '../../../../services/http.service';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss'
})
export class CardInfoComponent {

  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.CARD_INFO_QUERY_LIST,
    deleteIds:api.CARD_INFO_DELETE_IDS,
    toggleActiveIds: api.CARD_INFO_TOGGLE_ACTIVE
  };
  title: string[] = ['Thông tin thẻ', 'Informasion card'];
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
      caption: ['Mã thẻ', 'Card code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Tên loại thẻ', 'Card type name'],
      field: 'cardTypeName',
      type: 'text',
      align: 'left',
      width: 170
    },
    {
      caption: ['Ngày hiệu lực', 'Effect Date'],
      field: 'effectDateString',
      type: 'date',
      align: 'left',
      width: 150
    },
    {
      caption: ['Ngày hết hạn', 'Expired Date'],
      field: 'expiredDateString',
      type: 'date',
      align: 'left',
      width: 150
    },
    {
      caption: ['Có tủ đồ', 'Wardrobe?'],
      field: 'wardrobe',
      type: 'bool',
      align: 'left',
      width: 120
    },
    {
      caption: ['Có PT', 'Have PT?'],
      field: 'isHavePt',
      type: 'bool',
      align: 'left',
      width: 120
    },
    {
      caption: ['Giá', 'Price'],
      field: 'price',
      type: 'currency',
      align: 'left',
      width: 150
    },
    {
      caption: ['Ca tập', 'Shift Name'],
      field: 'shiftName',
      type: 'text',
      align: 'left',
      width: 200
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
}

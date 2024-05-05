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
      width: 220
    },
    {
      caption: ['Tên loại thẻ', 'Card type name'],
      field: 'cardTypeName',
      type: 'text',
      align: 'left',
      width: 220
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

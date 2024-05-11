import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { HttpRequestService } from '../../../../services/http.service';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-check-in',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './card-check-in.component.html',
  styleUrl: './card-check-in.component.scss'
})
export class CardCheckInComponent {
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.CARD_CHECK_IN_QUERY_LIST,
    deleteIds:api.CARD_CHECK_IN_DELETE_IDS,
    toggleActiveIds: api.CARD_CHECK_IN_TOGGLE_ACTIVE
  };
  title: string[] = ['Thông tin check-in', 'Check-in information'];
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
      caption: ['Mã thẻ', 'Card code'],
      field: 'cardCode',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Tên hội viên', 'Customer Name'],
      field: 'customerName',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Ngày tập', 'Date'],
      field: 'dayCheckIn',
      type: 'date',
      align: 'left',
      width: 150
    },
    {
      caption: ['Ca tập', 'Shift'],
      field: 'shiftName',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Giờ vào gốc', 'Hour Shift In'],
      field: 'timeStartShiftString',
      type: 'text',
      align: 'left',
      width: 150
    },
    
    {
      caption: ['Giờ ra gốc', 'Hour Shift Out'],
      field: 'timeEndShiftString',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Giờ vào thực tế', 'Hour In'],
      field: 'timeStartString',
      type: 'text',
      align: 'left',
      width: 150
    },
    
    {
      caption: ['Giờ ra thực tế', 'Hour Out'],
      field: 'timeEndString',
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

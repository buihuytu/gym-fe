import { Component } from '@angular/core';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { Subscription } from 'rxjs';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { api } from '../../../../constants/api/apiDefinitions';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { HttpRequestService } from '../../../../services/http.service';

@Component({
  selector: 'app-goods-equipment-fix',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './goods-equipment-fix.component.html',
  styleUrl: './goods-equipment-fix.component.css'
})
export class GoodsEquipmentFixComponent implements BaseComponent{
  subscriptions: Subscription[] = [];

  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.GOODS_EQUIPMENT_FIX_QUERY_LIST,
    deleteIds:api.GOODS_EQUIPMENT_FIX_DELETE_IDS
  }; 
  
  title: string[] = ['Danh sách bảo trì/sửa chữa thiết bị', 'List Equipment Fix'];
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
      width: 250
    },
    {
      caption: ['Mã thiết bị', 'Code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Tên thiết bị', 'Name'],
      field: 'name',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Loại thiết bị', 'Equipment Type'],
      field: 'equipmentTypeName',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Nhà sản xuất', 'Manufacturer'],
      field: 'manufacturer',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Ngày mua', 'PurchaseDate'],
      field: 'purchaseDate',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Ngày hết bảo hành', 'Warranty Expiry Date'],
      field: 'warrantyExpiryDate',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Giá tiền', 'Cost'],
      field: 'cost',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Vị trí đặt', 'Address'],
      field: 'address',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Người quản lý', 'Manager'],
      field: 'managerName',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Ghi chú', 'Note'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 400
    },
  ]

  constructor(
    private httpService: HttpRequestService,
    public appLayoutService:AppLayoutService
  ){
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
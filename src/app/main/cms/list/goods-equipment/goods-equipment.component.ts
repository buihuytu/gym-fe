import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { HttpRequestService } from '../../../../services/http.service';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';

@Component({
  selector: 'app-goods-equipment',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './goods-equipment.component.html',
  styleUrl: './goods-equipment.component.css'
})
export class GoodsEquipmentComponent implements BaseComponent {
  subscriptions: Subscription[] = [];
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.GOODS_EQUIPMENT_QUERY_LIST,
    deleteIds:api.GOODS_EQUIPMENT_DELETE_IDS
  }; 

  title: string[] = ['Danh sách thiết bị', 'List Equipment'];
  currentIdType!:any;
  searchType!:any;
  outerInOperators: IInOperator[] = [];

  // LIST LEFT
  listEquipmentTypeOptions!:any[];
  listEquipmentTypeOptionShow!:any[];

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

  getListEquipmentTypes() {
    this.subscriptions.push(
      this.httpService.makeGetRequest('',api.SYS_OTHER_LIST_GET_LIST_BY_CODE + 'EQUIPMENT_TYPE').subscribe(x => {
        if (!!x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            const data = body.innerBody;
            this.listEquipmentTypeOptions = data;
            this.listEquipmentTypeOptionShow = data;
          }
        }
      })
    );
  }

  onSearchListType(e:any){
    if(this.searchType !== '' && this.searchType !== null){
      this.listEquipmentTypeOptionShow = this.listEquipmentTypeOptions.filter(x=> x.name.toString().toUpperCase().includes(this.searchType.toString().toUpperCase()));
    }else{
      this.listEquipmentTypeOptionShow = this.listEquipmentTypeOptions
    }
  }

  onSelectedListTypeChanged(e:any) {
    if(this.currentIdType == e.id) return;
    else{
      this.currentIdType = e.id;
      this.outerInOperators= [
        {
          field: 'typeId',
          values: e.id
        }
      ]
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
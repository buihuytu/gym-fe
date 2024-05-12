import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { DropdownComponent } from '../../../../../libraries/base-dropdown/dropdown.component';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { Subscription } from 'rxjs';
import { api } from '../../../../../constants/api/apiDefinitions';
import { DialogService } from '../../../../../services/dialog.service';
import { BaseEmployeeSearchComponent } from '../../../../../libraries/base-employee-search/base-employee-search.component';

@Component({
  selector: 'app-goods-equipment-fix-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent,
    BaseEmployeeSearchComponent,
  ],
  templateUrl: './goods-equipment-fix-edit.component.html',
  styleUrl: './goods-equipment-fix-edit.component.css'
})
export class GoodsEquipmentFixEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string[] = ['Thông tin bảo trì/sửa chữa thiết bị','Fix/Maintance Equipment information'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;
  subscriptions: Subscription[] = [];

  getListEquipmentOptions$: any;
  getListEquipmentStatusOptions$: any = api.SYS_OTHER_LIST_GET_LIST_BY_CODE + 'EQUIPMENT_STATUS';
  getListTypeEquipmentOptions$: any = api.SYS_OTHER_LIST_GET_LIST_BY_CODE + 'EQUIPMENT_TYPE';


  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      id:[],
      typeId: [null,[Validators.required]],
      equipmentId: [null,[Validators.required]],
      code: [null],
      startDate: [null,[Validators.required]],
      endDate: [null,[Validators.required]],
      resultId: [null,[Validators.required]],
      money: [null,[Validators.required]],
      expectedUseTime: [], 
      employeeId: [],
      note: [],
    })
    this.crud = {
      c: api.GOODS_EQUIPMENT_FIX_CREATE,
      r: api.GOODS_EQUIPMENT_FIX_READ,
      u: api.GOODS_EQUIPMENT_FIX_UPDATE,
      d: api.GOODS_EQUIPMENT_FIX_DELETE_IDS,
    }

    this.onFormCreated()

  }

  onDropdownSelected(event:any, e:string):void{
    this.form.get(e)?.setValue(event);
    this.form.get(e)?.markAllAsTouched();
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {
  }

  onFormCreated() {
    this.subscriptions.push(
      this.form.get('typeId')?.valueChanges.subscribe(x => {
        this.getListEquipmentOptions$ = api.GOODS_EQUIPMENT_GET_LIST_BY_TYPE_ID + x;
      })!,
    )
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}

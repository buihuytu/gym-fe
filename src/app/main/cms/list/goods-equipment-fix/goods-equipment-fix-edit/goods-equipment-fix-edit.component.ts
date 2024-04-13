import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { DropdownComponent } from '../../../../../libraries/dropdown/dropdown.component';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { Subscription } from 'rxjs';
import { api } from '../../../../../constants/api/apiDefinitions';
import { DialogService } from '../../../../../services/dialog.service';

@Component({
  selector: 'app-goods-equipment-fix-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent
  ],
  templateUrl: './goods-equipment-fix-edit.component.html',
  styleUrl: './goods-equipment-fix-edit.component.css'
})
export class GoodsEquipmentFixEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string[] = ['Thông tin bảo trì/sửa chữa thiết bị','Fix/Maintance Equipment information'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;
  subscriptions: Subscription[] = [];

  getListEquipmentOptions$: any = api.GOODS_EQUIPMENT_FIX_GET_LIST;
  
  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      id:[],
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

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}

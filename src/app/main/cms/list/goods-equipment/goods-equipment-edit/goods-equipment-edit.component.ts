import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { DropdownComponent } from '../../../../../libraries/dropdown/dropdown.component';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { api } from '../../../../../constants/api/apiDefinitions';
import { DialogService } from '../../../../../services/dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-goods-equipment-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent
  ],
  templateUrl: './goods-equipment-edit.component.html',
  styleUrl: './goods-equipment-edit.component.css'
})
export class GoodsEquipmentEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string[] = ['Thông tin thiết bị','Equipment information'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;
  subscriptions: Subscription[] = [];
  
  getListEquipmentTypeOptions$: any = api.SYS_OTHER_LIST_GET_LIST_BY_CODE + 'EQUIPMENT_TYPE';

  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      id:[],
      code: [null],
      name: [null,[Validators.required]],
      equipmentType: [null,[Validators.required]],
      manufacturer: [],
      purchaseDate: [null,[Validators.required]],
      statusId: [],
      warrantyExpiryDate: [null,[Validators.required]],
      cost: [null,[Validators.required]],
      address: [],
      managerId: [],
      note: [],
    })
    this.crud = {
      c: api.GOODS_EQUIPMENT_CREATE,
      r: api.GOODS_EQUIPMENT_READ,
      u: api.GOODS_EQUIPMENT_UPDATE,
      d: api.GOODS_EQUIPMENT_DELETE_IDS,
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

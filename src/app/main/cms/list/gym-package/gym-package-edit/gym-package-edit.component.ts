import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { DropdownComponent } from '../../../../../libraries/dropdown/dropdown.component';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../../../services/dialog.service';
import { HttpRequestService } from '../../../../../services/http.service';
import { api } from '../../../../../constants/api/apiDefinitions';
import { BaseEmployeeSearchComponent } from '../../../../../libraries/base-employee-search/base-employee-search.component';
import { BaseCustomerSearchComponent } from '../../../../../libraries/base-customer-search/base-customer-search.component';

@Component({
  selector: 'app-gym-package-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent,
    BaseCustomerSearchComponent
  ],
  templateUrl: './gym-package-edit.component.html',
  styleUrl: './gym-package-edit.component.css'
})
export class GymPackageEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy{
  title: string[] = ['Gói cước','Gym Package'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;

  otherListTypeOptions!:any[];
  subscriptions: Subscription[] = [];

  getListShiftOptions$: any = api.GYM_SHIFT_GET_LIST;

  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    private httpService: HttpRequestService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      id:[],
      isActive: [],
      code: [null,[Validators.required]],
      money: [null,[Validators.required]],
      period: [null,[Validators.required]],
      shiftId: [null,[Validators.required]],
      description: [],
    })
    this.crud = {
      c: api.GYM_PACKAGE_CREATE,
      r: api.GYM_PACKAGE_READ,
      u: api.GYM_PACKAGE_UPDATE,
      d: api.GYM_PACKAGE_DELETE_IDS,
    }
  }

  onDropdownSelected(event:any, e:string):void{
    this.form.get(e)?.setValue(event);
    this.form.get(e)?.markAllAsTouched();
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}

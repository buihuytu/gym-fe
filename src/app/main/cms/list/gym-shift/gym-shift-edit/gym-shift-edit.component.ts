import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { DropdownComponent } from '../../../../../libraries/dropdown/dropdown.component';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { api } from '../../../../../constants/api/apiDefinitions';
import { DialogService } from '../../../../../services/dialog.service';
import { HttpRequestService } from '../../../../../services/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gym-shift-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent
  ],
  templateUrl: './gym-shift-edit.component.html',
  styleUrl: './gym-shift-edit.component.css'
})
export class GymShiftEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string[] = ['Ca tập','Shift'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;

  otherListTypeOptions!:any[];
  subscriptions: Subscription[] = [];

  getListTypeOptions$: any = api.SYS_OTHER_LIST_GET_LIST_BY_CODE + 'USER_GROUP';


  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    private httpService: HttpRequestService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      id:[],
      isActive:[],
      code: [null,[Validators.required]],
      name: [null,[Validators.required]],
      totalDays: [],
      hoursStart: [null,[Validators.required]],
      hoursEnd: [null,[Validators.required]],
      note: [],
    })
    this.crud = {
      c: api.GYM_SHIFT_CREATE,
      r: api.GYM_SHIFT_READ,
      u: api.GYM_SHIFT_UPDATE,
      d: api.GYM_SHIFT_DELETE_IDS,
    }
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

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { api } from '../../../../../constants/api/apiDefinitions';
import { DialogService } from '../../../../../services/dialog.service';
import { HttpRequestService } from '../../../../../services/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sys-user-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent
  ],
  templateUrl: './sys-user-edit.component.html',
  styleUrl: './sys-user-edit.component.css'
})
export class SysUserEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string[] = ['Tài khoản','User'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;

  otherListTypeOptions!:any[];
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    private httpService: HttpRequestService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      id:[],
      groupId: [null,[Validators.required]],
      username: [null,[Validators.required]],
      fullname: [null,[Validators.required]],
      employeeId: [null,[Validators.required]],
      password: [null,[Validators.required]],
      rePassword: [null,[Validators.required]],
    })
    this.crud = {
      c: api.SYS_USER_CREATE,
      r: api.SYS_USER_READ,
      u: api.SYS_USER_UPDATE,
      d: api.SYS_USER_DELETE_IDS,
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

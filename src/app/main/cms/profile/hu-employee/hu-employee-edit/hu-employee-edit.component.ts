import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { api } from '../../../../../constants/api/apiDefinitions';
import { DialogService } from '../../../../../services/dialog.service';
import { RouterModule } from '@angular/router';
import { DropdownComponent } from '../../../../../libraries/dropdown/dropdown.component';

@Component({
  selector: 'app-hu-employee-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent
  ],
  templateUrl: './hu-employee-edit.component.html',
  styleUrl: './hu-employee-edit.component.scss'
})
export class HuEmployeeEditComponent extends BaseEditComponent implements OnInit {
  title: string[] = ['Thông tin nhân viên','Employee information'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;

  getStaffGroupOptions$: string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE+'STAFF_GROUP';
  getGenderOptions$: string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE+'GENDER';
  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      id:[],
      code: [null],
      name: [null,[Validators.required]],
      birthDate: [null,[Validators.required]],
      genderId: [null,[Validators.required]],
      staffGroupId: [null,[Validators.required]],
      idNo: [null,[Validators.required]],
      phone: [null,[Validators.required]],
      address: [null,[Validators.required]],
      mail: [null],
      note: [],
    })
    this.crud = {
      c: api.SYS_OTHER_LIST_TYPE_CREATE,
      r: api.SYS_OTHER_LIST_TYPE_READ,
      u: api.SYS_OTHER_LIST_TYPE_UPDATE,
      d: api.SYS_OTHER_LIST_TYPE_DELETE_IDS,
    }
  }
  ngOnInit() {
  }

  onDropdownSelected(event:any, e:string):void{
    this.form.get(e)?.setValue(event);
    this.form.get(e)?.markAllAsTouched();
  }
}

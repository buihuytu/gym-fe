import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService } from '../../../../../services/dialog.service';
import { RouterModule } from '@angular/router';
import { BasePageEditComponent } from '../../../../../libraries/base-page-edit/base-page-edit.component';

@Component({
  selector: 'app-sys-other-list-type-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent
  ],
  templateUrl: './sys-other-list-type-edit.component.html',
  styleUrl: './sys-other-list-type-edit.component.css'
})
export class SysOtherListTypeEditComponent extends BaseEditComponent {
  title: string[] = ['Nhóm tham số hệ thống','System parameter group'];
  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      name: [null,[Validators.required]],
      note: [],
      metaTitle: [],
      metaKey: [],
      metaDesc: [],
      idParent:[],
      image: [],
      active: [],
    })
  }

  getRawValue() {
    console.log(this.form.getRawValue());
  }

}

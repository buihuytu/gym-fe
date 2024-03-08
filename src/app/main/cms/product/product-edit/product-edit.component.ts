import { Component, Directive } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseEditComponent } from '../../../../libraries/base-edit/base-edit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService } from '../../../../services/dialog.service';
import { BasePageEditComponent } from '../../../../libraries/base-page-edit/base-page-edit.component';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent extends BaseEditComponent {
  title: string = 'Quản lý thông tin X';
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

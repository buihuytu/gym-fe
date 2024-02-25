import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseEditComponent } from '../../../../libraries/base-edit/base-edit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent extends BaseEditComponent {
  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      name: [],
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

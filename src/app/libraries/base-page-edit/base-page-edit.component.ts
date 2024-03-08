import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { BaseEditComponent } from '../base-edit/base-edit.component';
import { ICorePageListApiDefinition } from '../base-page-list/base-page-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base-page-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  templateUrl: './base-page-edit.component.html',
  styleUrl: './base-page-edit.component.scss'
})
export class BasePageEditComponent extends BaseEditComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() main!: TemplateRef<any>;
  @Input() title!: string;
  @Input() apiDefinition!: ICorePageListApiDefinition;
  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
    super(dialogService);
  }
  ngOnInit(): void {
    this.form = this.formGroup;
  }

  getRawValue() {
    console.log(this.form.getRawValue());
  }
  onCancel(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
import { Component, Input, OnInit, TemplateRef,isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { BaseEditComponent } from '../base-edit/base-edit.component';
import { ICorePageListApiDefinition } from '../base-page-list/base-page-list.component';
import { CommonModule } from '@angular/common';
import { BasePageListService } from '../base-page-list/base-page-list.service';
import { HttpRequestService } from '../../services/http.service';
import { api } from '../../constants/api/apiDefinitions';
import { PreLoaderComponent } from '../../layout/pre-loader/pre-loader.component';

export interface ICorePageEditCRUD {
  c?: api; // Create
  r?: api; // GetById
  u?: api; // Update
  d?: api; // Delete
  
}
@Component({
  selector: 'app-base-page-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    PreLoaderComponent
  ],
  templateUrl: './base-page-edit.component.html',
  styleUrl: './base-page-edit.component.scss'
})
export class BasePageEditComponent extends BaseEditComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() main!: TemplateRef<any>;
  @Input() title!: string;
  @Input() apiDefinition!: ICorePageListApiDefinition;
  @Input() crud!: ICorePageEditCRUD;
  id!:number;
  isDevMode!: boolean;
  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    private httpService: HttpRequestService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
    super(dialogService);
    this.isDevMode = isDevMode();
    this.id = Number(atob(this.route.snapshot.params['id']));
    
  }
  ngOnInit(): void {
    this.form = this.formGroup;
  }

  getRawValue() {
    console.log(this.form.getRawValue());
  }
  saveData(){
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const param = JSON.stringify(this.form.getRawValue())
    console.log(param)
    if (!!!this.form.get('id')!.value) {
    this.httpService.makePostRequest('create',this.crud.c!, param).subscribe((x) => {
      if (x.ok && x.status === 200) {
        const body = x.body;
        if (body.statusCode === 200) {
          if (isDevMode()) {
          }
          this.router.navigate(['../'], { relativeTo: this.route, state: { id: body.innerBody.id } });
        }
      } else {
        this.onNotOk200Response(x);
      }
    })

    }else{

    }
  }
  onCancel(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onNotOk200Response(x: object): void {
    if (isDevMode()) {
      if (Object.keys(x).length === 0) {
        //this.alertService.error("No response content. It was possibly a CORS error.", noneAutoClosedAlertOptions)
        console.log(x)
      } else {
        //this.alertService.error(JSON.stringify(x, null, 2), noneAutoClosedAlertOptions)
      }
    }
  }
}
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-base-edit',
  standalone: true,
  imports: [],
  templateUrl: './base-edit.component.html',
  styleUrl: './base-edit.component.css'
})
export class BaseEditComponent {
  formInitStringValue!: string;
  form!: FormGroup;
  entityTable!: string;
  showModal: boolean = false;

  constructor(
    public dialogService: DialogService
  ) { }

  canDeactivate(): Observable<boolean> | boolean {
    console.log("this.formInitStringValue", this.formInitStringValue)
    console.log("JSON.stringify(this.form.getRawValue())", JSON.stringify(this.form?.getRawValue()))
    const condition = JSON.stringify(this.form.getRawValue()) === this.formInitStringValue;
    if (condition) {
      return true;
    } else {
      console.log("show-dialog");
      this.dialogService.busy = true;
      this.dialogService.showConfirmDialog$.next(true);
      this.dialogService.title$.next("XÁC NHẬN");
      this.dialogService.body$.next("Dữ liệu đã được thay đổi và sẽ không được lưu nếu điều hướng!");
      this.dialogService.okButtonText$.next("Đồng ý");
      this.dialogService.cancelButtonText$.next("Quay lại");
      const observable = this.dialogService.canDeactivate$.asObservable();
      return observable;
    }   
  }

}

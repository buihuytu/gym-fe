import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { ICorePageListApiDefinition, IInOperator, ICoreTableColumnItem, BasePageListComponent } from '../../../../libraries/base-page-list/base-page-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';

@Component({
  selector: 'app-gym-shift',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './gym-shift.component.html',
  styleUrl: './gym-shift.component.scss'
})
export class GymShiftComponent implements BaseComponent {
  subscriptions: Subscription[] = [];
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.GYM_PACKAGE_QUERY_LIST
  };
  title: string[] = ['Danh mục ca tập', 'List Gym Shift'];
  currentIdType!:any;
  searchType!:any;
  outerInOperators: IInOperator[] = [];

  showButtons: EnumBaseButton[] = [
    EnumBaseButton.CREATE, 
    EnumBaseButton.DELETE, 
    EnumBaseButton.EDIT, 
    EnumBaseButton.APPROVE
  ]
  columns: ICoreTableColumnItem[] = [
    {
      caption: ['id', 'id'],
      field: 'id',
      hidden: true,
      type: 'text',
      align: 'left',
      width: 100
    },
    {
      caption: ['Mã gói', 'Code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Giá', 'Money'],
      field: 'money',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Thời hạn', 'Period'],
      field: 'period',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Ca sdsdsdsds', 'Shift'],
      field: 'shiftName',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Mô tả', 'Description'],
      field: 'description',
      type: 'text',
      align: 'left',
      width: 400
    },
  ]
  
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}

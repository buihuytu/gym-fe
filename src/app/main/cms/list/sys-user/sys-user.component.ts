import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { Subscription } from 'rxjs';
import { HttpRequestService } from '../../../../services/http.service';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';

@Component({
  selector: 'app-sys-user',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './sys-user.component.html',
  styleUrl: './sys-user.component.css'
})
export class SysUserComponent implements BaseComponent {
  
  subscriptions: Subscription[] = [];

  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_USER_QUERY_LIST
  };
  title: string[] = ['Tài khoản', 'User'];
  currentIdType!:any;
  otherListTypeOptions!:any[];
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
      caption: ['Tài khoản', 'Username'],
      field: 'username',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Ảnh đại diện', 'Avatar'],
      field: 'avatar',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Mã NV', 'Employee Code'],
      field: 'employeeCode',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Nhóm tài khoản', 'Account Group'],
      field: 'groupName',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Họ và tên', 'Fullname'],
      field: 'fullname',
      type: 'text',
      align: 'left',
      width: 400
    },
  ]


  constructor(
    private httpService: HttpRequestService,
    public appLayoutService:AppLayoutService
  ){
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}

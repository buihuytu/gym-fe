import { Component } from '@angular/core';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem } from '../../../../libraries/base-page-list/base-page-list.component';
import { api } from '../../../../constants/api/apiDefinitions';

@Component({
  selector: 'app-sys-other-list-type',
  standalone: true,
  imports: [
    BasePageListComponent
  ],
  templateUrl: './sys-other-list-type.component.html',
  styleUrl: './sys-other-list-type.component.css'
})
export class SysOtherListTypeComponent {
  apiQueryList: ICorePageListApiDefinition ={
    queryListRelativePath: api.SYS_OTHER_LIST_TYPE_QUERY_LIST
  };
  title: string[] = ['Nhóm tham số hệ thống','System parameter group'];
  showButtons: EnumBaseButton[]= [EnumBaseButton.CREATE, EnumBaseButton.DELETE, EnumBaseButton.EDIT, EnumBaseButton.APPROVE]
  columns:ICoreTableColumnItem[] = [
    {
      caption: ['id','id'],
      field:'id',
      hidden: true,
      type: 'text',
      align: 'left',
      width: 100
    },
    {
      caption: ['Trạng thái','Status'],
      field: 'status',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Tên nhóm tham số','name'],
      field: 'name',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Mô tả','Description'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 400
    },
  ]
  constructor(
  ) {
  }
}

import { Component } from '@angular/core';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem } from '../../../../libraries/base-page-list/base-page-list.component';
import { api } from '../../../../constants/api/apiDefinitions';

@Component({
  selector: 'app-per-customer-list-card',
  standalone: true,
  imports: [
    BasePageListComponent
  ],
  templateUrl: './per-customer-list-card.component.html',
  styleUrl: './per-customer-list-card.component.scss'
})
export class PerCustomerListCardComponent {
  title: string[] = ['Danh sách các thẻ được cấp', 'List of issued cards'];

  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.PER_CUSTOMER_TRANSACTIONS_QUERY_LIST,
  };

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
      caption: ['Đã hết hạn?', 'Expired?'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số thẻ', 'Card number'],
      field: 'transDateString',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Tên thẻ', 'Card name'],
      field: 'customerCode',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ngày bắt đầu', 'Start date'],
      field: 'fullName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ngày hết hạn', 'Expire date'],
      field: 'customerClassName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Thời gian sử dụng', 'Used time'],
      field: 'birthDateString',
      type: 'date',
      align: 'center',
      width: 120
    },
    {
      caption: ['Thời gian gia hạn', 'EXTENSION PERIOD'],
      field: 'idNo',
      type: 'text',
      align: 'center',
      width: 150
    },
    {
      caption: ['Tổng thời gian', 'TOTAL TIME'],
      field: 'genderName',
      type: 'text',
      align: 'left',
      width: 100
    },
    {
      caption: ['Giá tiền', 'CARD PRICE'],
      field: 'address',
      type: 'text',
      align: 'left',
      width: 250
    },
  ]
}

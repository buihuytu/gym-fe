import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { BasePageListComponent, ICorePageListApiDefinition, IInOperator, ICoreTableColumnItem } from '../../../../libraries/base-page-list/base-page-list.component';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { HttpRequestService } from '../../../../services/http.service';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.scss'
})
export class ReportListComponent {

  listSysOtherListType: any[]=[];
  subscriptions: Subscription[] = [];

  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_OTHER_LIST_QUERY_LIST,
    deleteIds:api.SYS_OTHER_LIST_DELETE_IDS,
    exportExcel:  api.SYS_OTHER_LIST_EXPORT_EXCEL
  };
  title: string[] = ['Danh sách báo cáo', 'List Report'];
  currentIdType!:any;
  currentCodeType!:any;
  currentName!:any;
  otherListTypeOptions!:any[];
  otherListTypeOptionShow!:any[];
  searchType!:any;
  outerInOperators: IInOperator[] = [];
  showButtons: EnumBaseButton[] = [
    EnumBaseButton.PRINT,
  ]

  monthControl!:any;
  dayValidControl!:any;

  columns: ICoreTableColumnItem[] = [
    {
      caption: ['id', 'id'],
      field: 'id',
      hidden: true,
      type: 'text',
      align: 'left',
      width: 100
    },
  ]


  constructor(
    private httpService: HttpRequestService,
    public appLayoutService:AppLayoutService
  ){
  }
  
  getListOtherListTypes() {
    this.subscriptions.push(
      this.httpService.makeGetRequest('',api.SYS_OTHER_LIST_GET_LIST_BY_CODE+'REPORT_LIST').subscribe(x => {
        if (!!x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            const data = body.innerBody;
            this.otherListTypeOptions = data;
            this.otherListTypeOptionShow = data;
          }
        }
      })
    );
  }

  onSearchListType(e:any){
    if(this.searchType !== '' && this.searchType !== null){
      this.otherListTypeOptionShow = this.otherListTypeOptions.filter(x=> x.name.toString().toUpperCase().includes(this.searchType.toString().toUpperCase()));
    }else{
      this.otherListTypeOptionShow = this.otherListTypeOptions
    }
  }

  onSelectedListTypeChanged(e:any) {
    console.log(e);
    if(this.currentIdType == e.id) return;
    else{
      this.currentName = e.name;
      this.currentIdType = e.id;
      this.currentCodeType = e.code;
    }
  }
  visibleControl(){

  }

  ngOnInit(){
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.getListOtherListTypes();
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
  buttonHeaderClick(e:any){
    if(e === EnumBaseButton.PRINT){
      console.log(this.monthControl);
      console.log(this.dayValidControl);

      var param = {
        code: this.currentCodeType,
        name: this.currentName,
        month: this.monthControl,
        dayLeft: this.dayValidControl
      }

      this.subscriptions.push(
        this.httpService.makePostRequest('',api.EXPORT_REPORT_EXCEL, param).subscribe(x => {
          if (!!x.ok && x.status === 200) {
            const body = x.body;
            if (body.statusCode === 200) {
              const data = body.innerBody;
              console.log(data);
            }
          }
        })
      );
    }
    
  }
}

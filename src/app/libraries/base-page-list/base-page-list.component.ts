import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, isDevMode } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BasePageListService } from './base-page-list.service';
import { TooltipModule } from '../tooltip/tooltip.module';
import { EnumBaseButton } from '../../constants/headerButton/ButtonDefinitions';
import { CORE_VNS_BUTTONS } from '../../constants/headerButton/IButtonDefinitions';
import { FormsModule } from '@angular/forms';
import { PreLoaderComponent } from '../../layout/pre-loader/pre-loader.component';
import { AppConfigService } from '../../services/app-config.service';
import { BehaviorSubject, Subscription, filter } from 'rxjs';
import { defaultPaging, defaultPagingList } from '../../constants/defaultPaging';
import { AppLayoutService } from '../../layout/applayout/applayout.service';
import { DialogService } from '../../services/dialog.service';
import { HttpRequestService } from '../../services/http.service';
import { api } from '../../constants/api/apiDefinitions';
import { AlertService } from '../alert/alert.service';
export interface ICorePageListApiDefinition {
  queryListRelativePath: api;
  deleteIds?: api;
  toggleActiveIds?: api;
  toggleApproveIds?: api;
  toggleUnApproveIds?: api;
}

export interface ICoreTableColumnItem {
  caption: string[];
  field: string;
  type: string;
  align: string;
  width?: number;
  hidden?: boolean;
  templateRef?: TemplateRef<any>;
}
export interface IPagination {
  skip: number;
  take: number;
  page: number;
}
export interface IInOperator {
  field: string;
  values: any;
}
@Component({
  selector: 'app-base-page-list',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TooltipModule,
    FormsModule,
    PreLoaderComponent
  ],
  templateUrl: './base-page-list.component.html',
  styleUrl: './base-page-list.component.scss'
})
export class BasePageListComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() title!: string[];
  @Input() columns!: ICoreTableColumnItem[];
  @Input() apiDefinition!: ICorePageListApiDefinition;
  @Input() outerInOperators!: IInOperator[];
  @Input() outerParam$!: BehaviorSubject<any>;
  @Input() buttons!: EnumBaseButton[];
  @Input() fixedPageSize!: number;
  @Input() left!: TemplateRef<any>;
  @Input() hideHeader!: boolean;

  @Output() selectedIdsChange = new EventEmitter();

  filter$ = new BehaviorSubject<any>(null);
  inOperators$ = new BehaviorSubject<IInOperator[]>([]);
  subscriptions: Subscription[] = [];
  showButtons!: any[];
  headerCheckboxState!: any;
  data!: any[];
  tableHeight!: number;
  checkingModel: boolean[] = [];
  visibleColumns!: ICoreTableColumnItem[];
  innerBodyCount$ = new BehaviorSubject<number>(1);
  navigationLink!: any;
  selectedIds: any[]= [];
  language!: boolean;
  loading: boolean = true;
  displayPageCount: any[] = [];
  SizeChanger: any[] = defaultPagingList.take;
  selectedSize: number = defaultPaging.take;
  pagination$ = new BehaviorSubject<IPagination>({ skip: 0, take: this.selectedSize, page: 1 });
  /* start: passing this var to Pagination */

  pageCount!: number;

  // Passing BehaviorSubject to other component is like using a service (that holds this BehaviorSubject) injected to both components
  currentPage$ = new BehaviorSubject<number>(1);

  /* end: passing this var to Pagination */

  pageSize$ = new BehaviorSubject<number>(defaultPaging.take);
  pendingAction: any;

  constructor(
    private basePageListService: BasePageListService,
    public appConfig: AppConfigService,
    public appLayoutService: AppLayoutService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private httpService: HttpRequestService,
    private alertService: AlertService
  ) {
    this.language = this.appConfig.LANGUAGE;
  }
  ngOnDestroy(): void {
    this.subscriptions.map((subscription: Subscription) =>subscription.unsubscribe());
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageCount']) {
      if (this.pageCount !== undefined) {
        this.resolvePageCount();
      }
    }
    if (changes['outerInOperators']) {
      const currentInOperators: IInOperator[] = this.inOperators$.value;
      const changedInOperators: IInOperator[] = changes['outerInOperators'].currentValue || [];
      const remainInOperators = currentInOperators.filter(x => !!!changedInOperators.filter(y => y.field === x.field).length);
      const newInOperators = [...remainInOperators, ...changedInOperators];
      //const newInOperators = [...changedInOperators];
      this.inOperators$.next(newInOperators);
    }
    this.getDataForTable();
  }

  ngOnInit(): void {
    if (!!!this.columns) {
      console.log("NOT EXITS COLUMNS")
    }
    if (this.columns.filter((c: ICoreTableColumnItem) => c.field === 'id').length === 0 && isDevMode() && this.columns.length) {
      console.log("The columns must have one with 'field' property === 'id'")
    }
    this.visibleColumns = this.columns.filter((c: ICoreTableColumnItem) => !!!c.hidden)
    if (!!!this.visibleColumns.length && isDevMode() && this.columns.length) {
      console.log('first')
    }
    if (!!!this.buttons || this.buttons.length <= 0) {
      console.log("NOT EXITS BUTTONS")
    }
    var win_h = window.outerHeight;
    if (win_h > 0 ? win_h : screen.height) {
      this.tableHeight = win_h - 350;
    };
    this.appLayoutService.tableHeight = this.tableHeight;
    this.showButtons = CORE_VNS_BUTTONS.filter(x => this.buttons.includes(x.code));
    this.showButtons.sort((a, b) => a.order - b.order);
    this.onSizeChange(defaultPaging.take);
  }
  ngAfterViewInit(): void {
    if (!!this.fixedPageSize) {
      this.pageSize$ = new BehaviorSubject<number>(this.fixedPageSize);
      this.pagination$ = new BehaviorSubject<IPagination>({
        skip: 0,
        take: this.fixedPageSize,
        page: 1
      });
    } else {
      this.pageSize$ = new BehaviorSubject<number>(defaultPaging.take);
      this.pagination$ = new BehaviorSubject<IPagination>({
        skip: 0,
        take: defaultPaging.take,
        page: 1
      });
    }
    //this.getDataForTable();

    this.subscriptions.push( // outer-push
      this.dialogService.dialogConfirmed$.pipe(
        filter(i => !!!this.dialogService.busy && !!i?.confirmed)
      ).subscribe(() => {
        this.dialogService.resetService();
        switch (this.pendingAction) {
          case EnumBaseButton.DELETE:
            this.deleteObjectSelect();
            break;
          default:
            break;
        }
      }))
  }
  getDataForTable() {
    this.loading = true;
    setTimeout(() => {
      const url = this.apiDefinition.queryListRelativePath;
      let filter ={};
      this.inOperators$.value.map((value) =>{
        filter = {
          ...filter,
          [value.field]:value.values
        }
      });
      console.log(filter)
      const param = {
        ...this.pagination$.value,
        filter : filter,
      }
      console.log(param)
      this.subscriptions.push(
        this.basePageListService.queryList(url, param).pipe().subscribe(x => {
          if (!!x.ok && x.status === 200) {
            const body = x.body;
            if (body.statusCode === 200) {
              const data = body.innerBody.list;
              this.data = data;
              this.innerBodyCount$.next(body.innerBody.count);
            }
            this.loading = false;
          }
        })
      )
    })
  }
  onHeaderButtonClick(e: EnumBaseButton) {
    switch (e) {
      case EnumBaseButton.CREATE:
        this.router.navigate(
          [btoa('0')],
          {
            relativeTo: this.route.parent,
          }
        );
        break;
      case EnumBaseButton.EDIT:
        if (this.selectedIds.length === 0) return this.alertService.error('Chưa chọn bản ghi nào');
        if (this.selectedIds.length > 1) return this.alertService.warn('Chỉ chọn 1 bản ghi để thực hiện chỉnh sửa');
        this.router.navigate(
          [btoa(this.selectedIds[0].toString())],
          {
            relativeTo: this.route.parent,
          }
        );
        break;
      case EnumBaseButton.ACTIVATE:
        this.navigationLink = `/cms/test/${btoa('0')}`;
        break;
      case EnumBaseButton.INACTIVATE:
        this.navigationLink = `/cms/test/${btoa('0')}`;
        break;
      case EnumBaseButton.DELETE:
        this.pendingAction= EnumBaseButton.DELETE;
        if (this.selectedIds.length === 0) return this.alertService.error('Chưa chọn bản ghi nào');
        this.dialogService.busy = true;
        this.dialogService.showConfirmDialog$.next(true);
        this.dialogService.title$.next("XÁC NHẬN");
        this.dialogService.body$.next("Bạn có chắc chắn muốn xóa những đối tượng đã chọn?");
        this.dialogService.okButtonText$.next("Đồng ý");
        this.dialogService.cancelButtonText$.next("Quay lại");
        break;
      case EnumBaseButton.APPROVE:
        this.navigationLink = `/cms/test/${btoa('0')}`;
        break;
      default:
        break;
    }
  }
  toggleCheckAll(args: boolean) {
    const newCheckingModel: boolean[] = [];
    const newSelectedIds: any[] = [];
    const newSelectedData: any[] = [];

    this.data.map(item => {
      newCheckingModel.push(args);
      if (args) {
        newSelectedIds.push(item.id);
        newSelectedData.push(item);
      }
    });
    this.checkingModel = newCheckingModel;
    this.selectedIds = newSelectedIds;
    this.selectedIdsChange.emit(this.selectedIds);
  }
  onCheckingNgModelChange() {
    const newSelectedIds: number[] = [];
    const newSelectedData: any[] = [];
    this.data.filter((_: any, index: number) => !!this.checkingModel[index]).map(item => {
      newSelectedIds.push(item.id)
      newSelectedData.push(item)

    })
    this.selectedIds = newSelectedIds;
    this.selectedIdsChange.emit(this.selectedIds);
  }

  selectedIdChanges(e: any) {
    console.log(e)
  }

  onRowDoubleClick(e: any) {
    console.log(e)
  }
  onClickLocal(row: any, event: any) {
    if (event.detail === 1) {
    } else if (event.detail === 2) {
      this.router.navigate(
        [btoa(row.id)],
        {
          relativeTo: this.route.parent,
        }
      );
    }
  }
  onSizeChange(event: any) {
    this.pageSize$.next(event)
    this.pageCount = Math.ceil(this.innerBodyCount$.value / this.pageSize$.value);
    this.resolvePageCount();
    this.pagination$.next({ skip: 0, take: this.pageSize$.value, page: this.currentPage$.value })
    this.getDataForTable();
  }
  clickPageNumber(event: number) {
    if (event === this.currentPage$.value) {
      return;
    } else {
      this.currentPage$.next(event)
      this.pagination$.next({ skip: 0, take: this.pageSize$.value, page: this.currentPage$.value })
      this.getDataForTable();
    }

  }
  private resolvePageCount() {
    let arrayPageCount = this.chunkArray(this.pageCount, 4)
    this.displayPageCount = !!arrayPageCount.length ? arrayPageCount[0] : [];
    this.subscriptions.push(
      this.currentPage$.subscribe(x => {
        for (let i = 0; i < arrayPageCount.length; i++) {
          if (arrayPageCount[i].includes(this.currentPage$.value)) {
            this.displayPageCount = arrayPageCount[i]
          }
        }
      })
    )

  }
  chunkArray<T>(pageCount: number, chunkSize: number) {
    let array = Array.from({ length: pageCount }, (_, index) => index + 1)
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  deleteObjectSelect(){
    if(!this.apiDefinition.deleteIds!) return ;
    this.subscriptions.push(
      this.httpService.makePostRequest('create', this.apiDefinition.deleteIds!, {ids:this.selectedIds}).subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            this.alertService.success('Xóa thành công');
            this.getDataForTable();
            this.selectedIds = [];
            this.checkingModel =[];
            this.headerCheckboxState = false;
            if (isDevMode()) {
            }
          }
        } else {
          // this.onNotOk200Response(x);
        }
      })
    )
  }
}

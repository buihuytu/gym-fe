import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, TemplateRef, isDevMode } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BasePageListService } from './base-page-list.service';
import { TooltipModule } from '../tooltip/tooltip.module';
import { EnumBaseButton } from '../../constants/headerButton/ButtonDefinitions';
import { CORE_VNS_BUTTONS } from '../../constants/headerButton/IButtonDefinitions';
import { FormsModule } from '@angular/forms';
import { PreLoaderComponent } from '../../layout/pre-loader/pre-loader.component';
import { AppConfigService } from '../../services/app-config.service';
import { BehaviorSubject } from 'rxjs';
import { defaultPaging } from '../../constants/defaultPaging';
export interface ICorePageListApiDefinition {
  queryListRelativePath: string;
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
  page:number;
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
export class BasePageListComponent implements OnInit, AfterViewInit {
  @Input() title!: string[];
  @Input() columns!: ICoreTableColumnItem[];
  @Input() apiDefinition!: ICorePageListApiDefinition;
  @Input() buttons!: EnumBaseButton[];
  @Input() fixedPageSize!: number;


  showButtons!: any[];
  headerCheckboxState!:any;
  data!: any[];
  tableHeight!: number;
  checkingModel: boolean[] = [];
  visibleColumns!: ICoreTableColumnItem[];
  count!: number;
  navigationLink!: any;
  selectedIds!: any[];  
  language!:boolean;
  loading: boolean = true;

  pagination$!: BehaviorSubject<IPagination>;
  /* start: passing this var to Pagination */

  pageCount!: number;

  // Passing BehaviorSubject to other component is like using a service (that holds this BehaviorSubject) injected to both components
  currentPage$ = new BehaviorSubject<number>(1);

  /* end: passing this var to Pagination */

  pageSize$!: BehaviorSubject<number>;

  constructor(
    private basePageListService: BasePageListService,
    public appConfig: AppConfigService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.language = this.appConfig.LANGUAGE;
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
    this.showButtons = CORE_VNS_BUTTONS.filter(x => this.buttons.includes(x.code));
    this.showButtons.sort((a, b) => a.order - b.order);
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


    this.loading = true;
    setTimeout(() => {
      const url = this.apiDefinition.queryListRelativePath;
      this.basePageListService.queryList(url, this.pagination$.value).pipe().subscribe(x => {
        if (!!x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            const data = body.innerBody.list;
            this.data = data;
            this.count = body.innerBody.count;
          }
          this.loading=false;
        }
      });
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
        if(this.selectedIds.length === 0) return console.log('1');
        if(this.selectedIds.length > 1) return console.log('2')
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
        this.navigationLink = `/cms/test/${btoa('0')}`;
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
    console.log(newSelectedIds)
  }
  onCheckingNgModelChange() {
    const newSelectedIds: number[] = [];
    const newSelectedData: any[] = [];
    this.data.filter((_: any, index: number) => !!this.checkingModel[index]).map(item => {
      newSelectedIds.push(item.id)
      newSelectedData.push(item)
      
    })
    this.selectedIds = newSelectedIds;
  }

  selectedIdChanges(e:any){
    console.log(e)
  }
}

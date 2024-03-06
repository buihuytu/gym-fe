import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, TemplateRef, isDevMode } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BasePageListService } from './base-page-list.service';
import { TooltipModule } from '../tooltip/tooltip.module';
import { EnumBaseButton } from '../../constants/headerButton/ButtonDefinitions';
import { CORE_VNS_BUTTONS } from '../../constants/headerButton/IButtonDefinitions';
export interface ICorePageListApiDefinition {
  queryListRelativePath: string;
}

export interface ICoreTableColumnItem {
  caption: string;
  field: string;
  type: string;
  align: string;
  width?: number;
  hidden?: boolean;
  templateRef?: TemplateRef<any>;
}

@Component({
  selector: 'app-base-page-list',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TooltipModule,
  ],
  templateUrl: './base-page-list.component.html',
  styleUrl: './base-page-list.component.scss'
})
export class BasePageListComponent implements OnInit, AfterViewInit {
  @Input() title!: string;
  @Input() columns!: ICoreTableColumnItem[];
  @Input() apiDefinition!: ICorePageListApiDefinition;
  @Input() buttons!: EnumBaseButton[];

  showButtons!: any[];
  data!: any[];
  visibleColumns!: ICoreTableColumnItem[];
  count!: number;
  navigationLink!: any;

  constructor(
    private basePageListService: BasePageListService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.navigationLink = `/cms/test/${btoa('0')}`;
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
    this.showButtons = CORE_VNS_BUTTONS.filter(x => this.buttons.includes(x.code));
    this.showButtons.sort((a, b) => a.order - b.order);
    console.log(this.showButtons)
    // switchMap((x) => {
    //   // this.loading = true;

    // })
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const url = this.apiDefinition.queryListRelativePath;
      this.basePageListService.queryList(url, 'x').pipe().subscribe(x => {
        if (!!x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            const data = body.innerBody.list;
            this.data = data;
            this.count = body.innerBody.count;
          }
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
        this.navigationLink = `/cms/test/${btoa('0')}`;
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
}

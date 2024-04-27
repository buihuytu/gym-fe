import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { api } from '../../constants/api/apiDefinitions';
import { BaseComponent } from '../base-component/base-component.component';
import { Subscription } from 'rxjs';
import { HttpRequestService } from '../../services/http.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-base-checklist',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './base-checklist.component.html',
  styleUrl: './base-checklist.component.scss'
})
export class CheckListComponent implements BaseComponent, OnChanges {
  @Input() apiGetOptions!: string;
  @Input() getByIdOptions!: any;
  @Output() valueChange = new EventEmitter;
  
  subscriptions: Subscription[] =[];
  data: any[]=[];
  dataShow: any[]=[];

  showOptions:boolean = false;
  holderText:string ='';
  /**
   *
   */
  selected: boolean = false;
  selectedId!: any;
  selectedIds: any[] = [];
  checkingModel: boolean[] = [];
  constructor(
    private httpService: HttpRequestService,
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getByIdOptions']) {
      this.selectedId = changes['getByIdOptions'].currentValue;
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if(!!this.apiGetOptions && this.apiGetOptions !== ''){
        this.subscriptions.push(
          this.httpService.makeGetRequest('get', this.apiGetOptions).pipe().subscribe((x)=>{
            if(!!x.ok && x.status =='200'){
              const body = x.body;
              if(body.statusCode == '200'){
                const data = body.innerBody;
                this.data = data;
                this.dataShow = data;
              }
            }
          })
        )
      }
    })
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptions.map((subscription)=> subscription.unsubscribe())
  }
  onSelectedIds(e:any){
    this.checkingModel[e] =!this.checkingModel[e];
    this.onCheckingNgModelChange();
  }
  onCheckingNgModelChange() {
    const newSelectedIds: number[] = [];
    const newSelectedData: any[] = [];
    const newHolder: string[] = [];
    this.data.filter((_: any, index: number) => !!this.checkingModel[index]).map(item => {
      newSelectedIds.push(item.id)
      newHolder.push(item.name)
      newSelectedData.push(item)
    })
    this.holderText = newSelectedIds.length == this.data.length ? 'Tất cả': newHolder.join('; ')
    this.selectedIds = newSelectedIds;
    this.valueChange.emit(this.selectedIds);
  }
  onShowOptions(){
    this.showOptions =true;
  }
  onBlur(){
    console.log('ssss')
    this.showOptions =false;
  }
  onUnselectedIds(){
    this.selectedId = null;
    this.valueChange.emit(this.selectedId)
  }
}

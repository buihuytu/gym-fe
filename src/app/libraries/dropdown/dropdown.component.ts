import { Component, EventEmitter, Input, Output } from '@angular/core';
import { api } from '../../constants/api/apiDefinitions';
import { BaseComponent } from '../base-component/base-component.component';
import { Subscription } from 'rxjs';
import { HttpRequestService } from '../../services/http.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent implements BaseComponent {
  @Input() apiGetOptions!: string;
  @Output() valueChange = new EventEmitter;
  
  subscriptions: Subscription[] =[];
  data: any[]=[];
  dataShow: any[]=[];
  /**
   *
   */
  selected: boolean = false;
  selectedId!: any;
  constructor(
    private httpService: HttpRequestService,
  ) {
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
    this.selectedId = e.id;
    this.valueChange.emit(this.selectedId)
  }
  onUnselectedIds(){
    this.selectedId = null;
    this.valueChange.emit(this.selectedId)
  }
}

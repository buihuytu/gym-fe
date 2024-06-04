import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, isDevMode } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, filter, debounceTime, map } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { IAuthData } from '../../../../interfaces/IAuthData';
import { IFormatedResponse } from '../../../../interfaces/IFormatedResponse';
import { IAlertOptions } from '../../../../libraries/alert/alert.component';
import { AlertService } from '../../../../libraries/alert/alert.service';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseTabsComponent } from '../../../../libraries/base-tabs/base-tabs.component';
export interface ILocalDataItem {
  timePoint1?: string;
  timePoint4?: string;
  late?: number;
  status?: string;
  offRegistered?: boolean;
  manualCode?: string;
  codeLoc: string;
  currentMonth?: boolean;
  dateValue: Date;
}

export interface ILocalDataRow {
  items: ILocalDataItem[];
  mixed: boolean;
}


@Component({
  selector: 'app-locker-status',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BaseTabsComponent
  ],
  templateUrl: './locker-status.component.html',
  styleUrl: './locker-status.component.scss'
})
export class LockerStatusComponent extends BaseComponent implements OnInit, AfterViewInit {
  title: string[]=['Trạng thái tủ','Locker status'];
  day!: Date;
  arrAttendant!: any[];
  isRequired: boolean = false;
  standardNumber: number = 0;
  realAtNumber: number = 0;
  paidAtNumber: number = 0;
  paidLeaveNumber: number = 0;
  notPaidLeaveNumber: number = 0;
  tardinessEarlyNumber: number = 0;
  loadingExport: boolean = false;
  standard = '';
  actualWork = '';
  salCalculator = '';
  paidLeave = '';
  unpaidLeave = '';
  leaveEarly = '';
  overtime = '';
  work = '';
  onLeave = '';
  missingAtendance = '';
  tardinessEarly = '';
  dataChange = '';
  holiday = '';
  explaintionDay = '';
  typeOfWork = '';
  reason = '';
  btnSend = '';
  btnShow = '';
  totalOt: number = 0;
  //buttonItems: EnumCoreButtonVNSCode[] = [EnumCoreButtonVNSCode.SEND];
  isExplanationShown!: boolean;
  isSenBtn!: boolean;
  reasonText!: string;
  lateText!: any;
  comebackOutText!: any;
  employeeId!: number;
  disabled: boolean = true;
  //symbolTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  symbolTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  symbolType!: number;
  explainDate!: Date;
  // override lang = 'vi';
  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {
    super();
  }
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 3000,
  };
  late!: number;
  comebackOut!: number;

  data$ = new BehaviorSubject<ILocalDataRow[]>([
    {
      items: [
        {
          codeLoc: 'LOC001',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC002',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC003',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC004',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC005',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC006',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC007',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC008',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'U',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC009',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'U',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC010',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
      ],
      mixed: false,
    },
    {
      items: [
        {
          codeLoc: 'LOC011',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC012',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC013',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC014',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC015',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC016',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC017',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC018',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC019',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'U',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC020',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'U',
          offRegistered: false,
        },
      ],
      mixed: false,
    },
    {
      items: [
        {
          codeLoc: 'LOC021',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'U',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC022',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'U',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC023',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'U',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC024',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'U',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC025',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'U',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC026',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC027',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'M',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC028',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'M',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC029',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
        {
          codeLoc: 'LOC030',
          dateValue: new Date,
          timePoint1: '',
          timePoint4: '',
          late: 0,
          status: 'E',
          offRegistered: false,
        },
      ],
      mixed: false,
    }
  ]);
  currentMonthText!: string;
  currentYear!: number; // calculated base on currentMonth$
  headerWeekdays!: string[];
  cellHeight: number = 120;
  monthPickerActive: boolean = false;
  yearPickerActive: boolean = false;
  resizeStream$!: Observable<any>;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('calendarContainer') calendarContainer!: ElementRef;
  @ViewChild('calendarBody') calendarBody!: ElementRef;
  override ngOnInit(): void {
    this.resizeStream$ = fromEvent(window, 'resize');
    this.isExplanationShown = true;
    this.authService.data$.subscribe((x: IAuthData | null) => (this.employeeId = x?.employeeId!));
  }

  private setCss(): void {
    const rect = this.calendarContainer.nativeElement.getBoundingClientRect();
    const cellWidth = (rect.width - 6 * 70) / 7;
    this.container.nativeElement.style.setProperty('--calendar-width', rect.width + 'px');
    this.container.nativeElement.style.setProperty('--spot-height', cellWidth + 'px');
    this.container.nativeElement.style.setProperty('--spot-width', cellWidth + 'px');
  }

  override ngAfterViewInit(): void {
    const rect = this.calendarContainer.nativeElement.getBoundingClientRect();
    const cellWidth = (rect.width - 6 * 70) / 7;
    console.log(cellWidth)
    const cellHeight = cellWidth;

    // if (rect.width < 768) {
    this.data$.pipe(filter((x) => !!x.length)).subscribe((x) => {
      setTimeout(() => {
        this.container.nativeElement.style.setProperty('--spot-height', cellWidth + 'px');
        this.container.nativeElement.style.setProperty('--calendar-width', rect.width + 'px');
        this.container.nativeElement.style.setProperty('--calendar-body-height', x.length * cellHeight + 'px');
        const el = this.calendarBody.nativeElement;
        el.classList.remove('fade-in');
        el.offsetWidth;
        el.classList.add('fade-in');
        this.setCss();
      });
    });

    setTimeout(() => {
      this.setCss();
      this.subscriptions.push(
        this.resizeStream$.pipe(debounceTime(100)).subscribe((x) => {
          this.setCss();
        }),
      );

      this.subscriptions.push(
        // this.currentMonth$.pipe(filter((x) => !!x)).subscribe((x) => {
        //   this.currentMonthText = this.coreDatetimeService.getMonthText(this.lang, x.monthIndex);
        //   const equivalent = new Date(x.year, x.monthIndex);
        //   this.currentYear = equivalent.getFullYear();
        //   const year = equivalent.getFullYear();
        //   const monthIndex = equivalent.getMonth();
        //   const calendarData: ICalendarBody = this.coreDatetimeService.getCalendarBody(year, monthIndex);
        //   this.timeAttendanceMockupService.emitateOverviewData(calendarData, { year, monthIndex }).subscribe((x) => {
        //     this.data$.next(x);
        //   });
        // }),
      );
    });
    this.getInfobyMonth();
  }

  goBackward() {
    // if (this.currentMonth$.value.monthIndex - 1 < 0) {
    //   this.currentMonth$.next({
    //     year: this.currentMonth$.value.year - 1,
    //     monthIndex: 11,
    //   });
    // } else {
    //   this.currentMonth$.next({
    //     year: this.currentMonth$.value.year,
    //     monthIndex: this.currentMonth$.value.monthIndex - 1,
    //   });
    // }
    this.getInfobyMonth();
  }
  goForeward() {
    // if (this.currentMonth$.value.monthIndex + 1 > 11) {
    //   this.currentMonth$.next({
    //     year: this.currentMonth$.value.year + 1,
    //     monthIndex: 0,
    //   });
    // } else {
    //   this.currentMonth$.next({
    //     year: this.currentMonth$.value.year,
    //     monthIndex: this.currentMonth$.value.monthIndex + 1,
    //   });
    // }

    this.getInfobyMonth();
  }
  getInfobyMonth() {
    // this.appService
    //   .post('/api/PortalAtTimeTimesheetDaily/GetInfoByMonth', {
    //     employeeId: this.authService.data$.value?.employeeId,
    //     year: this.currentMonth$.value.year,
    //     monthIndex: this.currentMonth$.value.monthIndex,
    //     lastDay: 20,
    //   })
    //   .subscribe((x) => {
    //     if (x.ok && x.status === 200) {
    //       const body = x.body;
    //       if (body.statusCode === 200) {
    //         this.standardNumber = body.innerBody.standard;
    //         this.realAtNumber = body.innerBody.realAt;
    //         this.paidAtNumber = body.innerBody.paidAt;
    //         this.paidLeaveNumber = body.innerBody.paidLeave;
    //         this.notPaidLeaveNumber = body.innerBody.notPaidLeave;
    //         this.tardinessEarlyNumber = body.innerBody.tardinessEarly;
    //       }
    //     }
    //   });
  }


  // onMonthObjectChange(e: IMonthIdentity) {
  //   this.currentMonth$.next(e);
  //   this.monthPickerActive = false;
  //   console.log(e);
  //   this.getInfobyMonth();
  // }

  onMonthPickerYearClick(e: number) {
    this.monthPickerActive = false;
    this.yearPickerActive = true;
    console.log(e);
  }

  onYearPickerChange(e: number) {
    // this.currentMonth$.next({
    //   year: e,
    //   monthIndex: this.currentMonth$.value.monthIndex,
    // });
    this.monthPickerActive = true;
    this.yearPickerActive = false;
  }

  onButtonClick(e: any) { }

  onSymbolTypeChange(symbolType: number) {
    this.symbolType = symbolType;
  }

  showExplanation() {
    this.isSenBtn = true;
    // this.subscriptions.push(
    //   this.appService.get(api.AT_TIME_TIMESHEET_DAILY_GET_LIST_SYMBOL_TYPE).subscribe((x) => {
    //     if (x.ok && x.status === 200) {
    //       const body: IFormatedResponse = x.body;
    //       if (body.statusCode === 200) {
    //         const optons: { value: number; text: string }[] = [];
    //         body.innerBody.map((y: any) => {
    //           optons.push({
    //             value: y.id,
    //             text: '[' + y.code + ']' + ' ' + y.name,
    //           });
    //         });
    //         this.symbolTypeOptions$.next(optons);
    //       }
    //     }
    //   }),
    // );
    this.isExplanationShown = false;
  }

  clickExplanation(item: any, e: any) {
    this.explainDate = item.dateValue;
    this.lateText = null;
    this.comebackOutText = null;
    const warningDiv = item?.manualCode === 'T';
    this.isSenBtn = false;
    let date = item?.date;
    if (item.manualCode === "" || !!!item?.currentMonth) {
      return;
    }
    if (warningDiv) {
      this.isExplanationShown = true;
    //   this.subscriptions.push(
    //     this.currentMonth$.pipe(filter((x) => !!x)).subscribe((x) => {
    //       this.day = new Date(x.year, x.monthIndex, date);
    //       this.appService
    //         .post(api.AT_TIME_TIMESHEET_DAILY_GET_ATTANDENT_BY_DAY, {
    //           employeeId: this.employeeId,
    //           year: x.year,
    //           monthIndex: x.monthIndex,
    //           date,
    //         })
    //         .pipe(
    //           map((x: any) => {
    //             return x.body.innerBody;
    //           }),
    //         )
    //         .subscribe((response) => {
    //           this.arrAttendant = response.info;
    //           this.late = response.late;
    //           this.comebackOut = response.comebackOut;
    //           this.totalOt = response.totalOt;
    //           console.log(this.arrAttendant);
    //         });
    //     }),
    //   );
    // } else {
    //   this.isExplanationShown = false;
    //   this.isSenBtn = false;
    //   this.subscriptions.push(
    //     this.currentMonth$.pipe(filter((x) => !!x)).subscribe((x) => {
    //       this.day = new Date(x.year, x.monthIndex, date);
    //       this.appService
    //         .post(api.AT_TIME_TIMESHEET_DAILY_GET_ATTANDENT_BY_DAY, {
    //           employeeId: this.employeeId,
    //           year: x.year,
    //           monthIndex: x.monthIndex,
    //           date,
    //         })
    //         .pipe(
    //           map((x: any) => {
    //             return x.body.innerBody;
    //           }),
    //         )
    //         .subscribe((response) => {
    //           this.arrAttendant = response.info;
    //           this.late = response.late;
    //           this.comebackOut = response.comebackOut;
    //         });
    //     })!,
    //   );
    }
  }

  sendExplainTime(e: any) {

    if (((this.late > 0 && this.lateText == null) || (this.comebackOut > 0 && this.comebackOutText == null)) && this.arrAttendant[0].valin1 !== null && this.arrAttendant[0].valin4 !== null) {
      this.isRequired = true;
      return;
    }
    this.loadingExport = true;
    // this.subscriptions.push(
    //   this.appService
    //     .post(api.PORTAL_REGISTER_OFF_CREATE, {
    //       employeeId: this.employeeId,
    //       workingDay: this.explainDate,
    //       dateStart: this.explainDate,
    //       dateEnd: this.explainDate,
    //       note: this.reasonText,
    //       typeCode: 'EXPLAINWORK',
    //       timeTypeId: this.symbolType,
    //       timeLate: this.lateText,
    //       timeEarly: this.comebackOutText,
    //       typeId: this.lateText > 0 || this.comebackOutText > 0 ? 1 : 0,
    //     })
    //     .subscribe((x: any) => {
    //       if (x.ok && x.status === 200) {
    //         const body: IFormatedResponse = x.body;
    //         if (body.statusCode === 200) {
    //           this.alertService.success(`${this.mls.trans(x.body.messageCode)}`, this.alertOptions);
    //           this.symbolType = 0;
    //           this.late = 0;
    //           this.comebackOut = 0;
    //           this.arrAttendant = [];
    //           this.isRequired = false;
    //           this.reasonText = '';
    //           this.totalOt = 0;
    //         } else {
    //           this.alertService.warn(`${this.mls.trans(x.body.messageCode)}`, this.alertOptions);
    //           if (isDevMode()) this.responseService.resolve(body);
    //         }
    //       } else {
    //         if (isDevMode()) {
    //           this.alertService.error(JSON.stringify(x, null, 2), this.alertOptions);
    //         }
    //       }
    //       this.loadingExport = false;
    //     }),
    // );
  }
}
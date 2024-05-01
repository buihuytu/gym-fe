import { AfterViewInit, Component, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginInterface } from './login.interface';
import { AppConfigService } from '../../services/app-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../libraries/alert/alert.service';
import { IClientLoginRequest } from '../../interfaces/IClientLoginRequest';
import { IAuthData } from '../../interfaces/IAuthData';
import { IFormatedResponse } from '../../interfaces/IFormatedResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  
  form: FormGroup;
  passwordInputType: string = 'password';
  subscriptions: Subscription[] = [];
  showPassword: boolean = false;
  model: LoginInterface = new LoginInterface();
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public appConfigService: AppConfigService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) {

    this.form = this.fb.group({
      username: this.fb.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {
    debugger
    this.subscriptions.push(
      this.authService
        .userLogin(this.form.getRawValue() as IClientLoginRequest)
        .subscribe((x) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            //this.responseService.resolve(body)
            if (body.statusCode === 200) {
              const newAuthData: IAuthData = {
                ...body.innerBody,
                loginTime: new Date().getTime(),
              };
              this.authService.data$.next(newAuthData);
              this.alertService.success('Đăng nhập thành công');
              this.router.navigate(['/home']);
            } else {
              this.alertService.info(
                x.body.messageCode
              );
            }
          } else {
            if (isDevMode()) {
              //this.alertService.error(JSON.stringify(x, null, 2), noneAutoClosedAlertOptions);
            } else {
              this.alertService.info('Login failed');
            }
          }
        })
    );    
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? 'text' : 'password';
  }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => {
      if (x) x.unsubscribe();
    });
  }

}

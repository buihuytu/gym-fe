import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {

  /* This BASE_URL will be red from assets/app-config/app.config.json */
  BASE_URL!: string;
  LANGUAGE!: boolean; // default language false => vn - true => en
  /********************************************************************/


  constructor() {}
}

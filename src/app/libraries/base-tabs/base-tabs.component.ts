import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from '../tooltip/tooltip.module';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'base-tabs',
  standalone: true,
  imports: [
    CommonModule,
    TooltipModule,
    FormsModule,
  ],
  templateUrl: './base-tabs.component.html',
  styleUrl: './base-tabs.component.scss'
})
export class BaseTabsComponent {
  @Input() title!: string[];
  @Input() headers!: string[];
  @Input() contents!: TemplateRef<any>[] | null;


  language!: boolean;

  constructor(
    public appConfig: AppConfigService,
  ) {
    this.language = this.appConfig.LANGUAGE;
  }
}

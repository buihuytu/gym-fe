import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-base-component',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './base-component.component.html',
  styleUrl: './base-component.component.css'
})
export class BaseComponent implements OnDestroy{
  subscriptions: Subscription[] = [];

  constructor(
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
  }
}

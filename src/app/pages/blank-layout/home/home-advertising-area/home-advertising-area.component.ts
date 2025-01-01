import { Component } from '@angular/core';
import { BlueLineComponent } from '../../../../shared/components/blue-line/blue-line.component';
import { AdvertisingAreaComponent } from '../../../../shared/components/advertising-area/advertising-area.component';

@Component({
  selector: 'app-home-advertising-area',
  standalone: true,
  imports: [BlueLineComponent, AdvertisingAreaComponent],
  templateUrl: './home-advertising-area.component.html',
  styleUrl: './home-advertising-area.component.scss',
})
export class HomeAdvertisingAreaComponent {}

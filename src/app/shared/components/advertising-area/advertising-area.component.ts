import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-advertising-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advertising-area.component.html',
  styleUrl: './advertising-area.component.scss',
})
export class AdvertisingAreaComponent {
  @Input() positionClasses: string = '';
}

import { Component } from '@angular/core';
import { AdvertisingAreaComponent } from '../../../../shared/components/advertising-area/advertising-area.component';

@Component({
  selector: 'app-related-content',
  standalone: true,
  imports: [AdvertisingAreaComponent],
  templateUrl: './related-content.component.html',
  styleUrl: './related-content.component.scss',
})
export class RelatedContentComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlankNavbarComponent } from '../../../core/components/blank-navbar/blank-navbar.component';
import { AdvertisingAreaComponent } from '../../../shared/components/advertising-area/advertising-area.component';
import { LastBannerComponent } from './last-banner/last-banner.component';
import { RelatedContentComponent } from './related-content/related-content.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    BlankNavbarComponent,
    AdvertisingAreaComponent,
    RelatedContentComponent,
    LastBannerComponent,
    RouterOutlet,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {}

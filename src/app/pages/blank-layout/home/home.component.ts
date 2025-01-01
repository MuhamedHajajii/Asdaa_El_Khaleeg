import { Component } from '@angular/core';
import { BlankNavbarComponent } from '../../../core/components/blank-navbar/blank-navbar.component';
import { HeroComponent } from './hero/hero.component';
import { HomeBannerComponent } from './hero/home-banner/home-banner.component';
import { HomeAdvertisingAreaComponent } from './home-advertising-area/home-advertising-area.component';
import { HomeArticlesComponent } from './home-articles/home-articles.component';
import { HomeInvestigationsComponent } from './home-investigations/home-investigations.component';
import { HomeLocalNewsComponent } from './home-local-news/home-local-news.component';
import { HomeNewsComponent } from './home-news/home-news.component';
import { HomeSecondAdvertisingBannerComponent } from './home-second-advertising-banner/home-second-advertising-banner.component';
import { HomeVideosComponent } from './home-videos/home-videos.component';
import { NationalNewsComponent } from './national-news/national-news.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    HomeAdvertisingAreaComponent,
    HomeArticlesComponent,
    HomeInvestigationsComponent,
    HomeLocalNewsComponent,

    HomeVideosComponent,
    HomeSecondAdvertisingBannerComponent,
    HomeBannerComponent,
    HomeNewsComponent,
    BlankNavbarComponent,
    NationalNewsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

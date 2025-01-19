import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
import { isPlatformBrowser } from '@angular/common';

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
export class HomeComponent {
  constructor(
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private metaService: Meta,
    private titleService: Title
  ) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (window.location.href) {
        const canonicalUrl = window.location.href;

        // ✅ Find and remove existing canonical tag
        const existingCanonical = document.querySelector(
          'link[rel="canonical"]'
        );
        if (existingCanonical) {
          existingCanonical.remove();
        }

        // ✅ Add the new canonical tag
        this.metaService.addTag({ rel: 'canonical', href: canonicalUrl });
      }

      this.metaService.updateTag({
        name: 'description',
        content:
          'صحيفة أصداء الخليج | صحيفة سعودية مرخصة .. رئيس تحريرها سلمان بن أحمد العيد ج',
      });
      this.titleService.setTitle(
        'صحيفة أصداء الخليج | صحيفة سعودية مرخصة .. رئيس تحريرها سلمان بن أحمد العيد '
      );
    }
  }
}

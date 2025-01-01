import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IBlog } from '../../../../core/interfaces/IBlog';
import { CategoriesService } from '../../../../core/services/content/categories.service';
import { AdvertisingAreaComponent } from '../../../../shared/components/advertising-area/advertising-area.component';
import { HomeVideosComponent } from '../../home/home-videos/home-videos.component';
import { LastBannerComponent } from '../last-banner/last-banner.component';
import { RelatedContentComponent } from '../related-content/related-content.component';
import { BlankNavbarComponent } from '../../../../core/components/blank-navbar/blank-navbar.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    DatePipe,
    AdvertisingAreaComponent,
    RelatedContentComponent,
    HomeVideosComponent,
    LastBannerComponent,
    BlankNavbarComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  currentId!: string;
  IBlogs!: IBlog;

  constructor(
    private _CategoriesService: CategoriesService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Handle the active route on reload
    this.getInitialId();

    // Handle dynamic navigation changes
    this._Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentId = event.url.split('/').reverse()[0];
        console.log('Active Route ID (NavigationEnd):', this.currentId);
        if (this.currentId.length > 3) {
          this.getCurrentBlog(this.currentId);
        }
      }
    });
  }

  getInitialId(): void {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.currentId = id;
      console.log('Active Route ID (Reload):', this.currentId);
      this.getCurrentBlog(this.currentId);
    }
  }

  getCurrentBlog(blogId: string): void {
    this._CategoriesService.getBlogById(blogId).subscribe({
      next: (response) => {
        console.log(response);
        this.IBlogs = response;
      },
      error: (err) => console.error('Error fetching category:', err),
    });
  }
}

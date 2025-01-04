import { CategoriesService } from './../../../../core/services/content/categories.service';
import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ISliderHome } from '../../../../core/interfaces/slider/ISliderHome';
import { StringSlicePipe } from '../../../../core/pipes/string-slice.pipe';
import { HomeContentService } from '../../../../core/services/content/home/home-content.service';
import { Router, RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CarouselModule,
    StringSlicePipe,
    RouterLink,
    NgxSkeletonLoaderModule,
    SafeHtmlPipe,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  sliderData!: ISliderHome;

  constructor(
    private _Router: Router,
    private _HomeContentService: HomeContentService,
    private _CategoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getSliderData();
  }

  getSliderData() {
    this._HomeContentService.getHomeSlider().subscribe({
      next: (response) => {
        console.log(response);
        this.sliderData = response;
      },
    });
  }

  onClickGetLastEditorNewsId(): void {
    this._CategoriesService.getEditorBlog().subscribe({
      next: (response) => {
        console.log(response);
        this._Router.navigate([`/details`, response.blogs[0].post_id]);
      },
    });
  }

  /** Carousel Options */
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    // margin: 15,
    dots: true,
    rtl: true,
    autoplay: true,
    autoplaySpeed: 500,
    navSpeed: 700,
    items: 1,
    // rewind: true,
    nav: false,
  };
}

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ISliderHome } from '../../../../core/interfaces/slider/ISliderHome';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';
import { StringSlicePipe } from '../../../../core/pipes/string-slice.pipe';
import { HomeContentService } from '../../../../core/services/content/home/home-content.service';
import { CategoriesService } from './../../../../core/services/content/categories.service';
import { ISpecificCategory } from '../../../../core/interfaces/ISpecificCategory';

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

  masterBlog!: any;

  constructor(
    private _Router: Router,
    private _HomeContentService: HomeContentService,
    private _CategoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getSliderData();
    this.onClickGetLastEditorNewsId();
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
        if (response.blogs) {
          this.masterBlog = response;
        }
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

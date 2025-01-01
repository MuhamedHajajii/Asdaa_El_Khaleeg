import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ISliderHome } from '../../../../core/interfaces/slider/ISliderHome';
import { StringSlicePipe } from '../../../../core/pipes/string-slice.pipe';
import { HomeContentService } from '../../../../core/services/content/home/home-content.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CarouselModule, StringSlicePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  sliderData!: ISliderHome;

  constructor(private _HomeContentService: HomeContentService) {}

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

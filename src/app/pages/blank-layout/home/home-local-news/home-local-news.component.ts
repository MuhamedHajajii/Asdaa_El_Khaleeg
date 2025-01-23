import { CommonModule, SlicePipe } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ISpecificCategory } from '../../../../core/interfaces/ISpecificCategory';
import { HijriDatePipe } from '../../../../core/pipes/date-hijri.pipe';
import { StringSlicePipe } from '../../../../core/pipes/string-slice.pipe';
import { HomeContentService } from '../../../../core/services/content/home/home-content.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterLink } from '@angular/router';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';
import { ImagesSrcPipe } from '../../../../core/pipes/images-src.pipe';

@Component({
  selector: 'app-home-local-news',
  standalone: true,
  imports: [
    StringSlicePipe,
    SlicePipe,
    HijriDatePipe,
    NgxSkeletonLoaderModule,
    RouterLink,
    SafeHtmlPipe,
    ImagesSrcPipe,
    CommonModule,
  ],
  templateUrl: './home-local-news.component.html',
  styleUrl: './home-local-news.component.scss',
})
export class HomeLocalNewsComponent {
  localNews!: ISpecificCategory;
  sliceNumber = 3;
  sectionTitle = 'الأخبار المحلية';
  isShowSkeleton = true;
  @ViewChildren('toggleButtons') toggleButtons!: QueryList<ElementRef>;
  constructor(private _HomeContentService: HomeContentService) {}

  ngOnInit(): void {
    this.getLocalNews();
  }

  getLocalNews() {
    this.isShowSkeleton = true;
    this.sliceNumber = 1;
    this._HomeContentService.getHomeLocalNews().subscribe({
      next: (response) => {
        this.localNews = response;
        this.sectionTitle = 'الأخبار المحلية';
        this.isShowSkeleton = false;
      },
    });
  }
  getRandomNews() {
    this.isShowSkeleton = true;
    this.sliceNumber = 4;
    this._HomeContentService.getHomeRandomNews().subscribe({
      next: (response) => {
        this.localNews = response;
        this.sectionTitle = 'أخبار متنوعة';
        this.isShowSkeleton = false;
      },
    });
  }
  toggleButtonsHandler(element: HTMLElement) {
    this.toggleButtons.forEach((button) => {
      button.nativeElement.classList.remove('btn-main');
      button.nativeElement.classList.add('bg-white');
    });
    element.classList.add('btn-main');
  }
}

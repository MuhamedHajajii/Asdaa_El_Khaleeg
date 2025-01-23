import { Component } from '@angular/core';
import { StaticCategoriesService } from '../../../../core/services/content/static-categories.service';
import { ISpecificCategory } from '../../../../core/interfaces/ISpecificCategory';
import { SlicePipe } from '@angular/common';
import { StringSlicePipe } from '../../../../core/pipes/string-slice.pipe';
import { HomeContentService } from '../../../../core/services/content/home/home-content.service';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ImagesSrcPipe } from '../../../../core/pipes/images-src.pipe';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-home-articles',
  standalone: true,
  imports: [
    SlicePipe,
    StringSlicePipe,
    RouterLink,
    NgxSkeletonLoaderModule,
    ImagesSrcPipe,
    SafeHtmlPipe,
  ],
  templateUrl: './home-articles.component.html',
  styleUrl: './home-articles.component.scss',
})
export class HomeArticlesComponent {
  specificCategory!: ISpecificCategory;
  constructor(private _HomeContentService: HomeContentService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this._HomeContentService.getHomeArticles().subscribe({
      next: (response) => {
        this.specificCategory = response;
      },
    });
  }
}

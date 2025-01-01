import { Component } from '@angular/core';
import { StaticCategoriesService } from '../../../../core/services/content/static-categories.service';
import {
  IBlog,
  IBlogs,
  ISpecificCategory,
} from '../../../../core/interfaces/ISpecificCategory';
import { StringSlicePipe } from '../../../../core/pipes/string-slice.pipe';
import { DatePipe, SlicePipe } from '@angular/common';
import { HomeContentService } from '../../../../core/services/content/home/home-content.service';

@Component({
  selector: 'app-home-local-news',
  standalone: true,
  imports: [StringSlicePipe, SlicePipe, DatePipe],
  templateUrl: './home-local-news.component.html',
  styleUrl: './home-local-news.component.scss',
})
export class HomeLocalNewsComponent {
  localNews!: ISpecificCategory;

  constructor(private _HomeContentService: HomeContentService) {}

  ngOnInit(): void {
    this.getLocalNews();
  }

  getLocalNews() {
    this._HomeContentService.getHomeLocalNews().subscribe({
      next: (response) => {
        console.log(response);
        this.localNews = response;
      },
    });
  }
}

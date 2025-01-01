import { Component } from '@angular/core';
import { StaticCategoriesService } from '../../../../core/services/content/static-categories.service';
import { ISpecificCategory } from '../../../../core/interfaces/ISpecificCategory';
import { SlicePipe } from '@angular/common';
import { StringSlicePipe } from '../../../../core/pipes/string-slice.pipe';
import { HomeContentService } from '../../../../core/services/content/home/home-content.service';

@Component({
  selector: 'app-home-articles',
  standalone: true,
  imports: [SlicePipe, StringSlicePipe],
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
        console.log(response);
        this.specificCategory = response;
      },
    });
  }
}

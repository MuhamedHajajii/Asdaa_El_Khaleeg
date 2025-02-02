import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ISpecificCategory } from '../../../../core/interfaces/ISpecificCategory';
import { StringSlicePipe } from '../../../../core/pipes/string-slice.pipe';
import { CategoriesService } from '../../../../core/services/content/categories.service';
import { ImagesSrcPipe } from '../../../../core/pipes/images-src.pipe';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    RouterLink,
    StringSlicePipe,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    ImagesSrcPipe,
    SafeHtmlPipe,
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent {
  currentId!: string;
  specificCategories!: ISpecificCategory | null;
  currentPage: number = 1;
  totalItems: number = 0;
  isShowSkeleton: boolean = true;
  pageChanged(e: number) {
    this.isShowSkeleton = true;
    window.scrollTo(0, 0);
    this.currentPage = e;
    this._CategoriesService
      .getCurrentCategories(this.currentId, this.currentPage)
      .subscribe({
        next: (response) => {
          this.isShowSkeleton = false;
          this.specificCategories = response as ISpecificCategory;
          this.totalItems = response?.blogs.total as number;
        },
      });
  }

  constructor(
    private _CategoriesService: CategoriesService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getInitialId();
  }

  getInitialId(): void {
    // Extract 'id' from the current route on page load
    const id = this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let id = params.get('id');
        if (id) {
          this.currentId = id;
          this.getCurrentCategory(this.currentId);
        }
      },
    });
  }

  getCurrentCategory(blogId: string): void {
    this.isShowSkeleton = true;
    this._CategoriesService.getCurrentCategories(blogId).subscribe({
      next: (response) => {
        this.isShowSkeleton = false;
        this.specificCategories = response as ISpecificCategory;
        this.totalItems = response?.blogs.total as number;
      },
    });
  }
}

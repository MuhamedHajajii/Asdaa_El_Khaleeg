import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../../../core/services/content/categories.service';

import { NgxPaginationModule } from 'ngx-pagination';
import { ISpecificCategory } from '../../../../core/interfaces/ISpecificCategory';
import { HijriDatePipe } from '../../../../core/pipes/date-hijri.pipe';
import { StringSlicePipe } from '../../../../core/pipes/string-slice.pipe';
import { ImagesSrcPipe } from '../../../../core/pipes/images-src.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    HijriDatePipe,
    StringSlicePipe,
    RouterLink,
    NgxPaginationModule,
    ImagesSrcPipe,
    NgxSkeletonLoaderModule,
    SafeHtmlPipe,
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {
  currentId!: string;
  specificCategories!: ISpecificCategory | null;
  imageLoadedFlag = false;
  currentPage: number = 1;
  totalItems: number = 0;
  isShowSkeleton = true;
  pageChanged(e: number) {
    this.isShowSkeleton = true;
    window.scrollTo(0, 0);
    this.currentPage = e;
    console.log(this.currentPage);
    this._CategoriesService
      .getCurrentCategories(this.currentId, this.currentPage)
      .subscribe({
        next: (response) => {
          this.specificCategories = response as ISpecificCategory;
          this.totalItems = response?.blogs.total as number;
          this.isShowSkeleton = false;
        },
        error: (err) => console.error('Error fetching category:', err),
      });
  }

  constructor(
    private _CategoriesService: CategoriesService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Handle the active route on reload
    this.getInitialId();
  }

  getInitialId(): void {
    // Extract 'id' from the current route on page load
    const id = this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let id = params.get('id');
        if (id) {
          this.isShowSkeleton = true;
          this.currentId = id;
          console.log('Active Route ID (Reload):', this.currentId);
          this.getCurrentCategory(this.currentId);
        }
      },
    });
  }

  getCurrentCategory(blogId: string): void {
    console.log('Active Route ID (Reload):', this.currentId);

    this.isShowSkeleton = true;
    this._CategoriesService.getCurrentCategories(blogId).subscribe({
      next: (response) => {
        console.log(response);
        this.specificCategories = response as ISpecificCategory;
        this.totalItems = response?.blogs.total as number;
        this.isShowSkeleton = false;
      },
      error: (err) => console.error('Error fetching category:', err),
    });
  }

  imageLoaded(e: any) {
    console.log();
    let targetImage = e.target as HTMLElement;
    targetImage.nextElementSibling?.classList.add('d-none');
  }
}

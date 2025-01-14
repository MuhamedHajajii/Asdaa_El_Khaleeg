import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { CategoriesService } from '../../../../core/services/content/categories.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ISpecificCategory } from '../../../../core/interfaces/ISpecificCategory';
import { HijriDatePipe } from '../../../../core/pipes/date-hijri.pipe';
import { StringSlicePipe } from '../../../../core/pipes/string-slice.pipe';
import { ImagesSrcPipe } from '../../../../core/pipes/images-src.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';
import { filter, map, switchMap, Subject, takeUntil } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

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
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit, OnDestroy {
  currentId!: string;
  specificCategories: ISpecificCategory | null = null;
  imageLoadedFlag = false;
  currentPage = 1;
  totalItems = 0;
  isShowSkeleton = true;
  private destroy$ = new Subject<void>();

  constructor(
    private _CategoriesService: CategoriesService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.listenToRouteChanges();
    this.getInitialId();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  pageChanged(page: number): void {
    this.isShowSkeleton = true;
    window.scrollTo(0, 0);
    this.currentPage = page;
    this.loadCategoryData(this.currentId, page);
  }

  getInitialId(): void {
    this._ActivatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.currentId = id;
          this.loadCategoryData(id, this.currentPage);
        }
      });
  }

  loadCategoryData(categoryId: string, page: number): void {
    this.isShowSkeleton = true;
    this._CategoriesService
      .getCurrentCategories(categoryId, page)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.specificCategories = response as ISpecificCategory;
          this.totalItems = response?.blogs?.total || 0;
          this.isShowSkeleton = false;
          this.updateMeta();
        },
        error: (err) => console.error('Error fetching category:', err),
      });
  }

  listenToRouteChanges(): void {
    this._Router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => this._ActivatedRoute.data)
      )
      .subscribe((data) => {
        this.titleService.setTitle(
          data['title'] ||
            `أصداء الخليج - ${this.specificCategories?.category.name}` ||
            'أصداء الخليج'
        );
        // this.metaService.updateTag({
        //   name: 'description',
        //   content:
        //     data['description'] ||
        //     'تقدم الشركة خدماتها و تساعد الأفراد من مختلف الأعمار...',
        // });
      });
  }

  updateMeta(): void {
    if (this.specificCategories?.category?.name) {
      this.titleService.setTitle(
        `أصداء الخليج - ${this.specificCategories?.category.name}`
      );
      // this.metaService.updateTag({
      //   name: 'description',
      //   content: 'تقدم الشركة خدماتها و تساعد الأفراد من مختلف الأعمار...',
      // });
    }
  }

  imageLoaded(event: Event): void {
    const targetImage = event.target as HTMLElement;
    targetImage.nextElementSibling?.classList.add('d-none');
  }
}

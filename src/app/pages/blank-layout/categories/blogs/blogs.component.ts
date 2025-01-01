import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { CategoriesService } from '../../../../core/services/content/categories.service';

import { ISpecificCategory } from '../../../../core/interfaces/ISpecificCategory';
import { DatePipe } from '@angular/common';
import { StringSlicePipe } from '../../../../core/pipes/string-slice.pipe';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [DatePipe, StringSlicePipe, RouterLink],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {
  currentId!: string;
  specificCategories!: ISpecificCategory;
  imageLoadedFlag = false;

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
          this.currentId = id;
          console.log('Active Route ID (Reload):', this.currentId);
          this.getCurrentCategory(this.currentId);
        }
      },
    });
  }

  getCurrentCategory(blogId: string): void {
    this._CategoriesService.getCurrentCategories(blogId).subscribe({
      next: (response) => {
        console.log(response);
        this.specificCategories = response;
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

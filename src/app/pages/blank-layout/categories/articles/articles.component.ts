import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ISpecificCategory } from '../../../../core/interfaces/ISpecificCategory';
import { StringSlicePipe } from '../../../../core/pipes/string-slice.pipe';
import { CategoriesService } from '../../../../core/services/content/categories.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterLink, StringSlicePipe],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent {
  currentId!: string;
  specificCategories!: ISpecificCategory;
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
}

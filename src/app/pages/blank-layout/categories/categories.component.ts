import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BlankNavbarComponent } from '../../../core/components/blank-navbar/blank-navbar.component';
import { CategoriesService } from '../../../core/services/content/categories.service';
import { AdvertisingAreaComponent } from '../../../shared/components/advertising-area/advertising-area.component';
import { RelatedContentComponent } from './related-content/related-content.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    BlankNavbarComponent,
    AdvertisingAreaComponent,
    RelatedContentComponent,
    RouterOutlet,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  constructor(
    private _CategoriesService: CategoriesService,
    private _Router: Router
  ) {}

  onClickGetLastEditorNewsId(): void {
    this._CategoriesService.getEditorBlog().subscribe({
      next: (response) => {
        console.log(response);
        this._Router.navigate([`/details`, response.blogs[0].post_id]);
      },
    });
  }
}

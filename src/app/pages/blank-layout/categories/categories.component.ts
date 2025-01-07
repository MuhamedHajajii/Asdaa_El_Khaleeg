import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
    RouterOutlet,RouterLink
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {

  masterBlog!:any;


  ngOnInit(): void {
    this.onClickGetLastEditorNewsId()
  }

  constructor(
    private _CategoriesService: CategoriesService,
    private _Router: Router
  ) {}

  onClickGetLastEditorNewsId(): void {
    this._CategoriesService.getEditorBlog().subscribe({
      next: (response) => {
        this.masterBlog = response      },
    });
  }
}

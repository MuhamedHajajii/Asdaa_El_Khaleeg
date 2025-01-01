import { Component } from '@angular/core';
import { AdvertisingAreaComponent } from '../../../../shared/components/advertising-area/advertising-area.component';
import {
  IBlogs,
  ISpecificCategory,
} from '../../../../core/interfaces/ISpecificCategory';
import { HomeContentService } from '../../../../core/services/content/home/home-content.service';
import { StringSlicePipe } from '../../../../core/pipes/string-slice.pipe';

@Component({
  selector: 'app-national-news',
  standalone: true,
  imports: [AdvertisingAreaComponent, StringSlicePipe],
  templateUrl: './national-news.component.html',
  styleUrl: './national-news.component.scss',
})
export class NationalNewsComponent {
  nationalNews!: ISpecificCategory;

  constructor(private _HomeContentService: HomeContentService) {}

  ngOnInit(): void {
    this.getNationalNews();
  }

  getNationalNews() {
    this._HomeContentService.getHomeNationalsNews().subscribe({
      next: (response) => {
        console.log(response);
        this.nationalNews = response;
      },
    });
  }
}

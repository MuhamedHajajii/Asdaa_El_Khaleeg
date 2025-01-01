import { Component } from '@angular/core';
import { HomeContentService } from '../../../../core/services/content/home/home-content.service';
import { ISpecificCategory } from '../../../../core/interfaces/ISpecificCategory';
import { StringSlicePipe } from '../../../../core/pipes/string-slice.pipe';

@Component({
  selector: 'app-home-investigations',
  standalone: true,
  imports: [StringSlicePipe],
  templateUrl: './home-investigations.component.html',
  styleUrl: './home-investigations.component.scss',
})
export class HomeInvestigationsComponent {
  investigations!: ISpecificCategory;

  constructor(private _HomeContentService: HomeContentService) {}

  ngOnInit(): void {
    this.getLocalNews();
  }

  getLocalNews() {
    this._HomeContentService.getHomeInvestigations().subscribe({
      next: (response) => {
        console.log(response);
        this.investigations = response;
      },
    });
  }
}

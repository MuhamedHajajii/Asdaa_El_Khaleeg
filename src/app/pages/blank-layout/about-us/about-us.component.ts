import { Component } from '@angular/core';
import { BlankNavbarComponent } from '../../../core/components/blank-navbar/blank-navbar.component';
import { IAboutUsRow } from '../../../core/interfaces/IAboutUs';
import { AboutUsService } from '../../../dashboard/services/about-us.service';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [BlankNavbarComponent, SafeHtmlPipe],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  aboutUsContent!: IAboutUsRow;
  constructor(private _AboutUsService: AboutUsService) {}

  ngOnInit(): void {
    this._AboutUsService.getAboutUs().subscribe({
      next: (response) => {
        this.aboutUsContent = response.row;
      },
    });
  }
}

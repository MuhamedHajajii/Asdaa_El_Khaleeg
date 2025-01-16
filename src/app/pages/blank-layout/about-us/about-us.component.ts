import { Component } from '@angular/core';
import { BlankNavbarComponent } from '../../../core/components/blank-navbar/blank-navbar.component';
import { IAboutUsRow } from '../../../core/interfaces/IAboutUs';
import { AboutUsService } from '../../../dashboard/services/about-us.service';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [BlankNavbarComponent, SafeHtmlPipe],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  aboutUsContent!: IAboutUsRow;
  constructor(
    private _AboutUsService: AboutUsService,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    if (window.location.href) {
      const canonicalUrl = window.location.href;

      // ✅ Find and remove existing canonical tag
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        existingCanonical.remove();
      }

      // ✅ Add the new canonical tag
      this.metaService.addTag({ rel: 'canonical', href: canonicalUrl });
    }
    this._AboutUsService.getAboutUs().subscribe({
      next: (response) => {
        this.aboutUsContent = response.row;
      },
    });
  }
}

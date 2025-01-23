import { Component } from '@angular/core';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';
import { BlankNavbarComponent } from '../../../core/components/blank-navbar/blank-navbar.component';
import { SocialMediaService } from '../../../core/services/content/social-media.service';
import { ISocialMedia } from '../../../core/interfaces/ISocialMedia';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ContactUsFormComponent, BlankNavbarComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  socialMediaLinks!: ISocialMedia;

  constructor(private _SocialMediaService: SocialMediaService) {}

  ngOnInit(): void {
    this.getSocialMediaLinks();
  }

  getSocialMediaLinks(): void {
    this._SocialMediaService.getSocialMediaLinks().subscribe({
      next: (response) => {
        this.socialMediaLinks = response as ISocialMedia;
      },
    });
  }
}

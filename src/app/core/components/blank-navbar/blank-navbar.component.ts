import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Contact } from '../../interfaces/ISocialMedia';
import { HijriDatePipe } from '../../pipes/date-hijri.pipe';
import { SocialMediaService } from '../../services/content/social-media.service';
import { StaticCategoriesService } from '../../services/content/static-categories.service';

@Component({
  selector: 'app-blank-navbar',
  standalone: true,
  imports: [RouterLink, HijriDatePipe],
  templateUrl: './blank-navbar.component.html',
  styleUrl: './blank-navbar.component.scss',
})
export class BlankNavbarComponent {
  nowDate = new Date();

  socialLinks: { label: string; url: string; icon: string; alt: string }[] = [];

  constructor(
    private _StaticCategoriesService: StaticCategoriesService,
    private _Router: Router,
    private _SocialMediaService: SocialMediaService
  ) {}

  ngOnInit(): void {
    this.getSocialMediaLinks();
    this._StaticCategoriesService.increaseView().subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }

  searchResults(searchResult: string): void {
    this._Router.navigate([`/archives/search`, searchResult]);
  }
  getSocialMediaLinks(): void {
    this._SocialMediaService.getSocialMediaLinks().subscribe({
      next: (response) => {
        const contact = response?.contact as Contact;
        const linksMapping: Record<
          string,
          { label: string; icon: string; alt: string }
        > = {
          face_url: {
            label: 'Facebook',
            icon: './assets/images/social_meida_icons/facebook.svg',
            alt: 'اصداء الخليج فيسبوك',
          },
          tweet_url: {
            label: 'Twitter',
            icon: './assets/images/social_meida_icons/x-twitter-brands-solid.svg',
            alt: 'اصداء الخليج اكس',
          },
          instgram_url: {
            label: 'Instagram',
            icon: './assets/images/social_meida_icons/instagram.svg',
            alt: 'اصداء الخليج انستجرام',
          },
          tiktok_url: {
            label: 'TikTok',
            icon: './assets/images/social_meida_icons/tiktok.svg',
            alt: 'اصداء الخليج تيك توك',
          },
          snapchat_url: {
            label: 'Snapchat',
            icon: './assets/images/social_meida_icons/snapchat.svg',
            alt: 'اصداء الخليج سناب شات',
          },
          telegram_url: {
            label: 'Telegram',
            icon: './assets/images/social_meida_icons/telegram.svg',
            alt: 'اصداء الخليج تيليجرام',
          },
          watus_number: {
            label: 'WhatsApp',
            icon: './assets/images/social_meida_icons/whatsapp.svg',
            alt: 'اصداء الخليج واتساب',
          },
        };
        console.log(response);
        // Filter non-null social media links
        if (contact) {
          for (const [key, value] of Object.entries(contact)) {
            if (value !== 'null' && linksMapping[key]) {
              this.socialLinks.push({
                url: value as string,
                ...linksMapping[key],
              });
            }
          }
        }
      },
    });
  }
}

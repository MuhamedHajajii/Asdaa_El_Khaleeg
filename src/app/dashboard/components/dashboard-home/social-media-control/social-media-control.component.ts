import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-social-media-control',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './social-media-control.component.html',
  styleUrls: ['./social-media-control.component.scss'],
})
export class SocialMediaControlComponent {
  socialMediaLinks: any[] = [];
  originalLinks: any = {};
  hasChanges: boolean = false;

  ngOnInit() {
    const response = {
      contact: {
        id: 1,
        tweet_url: 'https://twitter.com/asda_alkhaleej?s=21',
        snapchat_url: 'https://www.snapchat.com/add/asda_alkhaleej',
        instgram_url:
          'https://www.instagram.com/asda_alkhaleej/?utm_medium=copy_link',
        watus_number: 'https://wa.me/966531964880',
        face_url: null,
        youtube_url: null,
        tiktok_url: null,
        phone_number: null,
        location: null,
        main_email: null,
        telegram_url: null,
        created_at: '2024-12-30 08:53:11',
        updated_at: '2024-12-30 08:53:11',
      },
    };

    this.socialMediaLinks = this.convertResponseToLinks(response.contact);
    this.originalLinks = JSON.parse(JSON.stringify(this.socialMediaLinks));
  }

  convertResponseToLinks(contact: any): any[] {
    return [
      {
        key: 'tweet_url',
        label: 'تويتر',
        icon: 'pi-twitter',
        url: contact.tweet_url,
      },
      {
        key: 'snapchat_url',
        label: 'سناب شات',
        icon: 'pi-comment',
        url: contact.snapchat_url,
      },
      {
        key: 'instgram_url',
        label: 'إنستجرام',
        icon: 'pi-instagram',
        url: contact.instgram_url,
      },
      {
        key: 'watus_number',
        label: 'واتساب',
        icon: 'pi-whatsapp',
        url: contact.watus_number,
      },
      {
        key: 'face_url',
        label: 'فيسبوك',
        icon: 'pi-facebook',
        url: contact.face_url,
      },
      {
        key: 'youtube_url',
        label: 'يوتيوب',
        icon: 'pi-youtube',
        url: contact.youtube_url,
      },
      {
        key: 'tiktok_url',
        label: 'تيك توك',
        icon: 'pi-play',
        url: contact.tiktok_url,
      },
      {
        key: 'telegram_url',
        label: 'تليجرام',
        icon: 'pi-send',
        url: contact.telegram_url,
      },
      {
        key: 'phone_number',
        label: 'رقم الهاتف',
        icon: 'pi-phone',
        url: contact.phone_number,
      },
      {
        key: 'location',
        label: 'الموقع',
        icon: 'pi-map-marker',
        url: contact.location,
      },
      {
        key: 'main_email',
        label: 'البريد الإلكتروني',
        icon: 'pi-envelope',
        url: contact.main_email,
      },
    ];
  }

  onInputChange() {
    this.hasChanges =
      JSON.stringify(this.socialMediaLinks) !==
      JSON.stringify(this.originalLinks);
  }

  saveChanges() {
    console.log('Saving changes...', this.socialMediaLinks);
    this.hasChanges = false;
  }
}

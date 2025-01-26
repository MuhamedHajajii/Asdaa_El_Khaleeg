import { Component, inject } from '@angular/core';
import { YoutubeService } from '../../../../core/services/content/youtube.service';
import { IYoutube } from '../../../../core/interfaces/IYoutube';
import { HomeContentService } from '../../../../core/services/content/home/home-content.service';
import { SocialMediaLinksService } from '../../../../dashboard/services/social-media-links.service';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-home-videos',
  standalone: true,
  imports: [SafeHtmlPipe],
  templateUrl: './home-videos.component.html',
  styleUrl: './home-videos.component.scss',
})
export class HomeVideosComponent {
  currentYoutubeVideos!: IYoutube;
  SocialMediaLinksService = inject(SocialMediaLinksService);
  videoIframe: string = '';
  constructor(private _HomeContentService: HomeContentService) {}

  ngOnInit(): void {
    this.getHomeVideo();
    this.getLocalNews();
  }

  getLocalNews() {
    this._HomeContentService.getHomeYouTube().subscribe({
      next: (response) => {
        this.currentYoutubeVideos = response;
      },
    });
  }

  getHomeVideo() {
    this.SocialMediaLinksService.getSocialMediaLinks().subscribe({
      next: (response) => {
        this.videoIframe = response?.contact.youtube_embedded;
      },
    });
  }

  onClickOpenYouTubeVideo(targetVideoUrl: string): void {
    window.open(`https://www.youtube.com/watch?v=${targetVideoUrl}`, '_blank');
  }

  onClickOpenYouTube(): void {
    window.open('https://www.youtube.com/@asda-alkhaleej', '_blank');
  }
}

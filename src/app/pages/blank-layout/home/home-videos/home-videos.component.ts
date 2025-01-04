import { Component } from '@angular/core';
import { YoutubeService } from '../../../../core/services/content/youtube.service';
import { IYoutube } from '../../../../core/interfaces/IYoutube';
import { HomeContentService } from '../../../../core/services/content/home/home-content.service';

@Component({
  selector: 'app-home-videos',
  standalone: true,
  imports: [],
  templateUrl: './home-videos.component.html',
  styleUrl: './home-videos.component.scss',
})
export class HomeVideosComponent {
  currentYoutubeVideos!: IYoutube;
  constructor(private _HomeContentService: HomeContentService) {}

  ngOnInit(): void {
    this.getLocalNews();
  }

  getLocalNews() {
    this._HomeContentService.getHomeYouTube().subscribe({
      next: (response) => {
        this.currentYoutubeVideos = response;
        console.log(response);
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IYoutube } from '../../interfaces/IYoutube';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private _HttpClient: HttpClient) {}

  getYoutubeVideos(): Observable<IYoutube> {
    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=10&pageToken=EAAafVBUOkNBd2lFREZHTWpOQ01rTTFNVVJETmpRNU9UQW9BVWl4NFpDUi10S0tBMUFCV2pnaVEyaG9WbFpYU2s1aVIzUnlUbXRLUlZSWGFHbFNiRVpNVTJ4R2QyRnRNWEZQUjJOVFJFRnFaM2hPUnpkQ2FFUnZOWFp1VUVGM0ln&playlistId=UUbMlkk6BDMhbFQKJQpjmj8g&key=AIzaSyAHFJPu7SzSC7XzbBHoNbcQrphjWJLYyIQ`;

    return this._HttpClient.get<IYoutube>(apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching YouTube videos:', error);
        return throwError(() => new Error('Failed to fetch YouTube videos'));
      })
    );
  }
}

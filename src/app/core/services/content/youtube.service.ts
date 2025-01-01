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
    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=6&pageToken=EAAafVBUOkNBWWlFRVpHTnpVNE1UaEZRMFUzUWpCRFJVUW9BVWkxNXF2Q3RNdUtBMUFCV2pnaVEyaG9WbFpYU2s1aVIzUnlUbXRLUlZSWGFHbFNiRVpNVTJ4R2QyRnRNWEZQUjJOVFJFRnFZakk0UnpkQ2FFTkpPSFZVTmtGUkln&playlistId=UUbMlkk6BDMhbFQKJQpjmj8g&key=AIzaSyAHFJPu7SzSC7XzbBHoNbcQrphjWJLYyIQ`;

    return this._HttpClient.get<IYoutube>(apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching YouTube videos:', error);
        return throwError(() => new Error('Failed to fetch YouTube videos'));
      })
    );
  }
}

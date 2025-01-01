import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { WEB_SITE_BASE_URL } from '../../../constants/WEB_SITE_BASE_UTL';

@Injectable({
  providedIn: 'root',
})
export class HomeContentService {
  constructor(private _HttpClient: HttpClient) {}

  getHomeSlider(): Observable<any> {
    return this._HttpClient.get(`${WEB_SITE_BASE_URL}slider-blogs`);
  }
  getHomeLocalNews(): Observable<any> {
    return this._HttpClient.get(`${WEB_SITE_BASE_URL}blogs/01`);
  }
  getHomeArticles(): Observable<any> {
    return this._HttpClient.get(`${WEB_SITE_BASE_URL}blogs/08`);
  }
  getHomeInvestigations(): Observable<any> {
    return this._HttpClient.get(`${WEB_SITE_BASE_URL}blogs/i`);
  }
  getHomeYouTube(): Observable<any> {
    return this._HttpClient.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=3&pageToken=EAAafVBUOkNBWWlFRVpHTnpVNE1UaEZRMFUzUWpCRFJVUW9BVWkxNXF2Q3RNdUtBMUFCV2pnaVEyaG9WbFpYU2s1aVIzUnlUbXRLUlZSWGFHbFNiRVpNVTJ4R2QyRnRNWEZQUjJOVFJFRnFZakk0UnpkQ2FFTkpPSFZVTmtGUkln&playlistId=UUbMlkk6BDMhbFQKJQpjmj8g&key=AIzaSyAHFJPu7SzSC7XzbBHoNbcQrphjWJLYyIQ`
    );
  }
  getHomeNationalsNews(): Observable<any> {
    return this._HttpClient.get(`${WEB_SITE_BASE_URL}blogs/6`);
  }
}

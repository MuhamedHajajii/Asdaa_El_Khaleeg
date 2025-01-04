import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { WEB_SITE_BASE_URL } from '../../../constants/WEB_SITE_BASE_UTL';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HomeContentService {
  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private PLATFORM_ID: object
  ) {}

  getHomeSlider(): Observable<any | null> {
    if (this.checkPlatForm()) {
      return this._HttpClient.get(`${WEB_SITE_BASE_URL}slider-blogs`);
    } else {
      return of(null);
    }
  }
  getHomeLocalNews(): Observable<any> {
    if (this.checkPlatForm()) {
      return this._HttpClient.get(`${WEB_SITE_BASE_URL}blogs/01`);
    } else {
      return of(null);
    }
  }
  getHomeArticles(): Observable<any> {
    if (this.checkPlatForm()) {
      return this._HttpClient.get(`${WEB_SITE_BASE_URL}blogs/08`);
    } else {
      return of(null);
    }
  }
  getHomeInvestigations(): Observable<any> {
    if (this.checkPlatForm()) {
      return this._HttpClient.get(`${WEB_SITE_BASE_URL}blogs/i`);
    } else {
      return of(null);
    }
  }
  getHomeYouTube(): Observable<any> {
    if (this.checkPlatForm()) {
      return this._HttpClient.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=3&pageToken=EAAafVBUOkNBWWlFRVpHTnpVNE1UaEZRMFUzUWpCRFJVUW9BVWkxNXF2Q3RNdUtBMUFCV2pnaVEyaG9WbFpYU2s1aVIzUnlUbXRLUlZSWGFHbFNiRVpNVTJ4R2QyRnRNWEZQUjJOVFJFRnFZakk0UnpkQ2FFTkpPSFZVTmtGUkln&playlistId=UUbMlkk6BDMhbFQKJQpjmj8g&key=AIzaSyAHFJPu7SzSC7XzbBHoNbcQrphjWJLYyIQ`
      );
    } else {
      return of(null);
    }
  }
  getHomeNationalsNews(): Observable<any> {
    if (this.checkPlatForm()) {
      return this._HttpClient.get(`${WEB_SITE_BASE_URL}blogs/6`);
    } else {
      return of(null);
    }
  }
  getHomeRandomNews(): Observable<any> {
    if (this.checkPlatForm()) {
      return this._HttpClient.get(`${WEB_SITE_BASE_URL}getRandomBlogs`);
    } else {
      return of(null);
    }
  }

  checkPlatForm(): boolean {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      return true;
    }
    return false;
  }
}

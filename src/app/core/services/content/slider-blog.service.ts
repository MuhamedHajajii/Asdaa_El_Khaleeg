import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WEB_SITE_BASE_URL } from '../../constants/WEB_SITE_BASE_UTL';
import { Observable } from 'rxjs';
import { ISliderHome } from '../../interfaces/slider/ISliderHome';

@Injectable({
  providedIn: 'root',
})
export class SliderBlogService {
  constructor(private _HttpClient: HttpClient) {}

  getSliderData(): Observable<ISliderHome> {
    return <Observable<ISliderHome>>(
      this._HttpClient.get(`${WEB_SITE_BASE_URL}slider-blogs`)
    );
  }
}

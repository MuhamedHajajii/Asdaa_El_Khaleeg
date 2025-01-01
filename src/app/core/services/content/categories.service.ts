import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WEB_SITE_BASE_URL } from '../../constants/WEB_SITE_BASE_UTL';
import { ISpecificCategory } from '../../interfaces/ISpecificCategory';
import { IBlog } from '../../interfaces/IBlog';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private _HttpClient: HttpClient) {}

  getCurrentCategories(blogId: string): Observable<ISpecificCategory> {
    return <Observable<ISpecificCategory>>(
      this._HttpClient.get(`${WEB_SITE_BASE_URL}blogs/${blogId}`)
    );
  }

  getBlogById(blogId: string): Observable<IBlog> {
    return <Observable<IBlog>>(
      this._HttpClient.get(`${WEB_SITE_BASE_URL}blog-detail/${blogId}`)
    );
  }

  getNavBarCategories(): Observable<ISpecificCategory> {
    return <Observable<ISpecificCategory>>(
      this._HttpClient.get(`${WEB_SITE_BASE_URL}categories`)
    );
  }
}

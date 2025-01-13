import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WEB_SITE_BASE_URL } from '../../core/constants/WEB_SITE_BASE_UTL';
import {
  IGetAllNews,
  IGetOneBlogResponse,
  INewsAddBody,
  INewsAddResponse,
} from '../../core/interfaces/INewsControl';
import { IBlog } from '../../core/interfaces/ISpecificCategory';

@Injectable({
  providedIn: 'root',
})
export class NewsControlService {
  constructor(private _HttpClient: HttpClient) {}

  getAllNews(): Observable<IGetAllNews> {
    return <Observable<IGetAllNews>>(
      this._HttpClient.get(`${WEB_SITE_BASE_URL}blog_index`)
    );
  }

  addNews(data: FormData): Observable<INewsAddResponse> {
    return <Observable<INewsAddResponse>>(
      this._HttpClient.post(`${WEB_SITE_BASE_URL}blog_store`, data)
    );
  }

  updateNews(id: number, data: FormData): Observable<INewsAddResponse> {
    return <Observable<INewsAddResponse>>(
      this._HttpClient.post(`${WEB_SITE_BASE_URL}blog_update/${id}`, data)
    );
  }

  newsEnable(id: number): Observable<INewsAddResponse> {
    return <Observable<INewsAddResponse>>(
      this._HttpClient.post(`${WEB_SITE_BASE_URL}blog_enable/${id}`, {})
    );
  }

  newsDisable(id: number): Observable<INewsAddResponse> {
    return <Observable<INewsAddResponse>>(
      this._HttpClient.post(`${WEB_SITE_BASE_URL}blog_destroy/${id}`, {})
    );
  }

  getNewsById(id: number): Observable<IGetOneBlogResponse> {
    return <Observable<IGetOneBlogResponse>>(
      this._HttpClient.get(`${WEB_SITE_BASE_URL}blog_update_data/${id}`)
    );
  }
}

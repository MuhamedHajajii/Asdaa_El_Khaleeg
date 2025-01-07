import { Component } from '@angular/core';
import { ATotalViewsComponent } from './a-total-views/a-total-views.component';
import { BTotalCommentsComponent } from './b-total-comments/b-total-comments.component';
import { CTotalArticlesComponent } from './c-total-articles/c-total-articles.component';
import { DTotalMonthlyViewsComponent } from './d-total-monthly-views/d-total-monthly-views.component';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { HijriDatePipe } from '../../../../../core/pipes/date-hijri.pipe';
@Component({
  selector: 'app-dashboard-home-layout',
  standalone: true,
  imports: [
    ATotalViewsComponent,
    BTotalCommentsComponent,
    CTotalArticlesComponent,
    DTotalMonthlyViewsComponent,
    ChartModule,
    TableModule,
    CardModule,
    HijriDatePipe,
  ],
  templateUrl: './dashboard-home-layout.component.html',
  styleUrl: './dashboard-home-layout.component.scss',
})
export class DashboardHomeLayoutComponent {
  // Data for the Most Viewed Articles
  mostViewedArticlesData = {
    labels: ['مقال 1', 'مقال 2', 'مقال 3'],
    datasets: [
      {
        label: 'المشاهدات',
        data: [500, 450, 300],
        backgroundColor: '#42A5F5',
      },
    ],
  };

  mostViewedArticles = [
    { title: 'مقال 1', views: 500, publishedDate: new Date('2025-01-01') },
    { title: 'مقال 2', views: 450, publishedDate: new Date('2025-01-03') },
    { title: 'مقال 3', views: 300, publishedDate: new Date('2025-01-05') },
  ];

  // Data for the Recent Articles
  recentArticles = [
    { title: 'مقال 1', publishedDate: new Date('2025-01-01') },
    { title: 'مقال 2', publishedDate: new Date('2025-01-03') },
    { title: 'مقال 3', publishedDate: new Date('2025-01-05') },
  ];

  // Data for the Recent Comments
  recentComments = [
    { name: 'أحمد', article: 'مقال 1', date: new Date('2025-01-01') },
    { name: 'محمد', article: 'مقال 2', date: new Date('2025-01-02') },
    { name: 'علي', article: 'مقال 3', date: new Date('2025-01-03') },
  ];

  // Data for the Recent Contact Us Emails
  recentEmails = [
    {
      name: 'أحمد',
      subject: 'استفسار عن المنتج',
      date: new Date('2025-01-01'),
    },
    { name: 'محمد', subject: 'طلب خدمة', date: new Date('2025-01-02') },
    { name: 'علي', subject: 'دعم فني', date: new Date('2025-01-03') },
  ];

  // Data for the Most Viewed Categories
  mostViewedCategories = [
    { name: 'التكنولوجيا', views: 500 },
    { name: 'الصحة', views: 450 },
    { name: 'التعليم', views: 300 },
  ];
}

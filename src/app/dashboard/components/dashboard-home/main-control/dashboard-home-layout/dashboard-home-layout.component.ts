import { Component } from '@angular/core';
import { ATotalViewsComponent } from './a-total-views/a-total-views.component';
import { BTotalCommentsComponent } from './b-total-comments/b-total-comments.component';
import { CTotalArticlesComponent } from './c-total-articles/c-total-articles.component';
import { DTotalMonthlyViewsComponent } from './d-total-monthly-views/d-total-monthly-views.component';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { HijriDatePipe } from '../../../../../core/pipes/date-hijri.pipe';
import { TableBMostViewsBlogsComponent } from './table-b-most-views-blogs/table-b-most-views-blogs.component';
import { TableCMostViewsCategoriesComponent } from './table-c-most-views-categories/table-c-most-views-categories.component';
import { TableERecentMessagesComponent } from './table-e-recent-messages/table-e-recent-messages.component';
import { TableARecentArticlesComponent } from './table-a-recent-articles/table-a-recent-articles.component';
import { TableDMostCommentedComponent } from './table-d-most-commented/table-d-most-commented.component';
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
    TableBMostViewsBlogsComponent,
    TableCMostViewsCategoriesComponent,
    TableERecentMessagesComponent,
    TableARecentArticlesComponent,
    TableDMostCommentedComponent,
  ],
  templateUrl: './dashboard-home-layout.component.html',
  styleUrl: './dashboard-home-layout.component.scss',
})
export class DashboardHomeLayoutComponent {}

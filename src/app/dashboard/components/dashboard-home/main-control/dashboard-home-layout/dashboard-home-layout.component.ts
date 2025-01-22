import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ATotalViewsComponent } from './a-total-views/a-total-views.component';
import { BTotalCommentsComponent } from './b-total-comments/b-total-comments.component';
import { CTotalArticlesComponent } from './c-total-articles/c-total-articles.component';
import { DTotalMonthlyViewsComponent } from './d-total-monthly-views/d-total-monthly-views.component';
import { TableAMostViewsBlogChartComponent } from './table-a-most-views-blog-chart/table-a-most-views-blog-chart.component';
import { TableARecentArticlesComponent } from './table-a-recent-articles/table-a-recent-articles.component';
import { TableBMostViewsBlogsComponent } from './table-b-most-views-blogs/table-b-most-views-blogs.component';
import { TableCMostViewsCategoriesComponent } from './table-c-most-views-categories/table-c-most-views-categories.component';
import { TableDMostCommentedComponent } from './table-d-most-commented/table-d-most-commented.component';
import { TableERecentMessagesComponent } from './table-e-recent-messages/table-e-recent-messages.component';
import { StaticsService } from '../../../../services/statics.service';
import { IStatics } from '../../../../../core/interfaces/IStatics';
import { HijriDatePipe } from '../../../../../core/pipes/date-hijri.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    TableAMostViewsBlogChartComponent,
    NgxSpinnerModule,
  ],
  templateUrl: './dashboard-home-layout.component.html',
  styleUrl: './dashboard-home-layout.component.scss',
})
export class DashboardHomeLayoutComponent {
  statics!: IStatics;
  counters = 0;
  comments = 0;
  totalBlogs = 0;
  visitMessage: string = '';
  lastVisitData: any;
  countersIncrementMessage: string = '';
  commentsIncrementMessage: string = '';
  blogsIncrementMessage: string = '';
  constructor(private _StaticsService: StaticsService) {}

  ngOnInit(): void {
    this._StaticsService.getStatics().subscribe({
      next: (res) => {
        this.statics = res;
        this.counters = this.statics.counters;
        this.comments = this.statics.comments;
        this.totalBlogs = this.statics.totalblogs;
        this.checkLastVisit();
      },
    });
  }

  // Check the last visit date and calculate the increment
  checkLastVisit(): void {
    this.lastVisitData = this._StaticsService.getLastVisitData();
    if(this.lastVisitData) {
      const currentDate = new Date();
      if (this.lastVisitData) {
        const lastVisit = new Date(this.lastVisitData.lastVisit);
        const timeDifference = currentDate.getTime() - lastVisit.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24); // Calculate difference in days

        if (daysDifference > 1) {
          this.calculateIncrement();
        } else {
          this.visitMessage = 'No new updates since your last visit today';
        }
      } else {
        this.visitMessage = 'Welcome to the dashboard!';
      }
    }

    // Store the current visit data
    this._StaticsService.setLastVisitData({
      counters: this.counters,
      comments: this.comments,
      totalblogs: this.totalBlogs,
    });
  }

  // Calculate increment and display the message
  calculateIncrement(): void {
    const countersIncrement = this.counters - this.lastVisitData.counters;
    const commentsIncrement = this.comments - this.lastVisitData.comments;
    const blogsIncrement = this.totalBlogs - this.lastVisitData.totalBlogs;

    let incrementMessage = 'New updates since your last visit: ';

    if (countersIncrement > 0)
      this.countersIncrementMessage = `${countersIncrement} جديدة`;
    if (commentsIncrement > 0)
      this.commentsIncrementMessage = `${commentsIncrement} تعليقات جديده`;
    if (blogsIncrement > 0)
      this.blogsIncrementMessage = `${blogsIncrement} جديدة`;

    if (
      this.countersIncrementMessage ||
      this.commentsIncrementMessage ||
      this.blogsIncrementMessage
    ) {
      this.visitMessage = incrementMessage;
    } else {
      this.visitMessage = 'No new updates since your last visit';
    }
  }
}

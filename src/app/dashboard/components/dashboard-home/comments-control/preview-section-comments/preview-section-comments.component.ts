import { Component, Input } from '@angular/core';
import { NewsControlService } from '../../../../services/news-control.service';
import { AdvertisingAreaComponent } from '../../../../../shared/components/advertising-area/advertising-area.component';
import { RouterLink } from '@angular/router';
import { IGetOneBlogResponse } from '../../../../../core/interfaces/INewsControl';
import { HijriDatePipe } from '../../../../../core/pipes/date-hijri.pipe';
import { SafeHtmlPipe } from '../../../../../core/pipes/safe-html.pipe';
import { BlankNavbarComponent } from '../../../../../core/components/blank-navbar/blank-navbar.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-preview-section-comments',
  standalone: true,
  imports: [
    AdvertisingAreaComponent,
    RouterLink,
    HijriDatePipe,
    SafeHtmlPipe,
    BlankNavbarComponent,
  ],
  templateUrl: './preview-section-comments.component.html',
  styleUrl: './preview-section-comments.component.scss',
})
export class PreviewSectionCommentsComponent {
  @Input() currentId!: number;
  masterBlog!: any;

  currentBlogFromComments!: IGetOneBlogResponse;

  constructor(
    private newsControlService: NewsControlService,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    if (this.currentId) {
      this.ngxSpinnerService.show();
      this.newsControlService.getNewsById(this.currentId).subscribe({
        next: (response) => {
          this.currentBlogFromComments = response;
          this.ngxSpinnerService.hide();
        },
      });
    }
  }
}

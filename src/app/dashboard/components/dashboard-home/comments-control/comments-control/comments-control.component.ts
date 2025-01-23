import { CommonModule, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { Comment } from '../../../../../core/interfaces/IComments';
import { HijriDatePipe } from '../../../../../core/pipes/date-hijri.pipe';
import { CommentsService } from '../../../../services/comments.service';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PrivewBlogComponent } from '../../news-control/news-add/privew-blog/privew-blog.component';
import { PreviewSectionCommentsComponent } from '../preview-section-comments/preview-section-comments.component';

@Component({
  selector: 'app-comments-control',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    HijriDatePipe,
    FormsModule,
    DialogModule,
    TooltipModule,
    SlicePipe,
    CommonModule,
    RouterLink,
    ToastModule,
    FormsModule,
    PrivewBlogComponent,
    PreviewSectionCommentsComponent,
  ],
  templateUrl: './comments-control.component.html',
  styleUrls: ['./comments-control.component.scss'],
  providers: [MessageService],
})
export class CommentsControlComponent {
  comments: Comment[] = [];
  searchTerm: string = ''; // This binds to the global search input
  cols: any[] = []; // Define columns for the table
  approveDialogVisible = false;
  denyDialogVisible = false;
  selectedComment: Comment | null = null;

  constructor(
    private _CommentsService: CommentsService,
    private _MessageService: MessageService
  ) {}
  // Filter table by name
  onGlobalFilter(table: any, event: any): void {
    table.filterGlobal(event.target.value, 'contains');
  }
  ngOnInit() {
    // Define columns to be used in the table
    this.cols = [
      { field: 'id', header: 'الرقم' },
      { field: 'blog_title', header: 'العنوان' },
      { field: 'comment_name', header: 'الاسم' },
      { field: 'comment_text', header: 'التعليق' },
      { field: 'comment_date', header: 'التاريخ' },
      { field: 'actions', header: 'التحكم' },
    ];

    this.loadComments();
  }
  loadComments() {
    this._CommentsService.getAllComments().subscribe({
      next: (response) => {
        this.comments = response.comments;
      },
    });
  }

  openApproveDialog(comment: Comment) {
    this.selectedComment = comment;
    this.approveDialogVisible = true;
  }
  currentBlog!: number;
  openBlogDetails(currentBlog: number): void {
    this.currentBlog = currentBlog;
  }

  openDenyDialog(comment: Comment) {
    this.selectedComment = comment;
    this.denyDialogVisible = true;
  }

  approveComment() {
    if (this.selectedComment) {
      this.selectedComment.comment_status = 1;
      this._CommentsService
        .updateCommentsStatus(this.selectedComment.id)
        .subscribe({
          next: () => {
            this.loadComments();
            this._MessageService.add({
              severity: 'success',
              summary: 'نجاح',
              detail: 'تم تحديث التعليق',
            });
          },
        });
      this.approveDialogVisible = false;
    }
  }

  denyComment() {
    if (this.selectedComment) {
      this.selectedComment.comment_status = 0;
      this._CommentsService
        .updateCommentsStatus(this.selectedComment.id)
        .subscribe({
          next: () => {
            this.loadComments();
            this._MessageService.add({
              severity: 'success',
              summary: 'نجاح',
              detail: 'تم تحديث التعليق',
            });
          },
        });
      this.denyDialogVisible = false;
    }
  }
}

import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { HijriDatePipe } from '../../../../../core/pipes/date-hijri.pipe';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

interface Comment {
  id: number;
  title: string;
  content: string;
  date: string; // Use appropriate format, e.g., ISO date string
  status: 'approved' | 'pending' | 'denied';
}

@Component({
  selector: 'app-comments-control',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    HijriDatePipe,
    FormsModule,
    DialogModule,
  ],
  templateUrl: './comments-control.component.html',
  styleUrls: ['./comments-control.component.scss'],
})
export class CommentsControlComponent {
  comments: Comment[] = [
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
    {
      id: 1,
      title: 'Great Post!',
      content: 'Loved it.',
      date: '2025-01-08',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Interesting Read',
      content: 'Good insights.',
      date: '2025-01-09',
      status: 'pending',
    },
  ];

  approveDialogVisible = false;
  denyDialogVisible = false;
  selectedComment: Comment | null = null;

  openApproveDialog(comment: Comment) {
    this.selectedComment = comment;
    this.approveDialogVisible = true;
  }

  openDenyDialog(comment: Comment) {
    this.selectedComment = comment;
    this.denyDialogVisible = true;
  }

  approveComment() {
    if (this.selectedComment) {
      this.selectedComment.status = 'approved';
      this.approveDialogVisible = false;
    }
  }

  denyComment() {
    if (this.selectedComment) {
      this.selectedComment.status = 'denied';
      this.denyDialogVisible = false;
    }
  }
}

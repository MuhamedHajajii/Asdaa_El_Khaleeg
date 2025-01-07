import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message, MessageService } from 'primeng/api';
import { HijriDatePipe } from '../../../../../core/pipes/date-hijri.pipe';

export interface IBlog {
  post_id: number;
  post_title: string;
  post_date: string;
  post_content: string;
  post_image: string;
  author_name: string;
}

@Component({
  selector: 'app-news-control',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    RatingModule,
    FormsModule,
    CommonModule,
    HijriDatePipe,
  ],
  templateUrl: './news-control.component.html',
  styleUrls: ['./news-control.component.scss'],
  providers: [MessageService], // Provide MessageService here
})
export class NewsControlComponent {
  blogs: IBlog[] = [];
  selectedBlogs: IBlog[] = [];
  blog: IBlog = {} as IBlog;
  blogDialog: boolean = false;
  deleteBlogDialog: boolean = false;
  deleteBlogsDialog: boolean = false;
  submitted: boolean = false;
  statuses: any[] = [];
  cols!: any[];
  messages: Message[] | undefined;

  constructor() {}

  ngOnInit(): void {
    this.blogs = [
      {
        post_id: 1,
        post_title: 'مدونة 1',
        post_date: '2025-01-01',
        post_content: 'محتوى المدونة 1',
        post_image: 'https://via.placeholder.com/150',
        author_name: 'الكاتب 1',
      },
      {
        post_id: 2,
        post_title: 'مدونة 2',
        post_date: '2025-01-02',
        post_content: 'محتوى المدونة 2',
        post_image: 'https://via.placeholder.com/150',
        author_name: 'الكاتب 2',
      },
      // Add more blogs here...
    ];

    this.cols = [
      { field: 'post_id', header: 'رقم المدونة' },
      { field: 'post_title', header: 'عنوان المدونة' },
      { field: 'post_date', header: 'تاريخ النشر' },
      { field: 'author_name', header: 'اسم الكاتب' },
      { field: 'post_image', header: 'صورة المدونة' },
    ];
  }

  editBlog(blog: IBlog): void {
    this.blog = { ...blog };
    this.blogDialog = true;
  }

  saveBlog(): void {
    this.submitted = true;
    if (this.blog.post_title && this.blog.post_content) {
      if (this.blog.post_id) {
        // Update existing blog
        this.messages = [
          {
            severity: 'success',
            summary: 'نجاح',
            detail: 'تم تحديث المدونة',
            life: 3000,
          },
        ];
        // Call blogService.updateBlog(this.blog)
      } else {
        // Create new blog
        this.messages = [
          {
            severity: 'success',
            summary: 'نجاح',
            detail: 'تم إنشاء المدونة',
            life: 3000,
          },
        ];
        // Call blogService.createBlog(this.blog)
      }
      this.blogDialog = false;
      this.blog = {} as IBlog;
    }
  }

  hideDialog(): void {
    this.blogDialog = false;
    this.submitted = false;
  }

  deleteBlog(blog: IBlog): void {
    this.blog = { ...blog };
    this.deleteBlogDialog = true;
  }

  deleteSelectedBlogs(): void {
    this.deleteBlogsDialog = true;
  }

  confirmDelete(): void {
    this.blogs = this.blogs.filter((b) => b.post_id !== this.blog.post_id);
    this.messages = [
      {
        severity: 'success',
        summary: 'نجاح',
        detail: 'تم حذف المدونة',
        life: 3000,
      },
    ];
    this.deleteBlogDialog = false;
    this.blog = {} as IBlog;
    // Call blogService.deleteBlog(this.blog.post_id)
  }

  confirmDeleteSelected(): void {
    const ids = this.selectedBlogs.map((b) => b.post_id);
    this.blogs = this.blogs.filter((b) => !ids.includes(b.post_id));
    this.messages = [
      {
        severity: 'success',
        summary: 'نجاح',
        detail: 'تم حذف المدونات المختارة',
        life: 3000,
      },
    ];
    this.deleteBlogsDialog = false;
    this.selectedBlogs = [];
    // Call blogService.deleteBlogs(ids)
  }

  onGlobalFilter(dt: any, event: any): void {
    dt.filterGlobal(event.target.value, 'contains');
  }
}

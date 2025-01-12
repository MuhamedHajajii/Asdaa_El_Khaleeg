import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Category, IBlog } from '../../../../../core/interfaces/INewsControl';
import { HijriDatePipe } from '../../../../../core/pipes/date-hijri.pipe';
import { NewsControlService } from '../../../../services/news-control.service';

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
    TooltipModule,
    InputSwitchModule,
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
  submitted: boolean = false;
  statuses: any[] = [];
  cols!: any[];
  messages: Message[] | undefined;

  constructor(
    private _NewsControlService: NewsControlService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'post_id', header: 'رقم المدونة' },
      { field: 'post_title', header: 'عنوان المدونة' },
      { field: 'post_date', header: 'تاريخ النشر' },
      { field: 'category', header: 'القسم' },
      { field: 'author_name', header: 'اسم الكاتب' },
      { field: 'post_image', header: 'صورة المدونة' },
    ];
    this.getNewsData();
  }

  formatToolTip(categoryArr: Category[]): string {
    return categoryArr.map((e) => e.category_name).join(' - ');
  }

  getNewsData(): void {
    this._NewsControlService.getAllNews().subscribe({
      next: (response) => {
        this.blogs = response.rows;
        console.log(response.rows);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'حدث خطأ أثناء جلب البيانات',
        });
      },
    });
  }

  editBlog(blog: IBlog): void {
    this.blog = { ...blog };
    this.blogDialog = true;
  }

  saveBlog(): void {
    this.submitted = true;
    if (this.blog.post_title && this.blog.post_content) {
      if (this.blog.id) {
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

  onGlobalFilter(dt: any, event: any): void {
    dt.filterGlobal(event.target.value, 'contains');
  }
  toggleBlogStatus(blog: IBlog): void {
    console.log(blog.id);
    console.log(blog.publish_status);
    if (blog.publish_status === 0) {
      this._NewsControlService.newsDisable(blog.id).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'نجاح',
            detail: 'تم تحديث حالة الكاتب بنجاح',
          });
        },
      });
    } else {
      this._NewsControlService.newsEnable(blog.id).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'نجاح',
            detail: 'تم تحديث حالة الكاتب بنجاح',
          });
        },
      });
    }
    // const status = blog.isPublished ? 'Published' : 'Archived';
    // this._NewsControlService.updateBlogStatus(blog.post_id, status).subscribe({
    //   next: () => {
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'تم التحديث',
    //       detail: `تم ${status === 'Published' ? 'نشر' : 'أرشفة'} المقال بنجاح.`,
    //     });
    //   },
    //   error: () => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'خطأ',
    //       detail: 'حدث خطأ أثناء تحديث حالة المقال.',
    //     });
    //   },
    // });
  }
}

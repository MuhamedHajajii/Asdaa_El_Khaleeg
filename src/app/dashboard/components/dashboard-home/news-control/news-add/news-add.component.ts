import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
// PrimeNG Imports
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JoditAngularModule } from 'jodit-angular';
import 'jodit/esm/plugins/add-new-line/add-new-line.js';
import 'jodit/esm/plugins/bold/bold.js';
import 'jodit/esm/plugins/fullsize/fullsize.js';
import 'jodit/esm/plugins/indent/indent.js';
import 'jodit/esm/plugins/resizer/resizer.js';
import 'jodit/esm/plugins/source/source.js';
import moment from 'moment-hijri'; // Import the Hijri moment library
import { JoditConfig, NgxJoditComponent } from 'ngx-jodit';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { IBlog } from '../../../../../core/interfaces/IBlog';
import { CategoriesService } from '../../../../services/categories.service';
import { NewsControlService } from '../../../../services/news-control.service';
import { WritersService } from '../../../../services/writers.service';
import { PrivewBlogComponent } from './privew-blog/privew-blog.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-news-add',
  standalone: true,
  imports: [
    EditorModule,
    FileUploadModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ReactiveFormsModule,
    JoditAngularModule,
    FormsModule,
    NgxJoditComponent,
    ToastModule,
    DropdownModule,
    MultiSelectModule,
    CommonModule,
    CalendarModule,
    PrivewBlogComponent,
    DialogModule,
    NgxSpinnerModule,
  ],
  templateUrl: './news-add.component.html',
  styleUrl: './news-add.component.scss',
  providers: [MessageService],
})
export class NewsAddComponent implements OnInit {
  articleContent: string = ''; // Used for the editor content
  currenBlogId: number = 0;
  isPreview: boolean = false; // Toggle preview mode

  hijriDate!: string;
  hijriMonthNames: string[] = [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الآخر',
    'جمادى الأولى',
    'جمادى الآخرة',
    'رجب',
    'شعبان',
    'رمضان',
    'شوّال',
    'ذو القعدة',
    'ذو الحجة',
  ];
  hijriDayNames: string[] = [
    'الأحد',
    'الاثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ];
  value = '';

  _optionsStr = '';

  authors: any[] = [];

  categories: any[] = [];

  addArticleForm: FormGroup = new FormGroup({
    post_image: new FormControl('', [Validators.required]),

    post_title: new FormControl('', [
      Validators.required,
      this.seoTitleValidator(), // Custom validator for Arabic SEO title
    ]),

    author_name: new FormControl('', [Validators.required]),

    post_date: new FormControl('', [Validators.required]),

    post_content: new FormControl('', [
      Validators.required,
      this.minContentLengthValidator(300), // Custom validator for minimum word count
      this.arabicTextValidator(), // Custom validator to ensure content is in Arabic
    ]),

    categories: new FormControl([], [Validators.required]),
  });

  constructor(
    private _CategoriesService: CategoriesService,
    private _WritersService: WritersService,
    private _NewsControlService: NewsControlService,
    private _MessageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private _ActivatedRoute: ActivatedRoute,
    private _NgxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllAuthors();
    this.getAllCategories();

    this.primengConfig.setTranslation({
      accept: 'تأكيد',
      reject: 'إلغاء',
      cancel: 'إلغاء',
      dayNames: this.hijriDayNames,

      dayNamesShort: ['أحد', 'اثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'],
      dayNamesMin: this.hijriDayNames,
      monthNames: this.hijriMonthNames,
      monthNamesShort: [
        'محرم',
        'صفر',
        'ربيع الأول',
        'ربيع الآخر',
        'جمادى الأولى',
        'جمادى الآخرة',
        'رجب',
        'شعبان',
        'رمضان',
        'شوّال',
        'ذو القعدة',
        'ذو الحجة',
      ],
      today: 'اليوم',
      clear: 'مسح',
    });

    // Set the initial Hijri date
    this.hijriDate = moment().format('iYYYY-iMM-iDD'); // Current Hijri date
    this.addArticleForm.get('post_date')?.setValue(this.hijriDate);
    this.currentDate = moment(this.hijriDate, 'iYYYY-iMM-iDD').format(
      'YYYY-MM-DD'
    );
  }

  currentImageSrc: string = '';

  inOpenCheckCurrentBlog() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let id = params.get('id');
        if (id) {
          this.currenBlogId = +id;
          console.log('Checking');
          this._NewsControlService.getNewsById(+id).subscribe({
            next: (response) => {
              console.log(response);
              let Data = response.row;
              this.addArticleForm.get('post_title')?.setValue(Data.post_title);
              this.addArticleForm
                .get('author_name')
                ?.setValue(Data.author_name);
              this.addArticleForm
                .get('post_date')
                ?.setValue(moment(Data.post_date).format('iYYYY-iMM-iDD'));
              this.addArticleForm
                .get('post_content')
                ?.setValue(Data.post_content);
              console.log(
                Data.category.map((e) => {
                  return { value: e.category_slug, label: e.category_name };
                })
              );

              this.currentImageSrc = `https://www.asda-alkhaleej.com/blogs/${Data.post_image}`;
              this.addArticleForm.get('post_image')?.setErrors(null);
              // this.downloadAndUploadImage(
              //   `https://www.asda-alkhaleej.com/blogs/${Data.post_image}`,
              //   Data.post_image
              // );

              this.addArticleForm.get('categories')?.setValue(
                Data.category.map((e) => {
                  const foundCategory = this.categories.find(
                    (cat) => cat.value === e.category_slug
                  );
                  return foundCategory ? foundCategory.value : '';
                })
              );
            },
          });
        }
      },
    });
  }
  getAllAuthors(): void {
    this._WritersService.getAllWriters().subscribe({
      next: (response) => {
        console.log(response);
        this.authors = response.rows
          .filter((e) => e.writer_status === 1)
          .map((e) => {
            return {
              label: e.writer_name,
              value: e.writer_name,
            };
          });
      },
    });
  }
  getAllCategories(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response.rows.map((e) => {
          return {
            label: e.name,
            value: e.slug.toString(),
          };
        });
        console.log(this.categories);
        this.inOpenCheckCurrentBlog();
      },
    });
  }
  currentDate = '';
  // Handle date selection from PrimeNG Calendar
  onDateSelect(event: any) {
    // Check if the event is a Date object

    // Convert Gregorian date to Hijri using moment-hijri
    const selectedHijriDate = moment(event).format('YYYY-MM-DD'); // Convert Gregorian to Hijri
    console.log(
      'Converted Hijri Date: ',
      moment(selectedHijriDate, 'iYYYY-iMM-iDD').format('YYYY-MM-DD')
    ); // Log Hijri date
  }
  // Handle the form submission
  onSubmit(): void {
    if (this.addArticleForm.valid) {
      const formValues = this.addArticleForm.value;
      // Create FormData object
      const formData = new FormData();
      formData.append('post_title', formValues.post_title);
      formData.append('post_content', formValues.post_content);
      formData.append('meta_title', formValues.post_title);
      formData.append('meta_description', formValues.post_title);
      formData.append('author_name', formValues.author_name);
      formData.append('post_date', this.currentDate);
      formData.append('publish_status', '1');
      if (formValues.post_image) {
        formData.append(
          'post_image',
          formValues.post_image,
          formValues.post_image.name
        );
      }
      console.log(formValues);
      formValues.categories.forEach((element: any) => {
        formData.append('categoryIDS[]', element);
      });

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      this._NgxSpinnerService.show();
      if (this.currenBlogId == 0) {
        // Send the form data to your API
        this._NewsControlService.addNews(formData).subscribe({
          next: (response) => {
            console.log(response);
            this._MessageService.add({
              severity: 'success',
              summary: 'تم النشر بنجاح',
              detail: 'تمت إضافة المقال بنجاح!',
            });
            this.addArticleForm.reset();
            this.addArticleForm.get('post_content')?.setValue('');
            this._NgxSpinnerService.hide();
          },
          error: (err) => {
            console.log(err);
            this._MessageService.add({
              severity: 'error',
              summary: 'خطأ في النشر',
              detail: 'حدث خطأ أثناء محاولة نشر المقال.',
            });
            this._NgxSpinnerService.hide();
          },
        });
      } else {
        // Send the form data to your API
        this._NewsControlService
          .updateNews(this.currenBlogId, formData)
          .subscribe({
            next: (response) => {
              console.log(response);
              this._MessageService.add({
                severity: 'success',
                summary: 'تم النشر بنجاح',
                detail: 'تمت إضافة المقال بنجاح!',
              });
              this.addArticleForm.reset();
              this.addArticleForm.get('post_content')?.setValue('');
              this._NgxSpinnerService.hide();
            },
            error: (err) => {
              console.log(err);
              this._MessageService.add({
                severity: 'error',
                summary: 'خطأ في النشر',
                detail: 'حدث خطأ أثناء محاولة نشر المقال.',
              });
              this._NgxSpinnerService.hide();
            },
          });
      }
    } else {
      console.log('Form is invalid!');
    }
  }

  onFileSelect(event: any): void {
    const file = event.files[0];
    if (file) {
      this.addArticleForm.patchValue({
        post_image: file,
      });
    }
  }

  get optionsStr(): string {
    return this._optionsStr;
  }

  set optionsStr(value: string) {
    this._optionsStr = value;
    try {
      const parsed = JSON.parse(value);
      this.options = {
        ...parsed,
        uploader: {
          insertImageAsBase64URI: true,
        } as any,
      };
    } catch (e) {
      // ignore
    }
  }

  options: JoditConfig = {
    uploader: {
      insertImageAsBase64URI: true,
    } as any,
    spellcheck: true,
    language: 'ar',
    minHeight: 600,
  };

  approveDialogVisible = false;
  currentBlog!: IBlog;
  approveBlog() {
    const formValues = this.addArticleForm.value;
    // If the image is available in formValues, create a URL for the preview
    const imageURL = formValues.post_image
      ? URL.createObjectURL(formValues.post_image)
      : '';
    this.currentBlog = {
      status: '',
      blog: {
        post_id: 1,
        post_title: formValues.post_title,
        post_date: this.currentDate,
        post_content: formValues.post_content,
        post_image: imageURL || this.currentImageSrc,
        author_name: formValues.author_name,
        category_name: '',
        category_slug: '',
      },
      comments: [],
    };

    this.approveDialogVisible = true;
  }

  // Mixed content validator (allows text, images, and links)
  arabicTextValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';

      // Allow text with Arabic words, numbers, and common HTML tags
      const arabicWordRegex = /[\u0600-\u06FF]/;
      if (!value.includes('<img') && !arabicWordRegex.test(value)) {
        return { invalidArabic: 'يجب أن يحتوي النص على كلمات باللغة العربية' };
      }

      return null;
    };
  }

  // SEO title validator
  seoTitleValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      if (value.length < 50 || value.length > 60) {
        return { seoTitle: 'يجب أن يتراوح طول العنوان بين 50 و 60 حرفًا' };
      }
      if (!/[\u0600-\u06FF]/.test(value)) {
        return {
          seoTitle: 'يجب أن يحتوي العنوان على كلمات رئيسية باللغة العربية',
        };
      }
      return null;
    };
  }

  // Minimum content length validator
  minContentLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const wordCount = value
        .split(' ')
        .filter((word: any) => word.length > 0).length;
      return wordCount >= minLength
        ? null
        : {
            minContentLength: `يجب أن يحتوي المقال على الأقل على ${minLength} كلمة`,
          };
    };
  }
}

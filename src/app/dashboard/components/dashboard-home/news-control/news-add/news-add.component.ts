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
import 'jodit/esm/plugins/color/color.js';
import 'jodit/esm/plugins/iframe/iframe.js';
import 'jodit/esm/plugins/justify/justify.js';
import 'jodit/esm/plugins/source/source.js';
import 'jodit/esm/plugins/drag-and-drop/drag-and-drop.js';
import 'jodit/esm/plugins/search/search.js';
import 'jodit/esm/plugins/line-height/line-height.js';
import 'jodit/esm/plugins/video/video.js';
import 'jodit/esm/plugins/file/file.js';
import 'jodit/esm/plugins/copy-format/copy-format.js';
import 'jodit/esm/plugins/select/select.js';
import 'jodit/esm/plugins/symbols/symbols.js';
import 'jodit/esm/plugins/preview/preview.js';

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
import { response } from 'express';

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
  currentImageSrc: string = '';
  currentDate = '';
  approveDialogVisible = false;
  currentBlog!: IBlog;

  addArticleForm: FormGroup = new FormGroup({
    post_image: new FormControl('', [Validators.required]),
    post_title: new FormControl('', [Validators.required]),
    author_name: new FormControl('', [Validators.required]),
    post_date: new FormControl('', [Validators.required]),
    post_content: new FormControl('', [Validators.required]),
    post_subtitle: new FormControl('', [Validators.required]),
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

  getAllAuthors(): void {
    this._WritersService.getAllWriters().subscribe({
      next: (response) => {
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
        this.categories = response.rows.map((e) => {
          return {
            label: e.name,
            value: e.slug.toString(),
          };
        });
        this.inOpenCheckCurrentBlog();
      },
    });
  }

  inOpenCheckCurrentBlog() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let id = params.get('id');
        if (id) {
          this.currenBlogId = +id;
          this._NewsControlService.getNewsById(+id).subscribe({
            next: (response) => {
              console.log(response);
              let Data = response.row;
              this.addArticleForm.get('post_title')?.setValue(Data.post_title);
              this.addArticleForm
                .get('post_subtitle')
                ?.setValue(Data.post_subtitle);
              this.addArticleForm
                .get('author_name')
                ?.setValue(Data.author_name);
              this.addArticleForm
                .get('post_date')
                ?.setValue(moment(Data.post_date).format('iYYYY-iMM-iDD'));
              this.addArticleForm
                .get('post_content')
                ?.setValue(Data.post_content);
              this.currentImageSrc = `https://www.asda-alkhaleej.com/blogs/${Data.post_image}`;
              this.addArticleForm.get('post_image')?.setErrors(null);
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

  onDateSelect(event: any) {
    const selectedHijriDate = moment(event).format('YYYY-MM-DD'); // Convert Gregorian to Hijri
  }

  onSubmit(): void {
    const formValues = this.addArticleForm.value;
    const formData = new FormData();
    formData.append('post_title', formValues.post_title);
    formData.append('post_content', formValues.post_content);
    formData.append('meta_title', formValues.post_title);
    formData.append('post_subtitle', formValues.post_subtitle);
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
    formValues.categories.forEach((element: any) => {
      formData.append('categoryIDS[]', element);
    });

    if (this.addArticleForm.valid) {
      const formValues = this.addArticleForm.value;
      const formData = new FormData();
      formData.append('post_title', formValues.post_title);
      formData.append('post_content', formValues.post_content);
      formData.append('meta_title', formValues.post_title);
      formData.append('post_subtitle', formValues.post_subtitle);
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
      formValues.categories.forEach((element: any) => {
        formData.append('categoryIDS[]', element);
      });

      // Fetch and append static image
      this.fetchAndAppendImage(formData).then((updatedFormData) => {
        this._NgxSpinnerService.show();
        if (this.currenBlogId == 0) {
          this._NewsControlService.addNews(formData).subscribe({
            next: (response) => {
              this._MessageService.add({
                severity: 'success',
                summary: 'تم النشر بنجاح',
                detail: 'تمت إضافة الموضوع بنجاح!',
              });
              this.addArticleForm.reset();
              this.addArticleForm.get('post_content')?.setValue('');
              this._NgxSpinnerService.hide();
            },
            error: (err) => {
              this._MessageService.add({
                severity: 'error',
                summary: 'خطأ في النشر',
                detail: 'حدث خطأ أثناء محاولة نشر الموضوع.',
              });
              this._NgxSpinnerService.hide();
            },
          });
        } else {
          this._NewsControlService
            .updateNews(this.currenBlogId, formData)
            .subscribe({
              next: (response) => {
                this._MessageService.add({
                  severity: 'success',
                  summary: 'تم النشر بنجاح',
                  detail: 'تمت إضافة الموضوع بنجاح!',
                });
                this.addArticleForm.reset();
                this.addArticleForm.get('post_content')?.setValue('');
                this._NgxSpinnerService.hide();
              },
              error: (err) => {
                this._MessageService.add({
                  severity: 'error',
                  summary: 'خطأ في النشر',
                  detail: 'حدث خطأ أثناء محاولة نشر الموضوع.',
                });
                this._NgxSpinnerService.hide();
              },
            });
        }
      });
    }
  }

  fetchAndAppendImage(formData: FormData): Promise<FormData> {
    return fetch('/assets/images/logo_light.png') // Your static image URL
      .then((response) => response.blob())
      .then((blob) => {
        const staticFile = new File([blob], 'layer_image.jpg', {
          type: 'image/jpeg',
        });
        formData.append('layer_image', staticFile); // Append static image
        return formData; // Return updated FormData
      })
      .catch((error) => {
        console.error('Error fetching static image:', error);
        return formData; // Return original FormData even if fetch fails
      });
  }

  clearInputs(): void {
    this.addArticleForm.reset();
    this.addArticleForm.get('post_content')?.setValue('');
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
    } catch (e) {}
  }

  options: JoditConfig = {
    uploader: {
      insertImageAsBase64URI: true,
    } as any,
    spellcheck: true,
    language: 'ar',
    minHeight: 600,
  };

  @ViewChild('ngxJodit') ngxJodit!: any;

  ngAfterViewInit(): void {
    if (this.ngxJodit) {
      this.ngxJodit.jodit?.registeredButtons.add({
        22: { group: 'source', name: 'left' },
      });
    }
    this.addArticleForm.get('post_title')?.valueChanges.subscribe((value) => {
      this.arabicWarning = this.checkArabicText(value);
      this.seoTitleWarning = this.checkSeoTitle(value);
      this.duplicateWordWarning = this.checkDuplicateWords(value);
    });
  }

  approveBlog() {
    const formValues = this.addArticleForm.value;
    const imageURL = formValues.post_image
      ? URL.createObjectURL(formValues.post_image)
      : '';
    this.currentBlog = {
      status: '',
      blog: {
        post_id: 1,
        post_title: formValues.post_title,
        post_subtitle: formValues.post_subtitle,
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
  arabicWarning: string | null = null;
  seoTitleWarning: string | null = null;
  duplicateWordWarning: string | null = null;
  checkArabicText(value: string): string | null {
    const arabicWordRegex = /[\u0600-\u06FF]/;
    if (!value.includes('<img') && !arabicWordRegex.test(value)) {
      return 'من الأفضل أن يتضمن النص كلمات باللغة العربية لتحسين الفهم والتفاعل.';
    }
    return null;
  }

  checkSeoTitle(value: string): string | null {
    if (value.length < 60 || value.length > 80) {
      return 'ينصح بأن يتراوح طول العنوان بين 60 و 80 حرفًا لضمان جاذبية أفضل لمحركات البحث.';
    }
    if (!/[\u0600-\u06FF]/.test(value)) {
      return 'يفضل أن يتضمن العنوان كلمات رئيسية باللغة العربية لتسهيل البحث عنها.';
    }
    return null;
  }

  checkDuplicateWords(value: string): string | null {
    const words = value.split(' ');
    const wordCount = words.reduce((acc: any, word: any) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const duplicateWords = Object.values(wordCount).filter(
      (count: any) => count > 1
    );
    if (duplicateWords.length > 0) {
      return 'ينصح بتجنب تكرار الكلمات للحصول على عنوان أكثر وضوحًا.';
    }
    return null;
  }

  minContentLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const wordCount = value
        .split(' ')
        .filter((word: any) => word.length > 0).length;
      return wordCount >= minLength
        ? null
        : {
            minContentLength: `يجب أن يحتوي الموضوع على الأقل على ${minLength} كلمة`,
          };
    };
  }
  contentLengthWarning: string | null = null;
  contentArabicWarning: string | null = null;
  isContentEmpty: boolean = true; // Track if the content is empty

  // This method will be called whenever the user changes the editor content
  onEditorInput(value: any): void {
    const cleanContent = this.stripHtml(value.target.value); // Clean the HTML content
    this.isContentEmpty = cleanContent.trim() === ''; // Check if content is empty

    if (!this.isContentEmpty) {
      this.checkContentLength(cleanContent); // Check length of the cleaned content
      this.checkContentArabic(cleanContent); // Check if the cleaned content contains Arabic text
    } else {
      this.contentLengthWarning = null; // Clear warnings when content is empty
      this.contentArabicWarning = null; // Clear warnings when content is empty
    }
    console.log(cleanContent); // Log the cleaned content for debugging
  }

  // Method to remove HTML tags from the content
  stripHtml(value: string): string {
    const doc = new DOMParser().parseFromString(value, 'text/html');
    return doc.body.textContent || ''; // Return the raw text content
  }

  // Method to check content length
  checkContentLength(value: string): void {
    if (value.length < 200) {
      this.contentLengthWarning =
        'من الأفضل أن يتضمن النص ما لا يقل عن 200 حرف لزيادة جودة المقال.';
    } else {
      this.contentLengthWarning = null;
    }
  }

  // Method to check if content contains Arabic text
  checkContentArabic(value: string): void {
    const arabicWordRegex = /[\u0600-\u06FF]/;
    if (!arabicWordRegex.test(value)) {
      this.contentArabicWarning =
        'يفضل أن يحتوي النص على كلمات باللغة العربية لزيادة التفاعل.';
    } else {
      this.contentArabicWarning = null;
    }
  }
}

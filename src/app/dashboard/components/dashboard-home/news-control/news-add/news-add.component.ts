import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// PrimeNG Imports
import { FormsModule } from '@angular/forms';
import { JoditAngularModule } from 'jodit-angular';
import 'jodit/esm/plugins/add-new-line/add-new-line.js';
import 'jodit/esm/plugins/bold/bold.js';
import 'jodit/esm/plugins/fullsize/fullsize.js';
import 'jodit/esm/plugins/indent/indent.js';
import 'jodit/esm/plugins/resizer/resizer.js';
import 'jodit/esm/plugins/source/source.js';
import moment from 'moment-hijri'; // Import the Hijri moment library
import { NgxHijriDatepickerModule } from 'ngx-hijri-datepicker';
import { JoditConfig, NgxJoditComponent } from 'ngx-jodit';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { NewsControlService } from '../../../../services/news-control.service';
import { CategoriesService } from '../../../../services/categories.service';
import { WritersService } from '../../../../services/writers.service';

@Component({
  selector: 'app-news-add',
  standalone: true,
  imports: [
    EditorModule,
    FileUploadModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    CommonModule,
    ReactiveFormsModule,
    JoditAngularModule,
    FormsModule,
    NgxJoditComponent,
    ReactiveFormsModule,
    FileUploadModule,
    ToastModule,
    NgxHijriDatepickerModule,
    DropdownModule,
    MultiSelectModule,
  ],
  templateUrl: './news-add.component.html',
  styleUrl: './news-add.component.scss',
  providers: [MessageService],
})
export class NewsAddComponent implements OnInit {
  articleContent: string = ''; // Used for the editor content

  isPreview: boolean = false; // Toggle preview mode

  selectedHijriDate = moment().format('iYYYY-iMM-iDD');

  value = '';

  _optionsStr = '';

  authors: any[] = [];

  categories: any[] = [];

  addArticleForm: FormGroup = new FormGroup({
    post_image: new FormControl(''),
    post_title: new FormControl('', [Validators.required]),
    author_name: new FormControl('', [Validators.required]),
    post_date: new FormControl('', [Validators.required]),
    post_content: new FormControl('', [Validators.required]),
    categories: new FormControl([], [Validators.required]),
  });

  constructor(
    private _CategoriesService: CategoriesService,
    private _WritersService: WritersService,
    private _NewsControlService: NewsControlService,
    private _MessageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllAuthors();
    this.getAllCategories();
  }

  getAllAuthors(): void {
    this._WritersService.getAllWriters().subscribe({
      next: (response) => {
        console.log(response);
        this.authors = response.rows.map((e) => {
          return {
            label: e.writer_name,
            value: e.id,
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
            value: e.term_id.toString(),
          };
        });
      },
    });
  }

  onDateSelected(event: any) {
    console.log(event);
  }

  // Handle the form submission
  onSubmit(): void {
    // if (this.addArticleForm.valid) {
    if (true) {
      const formValues = this.addArticleForm.value;

      // Create FormData object
      const formData = new FormData();
      formData.append('post_title', formValues.post_title);
      formData.append('post_content', formValues.post_content);
      formData.append('meta_title', formValues.post_title);
      formData.append('meta_description', formValues.post_title);
      formData.append('author_name', formValues.author_name);
      formData.append('post_date', formValues.post_date);
      formData.append('publish_status', '1');
      formData.append(
        'post_image',
        formValues.post_image,
        formValues.post_image.name
      );

      formValues.categories.forEach((element: any) => {
        formData.append('categoryIDS[]', element);
      });

      // Send the form data to your API
      this._NewsControlService.addNews(formData).subscribe({
        next: (response) => {
          console.log(response);
          this._MessageService.add({
            severity: 'success',
            summary: 'تم النشر بنجاح',
            detail: 'تمت إضافة المقال بنجاح!',
          });
        },
        error: (err) => {
          console.log(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'خطأ في النشر',
            detail: 'حدث خطأ أثناء محاولة نشر المقال.',
          });
        },
      });
    } else {
      console.log('Form is invalid!');
    }
  }

  // Handle file input for the image
  // Handle file selection
  onFileSelect(event: any): void {
    const file = event.files[0];
    if (file) {
      this.addArticleForm.patchValue({
        post_image: file,
      });
    }
  }

  // Handle file upload (optional if you want to handle the upload process manually)
  onUpload(event: any) {
    console.log('File uploaded:', event.files);
  }

  // Show the preview of the article
  previewArticle(): void {
    this.isPreview = true;
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
    direction: 'rtl',
    language: 'ar',
    minHeight: 600,
  };
}

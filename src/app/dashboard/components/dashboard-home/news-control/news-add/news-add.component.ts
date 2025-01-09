import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// PrimeNG Imports
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import moment from 'moment-hijri'; // Import the Hijri moment library
import { FormsModule } from '@angular/forms';
import { JoditAngularModule } from 'jodit-angular';
import { JoditConfig, NgxJoditComponent } from 'ngx-jodit';
import 'jodit/esm/plugins/add-new-line/add-new-line.js';
import 'jodit/esm/plugins/bold/bold.js';
import 'jodit/esm/plugins/fullsize/fullsize.js';
import 'jodit/esm/plugins/indent/indent.js';
import 'jodit/esm/plugins/source/source.js';
import 'jodit/esm/plugins/resizer/resizer.js';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgxHijriDatepickerModule } from 'ngx-hijri-datepicker';
import { DropdownModule } from 'primeng/dropdown';

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
  ],
  templateUrl: './news-add.component.html',
  styleUrl: './news-add.component.scss',
  providers: [MessageService],
})
export class NewsAddComponent {
  articleContent: string = ''; // Used for the editor content
  isPreview: boolean = false; // Toggle preview mode
  selectedHijriDate = moment().format('iYYYY-iMM-iDD');
  constructor(private fb: FormBuilder) {}
  onDateSelected(event: any) {
    console.log(event);
  }
  addArticleForm: FormGroup = new FormGroup({
    post_title: new FormControl('', [Validators.required]),
    author_name: new FormControl('', [Validators.required]),
    post_date: new FormControl('', [Validators.required]),
    post_content: new FormControl('', [Validators.required]),
    post_image: new FormControl('', [Validators.required]),
  });
  authors: any[] = [
    { label: 'خلفية محمد', value: 'Khalfia Mohammed' },
    { label: 'سارة عبدالله', value: 'Sara Abdullah' },
    { label: 'محمد صالح', value: 'Mohamed Saleh' },
    { label: 'علي أحمد', value: 'Ali Ahmed' },
    { label: 'ليلى حسن', value: 'Layla Hassan' },
  ];

  // Other properties and methods...

  navigateToAddAuthor() {
    // Navigate to the author control page
    // You can use Angular's Router to navigate to the desired route
    // this.router.navigate(['/author-control']);
  }
  // Handle the form submission
  onSubmit(): void {
    if (this.addArticleForm.valid) {
      const newArticle = this.addArticleForm.value;
      console.log('Article to submit:', newArticle);
      // Logic to send the article to the backend or save
    }
  }

  // Handle file input for the image
  // Handle file selection
  onFileSelect(event: any) {
    console.log('File selected:', event.files);
    // You can perform additional actions here like previewing the image or validating the file
  }

  // Handle file upload (optional if you want to handle the upload process manually)
  onUpload(event: any) {
    console.log('File uploaded:', event.files);
    // You can perform actions like calling an API or storing the file on the server here
  }

  // Show the preview of the article
  previewArticle(): void {
    this.isPreview = true;
  }
  value = '';
  _optionsStr = '';

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

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.options.buttons);
    }, 0);
  }
}

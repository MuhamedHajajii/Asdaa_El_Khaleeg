import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import * as moment from 'moment-hijri'; // Import the Hijri moment library

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
  ],
  templateUrl: './news-add.component.html',
  styleUrl: './news-add.component.scss',
})
export class NewsAddComponent {
  articleContent: string = ''; // Used for the editor content
  isPreview: boolean = false; // Toggle preview mode

  constructor(private fb: FormBuilder) {}

  addArticleForm: FormGroup = new FormGroup({
    post_title: new FormControl('', [Validators.required]),
    author_name: new FormControl('', [Validators.required]),
    post_date: new FormControl('', [Validators.required]),
    post_content: new FormControl('', [Validators.required]),
    post_image: new FormControl('', [Validators.required]),
  });

  // Handle the form submission
  onSubmit(): void {
    if (this.addArticleForm.valid) {
      const newArticle = this.addArticleForm.value;
      console.log('Article to submit:', newArticle);
      // Logic to send the article to the backend or save
    }
  }

  // Handle file input for the image
  onFileSelect(event: any): void {
    const file = event.files[0];
    if (file) {
      this.addArticleForm.patchValue({ post_image: file });
    }
  }

  // Show the preview of the article
  previewArticle(): void {
    this.isPreview = true;
  }
}

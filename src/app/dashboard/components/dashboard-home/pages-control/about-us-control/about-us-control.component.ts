import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';
import { IAboutUsRow } from '../../../../../core/interfaces/IAboutUs';
import { HijriDatePipe } from '../../../../../core/pipes/date-hijri.pipe';
import { SafeHtmlPipe } from '../../../../../core/pipes/safe-html.pipe';
import { AboutUsService } from '../../../../services/about-us.service';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-about-us-control',
  standalone: true,
  imports: [
    EditorModule,
    CommonModule,
    FormsModule,
    SafeHtmlPipe,
    HijriDatePipe,
    FormsModule,
    ToastModule,
    ButtonModule,
    MessagesModule,
  ],
  templateUrl: './about-us-control.component.html',
  styleUrls: ['./about-us-control.component.scss'],
  providers: [MessageService],
})
export class AboutUsControlComponent {
  isEditing: boolean = false; // Track whether we're in edit mode or not
  aboutUsContent!: IAboutUsRow;
  editorModules: any;
  constructor(
    private _AboutUsService: AboutUsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.editorModules = {
      toolbar: [
        ['bold', 'italic', 'underline'], // Limit to essential formatting
        [{ list: 'ordered' }, { list: 'bullet' }], // Basic lists
        ['blockquote'], // Quote block
      ],
    };
    this._AboutUsService.getAboutUs().subscribe({
      next: (response) => {
        this.aboutUsContent = response.row;
      },
    });
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    // Call your service to save the updated data
    this._AboutUsService.updateAboutUs(this.aboutUsContent).subscribe({
      next: () => {
        console.log('Changes saved:', this.aboutUsContent);
        this.messageService.add({
          severity: 'success',
          summary: 'نجاح',
          detail: 'تم حفظ التغييرات بنجاح',
        });
        this.isEditing = false;
      },
      error: (err) => {
        console.error('Error saving changes:', err);
      },
    });
  }
  // Helper function to clean HTML
  cleanHTML(html: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }
}

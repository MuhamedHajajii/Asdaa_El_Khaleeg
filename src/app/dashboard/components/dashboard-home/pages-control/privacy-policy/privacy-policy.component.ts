import { Component } from '@angular/core';
import { IPrivacyPolicyRow } from '../../../../../core/interfaces/IPrivacyPolicy';
import { PrivacyPolicyService } from '../../../../services/privacy-policy.service';
import { HijriDatePipe } from '../../../../../core/pipes/date-hijri.pipe';
import { SafeHtmlPipe } from '../../../../../core/pipes/safe-html.pipe';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [
    HijriDatePipe,
    SafeHtmlPipe,
    MessagesModule,
    ToastModule,
    ButtonModule,
    EditorModule,
    FormsModule,
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
  providers: [MessageService],
})
export class PrivacyPolicyComponent {
  privacy_policy!: IPrivacyPolicyRow;
  editorModules: any;
  isEditing: boolean = false; // Track whether we're in edit mode or not

  constructor(
    private _PrivacyPolicyService: PrivacyPolicyService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.editorModules = {
      toolbar: [
        [{ size: [] }],
        ['bold', 'italic', 'underline'],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote'],
      ],
    };
    this._PrivacyPolicyService.getPrivacyPolicy().subscribe({
      next: (response) => {
        this.privacy_policy = response.row;
      },
    });
  }
  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    // Call your service to save the updated data
    this._PrivacyPolicyService
      .updatePrivacyPolicy(this.privacy_policy)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'نجاح',
            detail: 'تم حفظ التغييرات بنجاح',
          });
          this.isEditing = false;
        },
        error: (err) => {},
      });
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HijriDatePipe } from '../../../../../core/pipes/date-hijri.pipe';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    HijriDatePipe,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  emails = [
    {
      name: 'أحمد علي',
      subject: 'استفسار عن المنتج',
      date: new Date(),
      email: 'ahmed@example.com',
      message: 'أريد معرفة المزيد عن المنتج X...',
    },
    {
      name: 'سارة حسين',
      subject: 'طلب دعم فني',
      date: new Date(),
      email: 'sara@example.com',
      message: 'لدي مشكلة في التطبيق، يرجى مساعدتي...',
    },
    // Add more email objects here...
  ];

  selectedEmail: any = null;
  emailDialogVisible: boolean = false;

  showDetails(email: any) {
    this.selectedEmail = email;
    this.emailDialogVisible = true;
  }
}

import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { HijriDatePipe } from '../../../../../core/pipes/date-hijri.pipe';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    HijriDatePipe,
    TooltipModule,
    SlicePipe,
  ],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  emails = [
    {
      id: 1,
      name: 'أحمد علي',
      subject: 'استفسار عن المنتج',
      date: new Date(),
      email: 'ahmed@example.com',
      message: 'أريد معرفة المزيد عن المنتج X...',
      phone: '01000000001',
    },
    {
      id: 2,
      name: 'سارة حسين',
      subject: 'طلب دعم فني',
      date: new Date(),
      email: 'sara@example.com',
      message: 'لدي مشكلة في التطبيق، يرجى مساعدتي...',
      phone: '01000000002',
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

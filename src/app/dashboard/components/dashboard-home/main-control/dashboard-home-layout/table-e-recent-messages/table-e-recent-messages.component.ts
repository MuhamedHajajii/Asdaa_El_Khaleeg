import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { HijriDatePipe } from '../../../../../../core/pipes/date-hijri.pipe';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-table-e-recent-messages',
  standalone: true,
  imports: [
    TableModule,
    HijriDatePipe,
    CardModule,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './table-e-recent-messages.component.html',
  styleUrl: './table-e-recent-messages.component.scss',
})
export class TableERecentMessagesComponent {
  recentEmails = [
    {
      id: 1,
      name: 'محمد أحمد',
      subject: 'استفسار عن الطلبات',
      date: '2025-01-01',
      message: 'مرحبا، أريد معرفة حالة طلبي.',
    },
    {
      id: 2,
      name: 'علي حسن',
      subject: 'اقتراح تحسين الخدمة',
      date: '2025-01-02',
      message: 'لدي بعض الاقتراحات لتحسين الخدمة.',
    },
    {
      id: 3,
      name: 'سارة محمد',
      subject: 'شكوى حول التأخير',
      date: '2025-01-03',
      message: 'لقد تأخرت طلبيتي كثيراً. أرجو حل المشكلة.',
    },
    {
      id: 4,
      name: 'خالد عمر',
      subject: 'استفسار عام',
      date: '2025-01-04',
      message: 'أريد معلومات حول خدمة جديدة.',
    },
    {
      id: 5,
      name: 'ندى سمير',
      subject: 'شكر وتقدير',
      date: '2025-01-05',
      message: 'شكراً على الخدمة الرائعة!',
    },
  ];

  constructor(private router: Router) {}

  viewEmailDetails(email: any) {
    this.router.navigate(['/email-details', email.id]);
  }
}
